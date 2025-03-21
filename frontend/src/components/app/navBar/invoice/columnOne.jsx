import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Menu, MenuItem, Typeahead } from "react-bootstrap-typeahead";

import PreviousWeight from './columnOne/previousWeight';
import Clock from "../../../clock";

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
                            if (event.key === "Tab" && event.shiftKey) {

                            } else if (event.key === "Enter" || event.key === "Tab") {
                                if (thisState.invoice.referenceSlipNo) {
                                    await fetch(thisState.INITIAL_URL + "/weight/getWeightBySlipNoAndProfile?profile=" + thisState.PROFILE + "&slipNo=" + thisState.invoice.referenceSlipNo).then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    }).then(result => {
                                        thisState.invoices.previousWeightSelector = true;
                                        let temp = thisState.configuration.material.list
                                            .filter((material) => material.material === result.material);
                                        if (temp.length === 1) {
                                            result.unitPrice = temp[0].unitPrice;
                                        }
                                        temp = thisState.configuration.customer.list
                                            .filter((customer) => customer.customerName === result.customersName);
                                        if (temp.length === 1) {
                                            result.gstin = temp[0].gstin;
                                            result.address1 = temp[0].address1;
                                            result.address2 = temp[0].address2;
                                        }
                                        thisState.invoices.previousWeightResult = result;
                                        thisState.setMyState(thisState);
                                        thisState.switchFocus(thisState, 'invoices', 'previousWeight', false);
                                    }).catch(() => thisState.switchFocus(thisState, 'invoices', 'customersName', false));
                                } else {
                                    thisState.switchFocus(thisState, 'invoices', 'customersName', false);
                                }
                            }
                        }}
                    />
                </Col>
                <PreviousWeight preState={thisState} />
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Date & Time
                </Form.Label>
                <Col sm="6" style={{ textAlign: "center" }}>
                   <Clock />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Customer's Name
                </Form.Label>
                <Col sm="6">
                    <Typeahead
                        highlightOnlyResult
                        id="customersName"
                        shouldSelect={true}
                        filterBy={["customerId", "customerName"]}
                        labelKey={option => option.customerName}
                        renderMenu={(results, menuProps) =>
                            results.length !== 0 ? (
                                <Menu {...menuProps} key="customersNameMenu">
                                    {results.map((result, index) => (
                                        <MenuItem
                                            option={result}
                                            position={index}
                                            key={(result.id ? result.id : -1).toString()}
                                        >
                                            {result.customerName}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            ) : null
                        }
                        options={thisState.configuration.customer.list}
                        maxHeight={200}
                        selected={thisState.invoices.reference.customersNameReference.value}
                        disabled={thisState.invoices.disable.customersNameDisabled}
                        open={thisState.invoices.reference.customersNameReference.open}
                        onChange={event => {
                            thisState.invoices.reference.customersNameReference.value =
                                event.length === 0
                                    ? [
                                        {
                                            customerName: thisState.invoices.reference.customersNameReference.reference.current.getInput().value
                                        }
                                    ]
                                    : event;
                            thisState.invoice.customersName = thisState.invoices.reference.customersNameReference.value[0].customerName;
                            let temp = thisState.configuration.customer.list
                                .filter((customer) => customer.customerName === thisState.invoice.customersName);
                            if (temp.length === 1) {
                                thisState.invoice.gstin = temp[0].gstin;
                                thisState.invoice.address1 = temp[0].address1;
                                thisState.invoice.address2 = temp[0].address2;
                            }
                            thisState.setMyState(thisState);
                        }}
                        ref={thisState.invoices.reference.customersNameReference.reference}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', '', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoices.reference.customersNameReference.open = false;
                                thisState.invoices.reference.customersNameReference.value[0].customerName = thisState.invoices.reference.customersNameReference.value[0].customerName.toUpperCase()
                                thisState.invoice.customersName = thisState.invoices.reference.customersNameReference.value[0].customerName;
                                let temp = thisState.configuration.customer.list
                                    .filter((customer) => customer.customerName === thisState.invoice.customersName);
                                if (temp.length === 1) {
                                    thisState.invoice.gstin = temp[0].gstin;
                                    thisState.invoice.address1 = temp[0].address1;
                                    thisState.invoice.address2 = temp[0].address2;
                                }
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'gstin', false);
                            }
                        }}
                        onFocus={() => {
                            thisState.invoices.reference.customersNameReference.open = undefined;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Customer GSTIN
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.invoices.disable.gstinDisabled}
                        value={thisState.invoice.gstin}
                        ref={thisState.invoices.reference.gstinReference}
                        onChange={event => {
                            thisState.invoice.gstin = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={async event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'customersName', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoice.gstin = thisState.invoice.gstin.toUpperCase().replaceAll(" ", "");
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'vehicleNo', false);
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
                            label="Vehicle No"
                            checked={thisState.settings.value.hideVehicleNo}
                            onChange={event => {
                                thisState.settings.value.hideVehicleNo = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideVehicleNo ? "hide" : ""}>
                        Vehicle No
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideVehicleNo ? "hide" : "text-center"}
                        disabled={thisState.invoices.disable.vehicleNoDisabled || thisState.settings.value.hideVehicleNo}
                        value={thisState.invoice.vehicleNo}
                        ref={thisState.invoices.reference.vehicleNoReference}
                        onChange={event => {
                            thisState.invoice.vehicleNo = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={async event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'gstin', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoice.vehicleNo = thisState.invoice.vehicleNo.toUpperCase().replaceAll(" ", "");
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'driverName', false);
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
                            label="Driver Name"
                            checked={thisState.settings.value.hideDriverName}
                            onChange={event => {
                                thisState.settings.value.hideDriverName = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideDriverName ? "hide" : ""}>
                        Driver Name
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideDriverName ? "hide" : "text-center"}
                        disabled={thisState.invoices.disable.driverNameDisabled || thisState.settings.value.hideDriverName}
                        value={thisState.invoice.driverName ? thisState.invoice.driverName : ""}
                        ref={thisState.invoices.reference.driverNameReference}
                        onChange={event => {
                            thisState.invoice.driverName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={async event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'vehicleNo', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoice.driverName = thisState.invoice.driverName.toUpperCase().replaceAll(" ", "");
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'material', false);
                            }

                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnOne;
