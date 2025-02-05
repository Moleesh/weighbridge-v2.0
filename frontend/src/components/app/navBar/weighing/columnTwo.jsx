import React from "react";
import { Col, Form, Row } from "react-bootstrap";

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
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'weighing', 'material', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.weight.customersName = thisState.weight.customersName.toUpperCase();
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'weighing', 'transporterName', false);
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
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'weighing', 'customersName', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.weight.transporterName = thisState.weight.transporterName.toUpperCase();
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'weighing', 'place', false);
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
                            label="Place"
                            checked={thisState.settings.value.hidePlace}
                            onChange={event => {
                                thisState.settings.value.hidePlace = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hidePlace ? "hide" : ""}>
                        Place
                    </Form.Label>
                }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hidePlace ? "hide" : "text-center"}
                        disabled={thisState.weighing.disable.placeDisabled || thisState.settings.value.hidePlace}
                        ref={thisState.weighing.reference.placeReference}
                        value={thisState.weight.place}
                        onChange={event => {
                            thisState.weight.place = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'weighing', 'transporterName', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.weight.place = thisState.weight.place.toUpperCase();
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'weighing', 'charges', false);
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
