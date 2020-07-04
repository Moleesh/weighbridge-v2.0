import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import Clock from "react-live-clock";

import PreviousWeight from './columnOne/previousWeight';

const ColumnOne = props => {
    let thisState = props.preState;
    return (
        <Col sm="4" className="mt-2">
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Invoice No
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center disableBG"
                        value={thisState.invoice.invoiceNo}
                        onChange={event => {
                            thisState.invoice.invoiceNo = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        disabled
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Reference Slip No
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.invoices.disable.referenceSlipNoDisabled}
                        ref={thisState.invoices.reference.referenceSlipNoReference}
                        value={thisState.invoice.referenceSlipNo}
                        autoFocus={true}
                        onChange={event => {
                            thisState.invoice.referenceSlipNo =
                                (event.target.value.match("[0-9]+") || []).pop() || "";
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={async event => {
                            if (event.keyCode === 9 && event.shiftKey) ;
                            else if ((event.keyCode === 13) || (event.keyCode === 9)) {
                                if (thisState.invoice.referenceSlipNo) {
                                    await fetch(
                                        thisState.INITIAL_URL +
                                        "/weight/getWeightBySlipNoAndProfile?profile=" + thisState.PROFILE + "&slipNo=" +
                                        thisState.invoice.referenceSlipNo
                                    )
                                        .then(response => {
                                            if (response.status === 200) {
                                                return response.json();
                                            } else throw Error(response.statusText);
                                        })
                                        .then(result => {
                                            thisState.invoices.previousWeightSelector = true;
                                            let temp = thisState.configuration.material.list
                                                .filter((material) => material.material === result.material);
                                            if (temp.length === 1) {
                                                result.unitPrice = temp[0].unitPrice;
                                            }
                                            temp = thisState.configuration.driver.list
                                                .filter((driver) => driver.customerName === result.customersName);
                                            if (temp.length === 1) {
                                                result.address1 = temp[0].address1;
                                                result.address2 = temp[0].address2;
                                            }
                                            thisState.invoices.previousWeightResult = result;
                                            thisState.setMyState(thisState);
                                            thisState.invoices.reference.previousWeightReference.current.focus();
                                        })
                                        .catch(() => {
                                            !thisState.invoices.disable.customersNameDisabled
                                                ? thisState.invoices.reference.customersNameReference.current.focus()
                                                : thisState.invoices.reference.address1Reference.current.focus();
                                        });
                                } else {
                                    thisState.invoices.reference.previousWeightReference.current.focus();
                                }
                            }
                        }}
                        onFocus={() => {
                            if (thisState.invoices.preventVehicleNoFocus) {
                                thisState.invoices.preventVehicleNoFocus = false;
                                thisState.setMyState(thisState);
                                thisState.invoices.reference.customersNameReference.current.focus();
                            }
                        }}
                    />
                </Col>
                <PreviousWeight preState={thisState}/>
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
                    Customer's Name
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.invoices.disable.customersNameDisabled}
                        ref={thisState.invoices.reference.customersNameReference}
                        value={thisState.invoice.customersName}
                        onChange={event => {
                            thisState.invoice.customersName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.keyCode === 9 && event.shiftKey)
                                thisState.invoices.reference.referenceSlipNoReference.current.focus();
                            else if ((event.keyCode === 13) || (event.keyCode === 9)) {
                                thisState.invoice.customersName = thisState.invoice.customersName
                                    .toUpperCase();
                                let temp = thisState.configuration.driver.list
                                    .filter((driver) => driver.customerName === thisState.invoice.customersName);
                                if (temp.length === 1) {
                                    thisState.invoice.address1 = temp[0].address1;
                                    thisState.invoice.address2 = temp[0].address2;
                                }
                                thisState.setMyState(thisState);
                                if (!thisState.invoices.disable.vehicleNoDisabled) {
                                    thisState.invoices.reference.vehicleNoReference.current.focus();
                                } else if (!thisState.invoices.disable.unitPriceDisabled) {
                                    thisState.invoices.reference.unitPriceReference.current.focus();
                                } else {
                                    thisState.invoices.reference.address1Reference.current.focus();
                                }
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Vehicle No
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.invoices.disable.vehicleNoDisabled}
                        value={thisState.invoice.vehicleNo}
                        ref={thisState.invoices.reference.vehicleNoReference}
                        onChange={event => {
                            thisState.invoice.vehicleNo = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={async event => {
                            if (event.keyCode === 9 && event.shiftKey)
                                thisState.invoices.reference.customersNameReference.current.focus();
                            else {
                                if (event.keyCode === 13 || event.keyCode === 9) {
                                    thisState.invoice.vehicleNo = thisState.invoice.vehicleNo
                                        .toUpperCase()
                                        .replace(" ", "");
                                    thisState.setMyState(thisState);
                                    thisState.invoices.reference.materialReference.reference.current.focus();
                                }
                            }
                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnOne;
