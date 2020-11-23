import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import moment from "moment";

import RePrint from "./bottom/rePrint";
import Print from "./bottom/print";

const Bottom = props => {
    let thisState = props.preState;
    let prevent = false;
    let preventSave = false;

    return (
        <Row>
            <Col sm="4">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        thisState.weighing.disable.grossSelectorDisabled = true;
                        thisState.weighing.disable.tareSelectorDisabled = true;
                        thisState.weighing.disable.vehicleNoDisabled = true;
                        thisState.weighing.disable.customersNameDisabled = true;
                        thisState.weighing.disable.transporterNameDisabled = true;
                        thisState.weighing.disable.materialDisabled = true;
                        thisState.weighing.disable.chargesDisabled = true;
                        thisState.weighing.disable.remarksDisabled = true;
                        thisState.weighing.disable.grossDetailsDisabled = true;
                        thisState.weighing.disable.tareDetailsWeightDisabled = true;
                        thisState.weighing.disable.getWeightDisabled = true;
                        thisState.weighing.disable.saveDisabled = false;
                        thisState.weighing.disable.secondWeightDisabled = true;

                        let date = moment().format("DD-MM-YYYY HH:mm:ss");

                        if (thisState.weighing.grossSelector) {
                            if (thisState.weight.grossWeight === "") {
                                thisState.weight.grossWeight = thisState.WEIGHT;
                                thisState.weight.grossTime = date;
                            }
                        } else {
                            if (thisState.weight.tareWeight === "") {
                                thisState.weight.tareWeight = thisState.WEIGHT;
                                thisState.weight.tareTime = date;
                            }
                        }

                        let total =
                            ((
                                ("0" + thisState.weight.grossWeight).match("[0-9]+") || []
                            ).pop() || "") -
                            ((
                                ("0" + thisState.weight.tareWeight).match("[0-9]+") || []
                            ).pop() || "");

                        if ((total > 0) && (thisState.weight.tareWeight > 0)) {
                            thisState.weight.nettWeight = total;
                        }
                        thisState.weight.nettTime = date;
                        thisState
                            .setMyState(thisState).then(() =>
                            thisState.switchFocus(thisState, 'weighing', 'save', false)
                        );
                    }}
                    disabled={thisState.weighing.disable.getWeightDisabled}
                    ref={thisState.weighing.reference.getWeightReference}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        prevent = true;
                    }}
                >
                    Get Weight
                </Button>
            </Col>
            <Col sm="4">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        if (!preventSave) {
                            preventSave = true;
                            thisState.weight.manual = thisState.settings.manualEntry;
                            thisState.weight.profile = thisState.PROFILE
                            fetch(thisState.INITIAL_URL + "/weight/saveWeight", {
                                method: "POST",
                                body: JSON.stringify(thisState.weight),
                                headers: {"content-type": "application/json"}
                            }).then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            }).then(result => {
                                thisState.weight = result;
                                thisState.weighing.disable.saveDisabled = true;
                                thisState.weighing.disable.printDisabled = false;
                                thisState
                                    .setMyState(thisState).then(() => {
                                        thisState.switchFocus(thisState, 'weighing', 'print', false);
                                        preventSave = false;
                                    }
                                );
                            }).catch(() => {
                                preventSave = false;
                            });
                        }
                    }
                    }
                    disabled={thisState.weighing.disable.saveDisabled || thisState.SETTING_DISABLED}
                    ref={thisState.weighing.reference.saveReference}
                >
                    Save
                </Button>
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        thisState.weighing.reprint = true;
                        thisState.weighing.reprintSlipNo = "";
                        thisState.setMyState(thisState).then(() =>
                            thisState.switchFocus(thisState, 'weighing', 'rePrint', false)
                        );
                    }}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        thisState.weighing.disable.printDisabled
                            ? (prevent = true)
                            : thisState.switchFocus(thisState, 'weighing', 'print', false);
                    }}
                >
                    Re Print
                </Button>
                <RePrint preState={thisState}/>
            </Col>
            <Col sm="4">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        thisState.weighing.print = true;
                        thisState.setMyState(thisState).then(() => thisState.switchFocus(thisState, 'weighing', 'printDialog', false));
                    }}
                    disabled={thisState.weighing.disable.printDisabled}
                    ref={thisState.weighing.reference.printReference}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        if (thisState.weighing.disable.vehicleNoDisabled)
                            prevent = true;
                        else {
                            thisState.weighing.disable.printDisabled = true;
                            thisState.switchFocus(thisState, 'weighing', 'vehicleNo', false);
                        }
                    }}
                >
                    Print
                </Button>
                <Print preState={thisState}/>
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            return result;
                        }).catch(() => {
                            return -1;
                        }).then(result => {
                            thisState.weighing.disable.grossSelectorDisabled = false;
                            thisState.weighing.disable.tareSelectorDisabled = false;
                            thisState.weighing.disable.vehicleNoDisabled = false;
                            thisState.weighing.disable.customersNameDisabled = false;
                            thisState.weighing.disable.transporterNameDisabled = false;
                            thisState.weighing.disable.materialDisabled = false;
                            thisState.weighing.disable.chargesDisabled = false;
                            thisState.weighing.disable.remarksDisabled = false;
                            thisState.weighing.disable.getWeightDisabled = false;
                            thisState.weighing.disable.saveDisabled = true;
                            thisState.weighing.disable.printDisabled = true;
                            thisState.weight.slipNo = result;
                            if (result === -1) {
                                thisState.weighing.disable.getWeightDisabled = true;
                                thisState.SETTING_DISABLED = true;
                            }
                            thisState.weight.vehicleNo = "";
                            thisState.weight.customersName = "";
                            thisState.weight.transporterName = "";
                            thisState.weight.material = "";
                            thisState.weighing.reference.materialReference.value = [
                                {material: ""}
                            ];
                            thisState.weight.grossWeight = "";
                            thisState.weight.grossTime = "";
                            thisState.weight.tareWeight = "";
                            thisState.weight.tareTime = "";
                            thisState.weight.nettWeight = "";
                            thisState.weight.nettTime = "";
                            thisState.weight.charges = "";
                            thisState.weight.remarks = "";
                            thisState.weighing.grossSelector = true;
                            thisState.weighing.tareSelector = false;
                            thisState.weighing.disable.secondWeightDisabled = false;
                            if (thisState.settings.manualEntry) {
                                thisState.weighing.disable.grossDetailsDisabled = false;
                                thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            }
                            thisState.setMyState(thisState).then(() => thisState.switchFocus(thisState, 'weighing', 'vehicleNo', false));
                        });
                    }}
                >
                    Clear
                </Button>
            </Col>
            <Col sm="6"/>
        </Row>
    );
};

export default Bottom;
