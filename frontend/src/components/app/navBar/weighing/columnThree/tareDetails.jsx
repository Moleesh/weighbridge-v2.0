import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

import DateTime from 'react-datetime';
import moment from "moment";

const TareDetails = props => {
    let thisState = props.preState;
    return (
        <Modal
            show={thisState.weighing.tareDetails}
            onHide={() => {
                thisState.weighing.tareDetails = false;
                thisState.setMyState(thisState)
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Tare Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Tare Weight
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.weighing.tareDetailsWeight === 0
                                    ? ""
                                    : thisState.weighing.tareDetailsWeight
                            }
                            onChange={event => {
                                thisState.weighing.tareDetailsWeight =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            ref={thisState.weighing.reference.tareDetailsWeightReference}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Tare Date & TIme
                    </Form.Label>
                    <Col sm="6">
                        <DateTime
                            dateFormat="DD-MM-YYYY"
                            timeFormat="HH:mm:ss"
                            value={thisState.weighing.tareDetailsDate}
                            inputProps={{
                                readOnly: true,
                                className: "form-control details-input"
                            }}
                            onChange={event => {
                                thisState.weighing.tareDetailsDate = moment(event).format("DD-MM-YYYY HH:mm:ss");

                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.weighing.tareDetails = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (thisState.weighing.tareDetailsWeight !== "" && thisState.weighing.tareDetailsWeight >= 0) {
                            thisState.weighing.tareDetails = false;
                            thisState.weight.tareWeight = thisState.weighing.tareDetailsWeight;
                            thisState.weight.tareTime = thisState.weighing.tareDetailsDate;
                            thisState.setMyState(thisState)
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Empty or Zero Tare Weight",
                                message: "Tare Weight Cant be Empty or Zero"
                            });
                        }
                        thisState.setMyState(thisState)
                    }}
                >
                    Get Details
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TareDetails;
