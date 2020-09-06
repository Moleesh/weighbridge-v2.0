import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ColumnTwo = props => {
    let thisState = props.preState;
    return (
        <Col sm="4" className="mt-2">
            <Form.Group as={Row}>
                {thisState.settings.hideFields ?
                    <Col sm="6">
                        <Form.Check
                            type="checkbox"
                            label="Customer's Name"
                            checked={thisState.settings.value.hideCustomerName}
                            onChange={event => {
                                thisState.settings.value.hideCustomerName = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideCustomerName ? "hide" : ""}>
                        Customer's Name
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideCustomerName ? "hide" : "text-center"}
                        disabled={thisState.weighing.disable.customersNameDisabled || thisState.settings.value.hideCustomerName}
                        ref={thisState.weighing.reference.customersNameReference}
                        value={thisState.weight.customersName}
                        onChange={event => {
                            thisState.weight.customersName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.keyCode === 9 && event.shiftKey)
                                !thisState.weighing.disable.materialDisabled
                                    ? thisState.weighing.reference.materialReference.reference.current.focus()
                                    : thisState.weighing.reference.vehicleNoReference.current.focus();
                            else if ((event.keyCode === 13) || (event.keyCode === 9)) {
                                thisState.weight.customersName = thisState.weight.customersName
                                    .toUpperCase();
                                thisState.setMyState(thisState);
                                !thisState.settings.value.hideTransporterName
                                    ? thisState.weighing.reference.transporterNameReference.current.focus()
                                    : !thisState.settings.value.hideCharges
                                    ? thisState.weighing.reference.chargesReference.current.focus()
                                    : !thisState.settings.value.hideRemarks
                                        ? thisState.weighing.reference.remarksReference.current.focus()
                                        : thisState.weighing.reference.getWeightReference.current.focus();
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
                            label="Transporter Name"
                            checked={thisState.settings.value.hideTransporterName}
                            onChange={event => {
                                thisState.settings.value.hideTransporterName = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideTransporterName ? "hide" : ""}>
                        Transporter Name
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideTransporterName ? "hide" : "text-center"}
                        disabled={thisState.weighing.disable.transporterNameDisabled || thisState.settings.value.hideTransporterName}
                        ref={thisState.weighing.reference.transporterNameReference}
                        value={thisState.weight.transporterName}
                        onChange={event => {
                            thisState.weight.transporterName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.keyCode === 9 && event.shiftKey)
                                !thisState.settings.value.hideCustomerName
                                    ? thisState.weighing.reference.customersNameReference.current.focus()
                                    : !thisState.weighing.disable.materialDisabled
                                    ? thisState.weighing.reference.materialReference.reference.current.focus()
                                    : thisState.weighing.reference.vehicleNoReference.current.focus();
                            else if ((event.keyCode === 13) || (event.keyCode === 9)) {
                                thisState.weight.transporterName = thisState.weight.transporterName.toUpperCase();
                                thisState.setMyState(thisState);
                                !thisState.settings.value.hideCharges
                                    ? thisState.weighing.reference.chargesReference.current.focus()
                                    : !thisState.settings.value.hideRemarks
                                    ? thisState.weighing.reference.remarksReference.current.focus()
                                    : thisState.weighing.reference.getWeightReference.current.focus();
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Gross Weight
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.weight.grossWeight === 0
                                ? ""
                                : thisState.weight.grossWeight
                        }
                        onChange={event => {
                            thisState.weight.grossWeight = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Tare Weight
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.weight.tareWeight === 0
                                ? ""
                                : thisState.weight.tareWeight
                        }
                        onChange={event => {
                            thisState.weight.tareWeight = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Net Weight
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.weight.nettWeight === 0
                                ? ""
                                : thisState.weight.nettWeight
                        }
                        onChange={event => {
                            thisState.weight.nettWeight = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnTwo;
