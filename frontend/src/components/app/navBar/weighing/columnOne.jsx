import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import Clock from "react-live-clock";
import {Menu, MenuItem, Typeahead} from "react-bootstrap-typeahead";

import PreviousWeight from './columnOne/previousWeight';

const ColumnOne = props => {
    let thisState = props.preState;
    return (
        <Col sm="4" className="mt-2">
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Slip No
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center disableBG"
                        value={thisState.weight.slipNo}
                        onChange={event => {
                            thisState.weight.slipNo = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        disabled
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Date & Time
                </Form.Label>
                <Col sm="6" style={{textAlign: "center"}}>
                    <Clock format={"DD-MM-YYYY HH:mm:ss"} ticking={true}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Vehicle No
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.weighing.disable.vehicleNoDisabled}
                        value={thisState.weight.vehicleNo}
                        ref={thisState.weighing.reference.vehicleNoReference}
                        onChange={event => {
                            thisState.weight.vehicleNo = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={async event => {
                            if (event.key === "Tab" && event.shiftKey) {

                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.weight.vehicleNo = thisState.weight.vehicleNo.toUpperCase().replaceAll(" ", "");
                                if (!thisState.settings.value.secondWeight) {
                                    if (thisState.weighing.tareSelector) {
                                        await fetch(
                                            thisState.INITIAL_URL +
                                            "/weight/getGrossWeightByVehicleNoAndProfile?profile=" + thisState.PROFILE + "&vehicleNo=" +
                                            thisState.weight.vehicleNo
                                        ).then(response => {
                                            if (response.status === 200) {
                                                return response.json();
                                            } else throw Error(response.statusText);
                                        }).then(result => {
                                            thisState.weighing.previousWeightSelector = true;
                                            thisState.weighing.previousWeight = "Gross";
                                            thisState.weighing.previousWeightResult = result;
                                            thisState.setMyState(thisState);
                                            thisState.switchFocus(thisState, 'weighing', 'previousWeight', false);
                                        }).catch(() => {
                                            thisState.switchFocus(thisState, 'weighing', 'material', false);
                                        });
                                    } else {
                                        await fetch(
                                            thisState.INITIAL_URL +
                                            "/tareWeight/getTareWeightByVehicleNo?vehicleNo=" +
                                            thisState.weight.vehicleNo
                                        ).then(response => {
                                            if (response.status === 200) {
                                                return response.json();
                                            } else throw Error(response.statusText);
                                        }).then(result => {
                                            thisState.weighing.previousWeightSelector = true;
                                            thisState.weighing.previousWeight = "Tare";
                                            thisState.weighing.previousWeightResult = result;
                                            thisState.setMyState(thisState);
                                            thisState.switchFocus(thisState, 'weighing', 'previousWeight', false);
                                        }).catch(() => {
                                            thisState.switchFocus(thisState, 'weighing', 'material', false);
                                        });
                                    }
                                } else {
                                    thisState.setMyState(thisState);
                                    thisState.switchFocus(thisState, 'weighing', 'material', false);
                                }
                            }
                        }
                        }
                        autoFocus={true}
                    />
                    <PreviousWeight preState={thisState}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Material
                </Form.Label>
                <Col sm="6">
                    <Typeahead
                        highlightOnlyResult
                        id="material"
                        shouldSelect={true}
                        filterBy={["materialId", "material"]}
                        labelKey={option => option.material}
                        renderMenu={(results, menuProps) =>
                            results.length !== 0 ? (
                                <Menu {...menuProps} key="materialMenu">
                                    {results.map((result, index) => (
                                        <MenuItem
                                            option={result}
                                            position={index}
                                            key={(result.id ? result.id : -1).toString()}
                                        >
                                            {result.material}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            ) : null
                        }
                        options={thisState.configuration.material.list}
                        maxHeight={"200px"}
                        selected={thisState.weighing.reference.materialReference.value}
                        disabled={thisState.weighing.disable.materialDisabled}
                        open={thisState.weighing.reference.materialReference.open}
                        onChange={event => {
                            thisState.weighing.reference.materialReference.value =
                                event.length === 0
                                    ? [
                                        {
                                            material: thisState.weighing.reference.materialReference.reference.current.getInput().value
                                        }
                                    ]
                                    : event;
                            thisState.weight.material = thisState.weighing.reference.materialReference.value[0].material;
                            thisState.setMyState(thisState);
                        }}
                        ref={thisState.weighing.reference.materialReference.reference}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'weighing', '', false);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.weighing.reference.materialReference.open = false;
                                thisState.weighing.reference.materialReference.value[0].material = thisState.weighing.reference.materialReference.value[0].material
                                    .toUpperCase()
                                thisState.weight.material =
                                    thisState.weighing.reference.materialReference.value[0].material;
                                if (thisState.weight.material.toUpperCase() === "EMPTY") {
                                    thisState.weighing.tareSelector = true;
                                    thisState.weighing.grossSelector = false;
                                }
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'weighing', 'customersName', false);
                            }
                        }}
                        onFocus={() => {
                            thisState.weighing.reference.materialReference.open = undefined;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                {thisState.settings.hideFields ?
                    <Col sm="6">
                        <Form.Check
                            type="checkbox"
                            label="Charges"
                            checked={thisState.settings.value.hideCharges}
                            onChange={event => {
                                thisState.settings.value.hideCharges = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideCharges ? "hide" : ""}>
                        Charges
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideCharges ? "hide" : "text-center"}
                        disabled={thisState.weighing.disable.chargesDisabled || thisState.settings.value.hideCharges}
                        ref={thisState.weighing.reference.chargesReference}
                        value={thisState.weight.charges}
                        onChange={event => {
                            thisState.weight.charges =
                                (event.target.value.match("[0-9]+") || []).pop() || "";
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'weighing', 'transporterName', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.switchFocus(thisState, 'weighing', 'remarks', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                {thisState.settings.hideFields ?
                    <Col sm="6">
                        <Form.Check
                            type="checkbox"
                            label="Remarks"
                            checked={thisState.settings.value.hideRemarks}
                            onChange={event => {
                                thisState.settings.value.hideRemarks = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideRemarks ? "hide" : ""}>
                        Remarks
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideRemarks ? "hide" : "text-center"}
                        disabled={thisState.weighing.disable.remarksDisabled || thisState.settings.value.hideRemarks}
                        ref={thisState.weighing.reference.remarksReference}
                        value={thisState.weight.remarks}
                        onChange={event => {
                            thisState.weight.remarks = event.target.value.substring(0, 15);
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'weighing', 'charges', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.switchFocus(thisState, 'weighing', 'getWeight', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnOne;
