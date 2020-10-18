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
                            if (event.keyCode === 13 || event.keyCode === 9) {
                                thisState.weight.vehicleNo = thisState.weight.vehicleNo
                                    .toUpperCase()
                                    .replaceAll(" ", "");
                                if (!thisState.settings.value.secondWeight) {
                                    if (thisState.weighing.tareSelector) {
                                        await fetch(
                                            thisState.INITIAL_URL +
                                            "/weight/getGrossWeightByVehicleNoAndProfile?profile=" + thisState.PROFILE + "&vehicleNo=" +
                                            thisState.weight.vehicleNo
                                        )
                                            .then(response => {
                                                if (response.status === 200) {
                                                    return response.json();
                                                } else throw Error(response.statusText);
                                            })
                                            .then(result => {
                                                thisState.weighing.previousWeightSelector = true;
                                                thisState.weighing.previousWeight = "Gross";
                                                thisState.weighing.previousWeightResult = result;
                                                thisState.setMyState(thisState);
                                                thisState.weighing.reference.previousWeightReference.current.focus();
                                            })
                                            .catch(() => {
                                                !thisState.weighing.disable.materialDisabled
                                                    ? thisState.weighing.reference.materialReference.reference.current.focus()
                                                    : !thisState.settings.value.hideCustomerName
                                                    ? thisState.weighing.reference.customersNameReference.current.focus()
                                                    : !thisState.settings.value.hideTransporterName
                                                        ? thisState.weighing.reference.transporterNameReference.current.focus()
                                                        : !thisState.settings.value.hideCharges
                                                            ? thisState.weighing.reference.chargesReference.current.focus()
                                                            : !thisState.settings.value.hideRemarks
                                                                ? thisState.weighing.reference.remarksReference.current.focus()
                                                                : thisState.weighing.reference.getWeightReference.current.focus();
                                            });
                                    } else {
                                        await fetch(
                                            thisState.INITIAL_URL +
                                            "/tareWeight/getTareWeightByVehicleNo?vehicleNo=" +
                                            thisState.weight.vehicleNo
                                        )
                                            .then(response => {
                                                if (response.status === 200) {
                                                    return response.json();
                                                } else throw Error(response.statusText);
                                            })
                                            .then(result => {
                                                thisState.weighing.previousWeightSelector = true;
                                                thisState.weighing.previousWeight = "Tare";
                                                thisState.weighing.previousWeightResult = result;
                                                thisState.setMyState(thisState);
                                                thisState.weighing.reference.previousWeightReference.current.focus();
                                            })
                                            .catch(() => {
                                                !thisState.weighing.disable.materialDisabled
                                                    ? thisState.weighing.reference.materialReference.reference.current.focus()
                                                    : !thisState.settings.value.hideCustomerName
                                                    ? thisState.weighing.reference.customersNameReference.current.focus()
                                                    : !thisState.settings.value.hideTransporterName
                                                        ? thisState.weighing.reference.transporterNameReference.current.focus()
                                                        : !thisState.settings.value.hideCharges
                                                            ? thisState.weighing.reference.chargesReference.current.focus()
                                                            : !thisState.settings.value.hideRemarks
                                                                ? thisState.weighing.reference.remarksReference.current.focus()
                                                                : thisState.weighing.reference.getWeightReference.current.focus();
                                            });
                                    }
                                } else {
                                    thisState.setMyState(thisState);
                                    !thisState.weighing.disable.materialDisabled
                                        ? thisState.weighing.reference.materialReference.reference.current.focus()
                                        : !thisState.settings.value.hideCustomerName
                                        ? thisState.weighing.reference.customersNameReference.current.focus()
                                        : !thisState.settings.value.hideTransporterName
                                            ? thisState.weighing.reference.transporterNameReference.current.focus()
                                            : !thisState.settings.value.hideCharges
                                                ? thisState.weighing.reference.chargesReference.current.focus()
                                                : !thisState.settings.value.hideRemarks
                                                    ? thisState.weighing.reference.remarksReference.current.focus()
                                                    : thisState.weighing.reference.getWeightReference.current.focus();
                                }
                            }
                        }
                        }
                        onFocus={() => {
                            if (thisState.weighing.preventFocus) {
                                thisState.weighing.preventFocus = false;
                                thisState.setMyState(thisState);
                                !thisState.weighing.disable.materialDisabled
                                    ? thisState.weighing.reference.materialReference.reference.current.focus()
                                    : !thisState.settings.value.hideCustomerName
                                    ? thisState.weighing.reference.customersNameReference.current.focus()
                                    : !thisState.settings.value.hideTransporterName
                                        ? thisState.weighing.reference.transporterNameReference.current.focus()
                                        : !thisState.settings.value.hideCharges
                                            ? thisState.weighing.reference.chargesReference.current.focus()
                                            : !thisState.settings.value.hideRemarks
                                                ? thisState.weighing.reference.remarksReference.current.focus()
                                                : thisState.weighing.reference.getWeightReference.current.focus();
                            }
                        }}
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
                        selectHintOnEnter
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
                                            material: thisState.weighing.reference.materialReference.reference.current
                                                .getInstance()
                                                .getInput().value
                                        }
                                    ]
                                    : event;
                            thisState.weight.material =
                                thisState.weighing.reference.materialReference.value[0].material;
                            thisState.setMyState(thisState);
                        }}
                        ref={thisState.weighing.reference.materialReference.reference}
                        onKeyDown={event => {
                            if (event.keyCode === 9 && event.shiftKey)
                                thisState.weighing.reference.vehicleNoReference.current.focus();
                            else if (event.keyCode === 13 || event.keyCode === 9) {
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
                                !thisState.settings.value.hideCustomerName
                                    ? thisState.weighing.reference.customersNameReference.current.focus()
                                    : !thisState.settings.value.hideTransporterName
                                    ? thisState.weighing.reference.transporterNameReference.current.focus()
                                    : !thisState.settings.value.hideCharges
                                        ? thisState.weighing.reference.chargesReference.current.focus()
                                        : !thisState.settings.value.hideRemarks
                                            ? thisState.weighing.reference.remarksReference.current.focus()
                                            : thisState.weighing.reference.getWeightReference.current.focus();
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
                            if (event.keyCode === 9 && event.shiftKey)
                                !thisState.settings.value.hideTransporterName
                                    ? thisState.weighing.reference.transporterNameReference.current.focus()
                                    : !thisState.settings.value.hideCustomerName
                                    ? thisState.weighing.reference.customersNameReference.current.focus()
                                    : !thisState.weighing.disable.materialDisabled
                                        ? thisState.weighing.reference.materialReference.reference.current.focus()
                                        : thisState.weighing.reference.vehicleNoReference.current.focus();
                            else if (event.keyCode === 13 || event.keyCode === 9)
                                !thisState.settings.value.hideRemarks
                                    ? thisState.weighing.reference.remarksReference.current.focus()
                                    : thisState.weighing.reference.getWeightReference.current.focus();
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
                            if (event.keyCode === 9 && event.shiftKey)
                                !thisState.settings.valuee.hideCharges
                                    ? thisState.weighing.reference.chargesReference.current.focus()
                                    : !thisState.settings.value.hideTransporterName
                                    ? thisState.weighing.reference.transporterNameReference.current.focus()
                                    : !thisState.settings.value.hideCustomerName
                                        ? thisState.weighing.reference.customersNameReference.current.focus()
                                        : !thisState.weighing.disable.materialDisabled
                                            ? thisState.weighing.reference.materialReference.reference.current.focus()
                                            : thisState.weighing.reference.vehicleNoReference.current.focus();
                            else if (event.keyCode === 13 || event.keyCode === 9)
                                thisState.weighing.reference.getWeightReference.current.focus();
                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnOne;
