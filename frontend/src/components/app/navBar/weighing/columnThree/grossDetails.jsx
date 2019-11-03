import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import DateTime from 'react-datetime';
import moment from "moment";

const GrossDetails = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Modal
            show={thisState.weighing.grossDetails}
            onHide={() => {
                thisState.weighing.grossDetails = false;
                thisState.setMyState(thisState)
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Gross Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Gross Weight
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.weighing.grossDetailsWeight === 0
                                    ? ""
                                    : thisState.weighing.grossDetailsWeight
                            }
                            onChange={event => {
                                thisState.weighing.grossDetailsWeight =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            ref={thisState.weighing.reference.grossDetailsWeightReference}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Gross Date & TIme
                    </Form.Label>
                    <Col sm="6" >
                        <DateTime
                            dateFormat="DD-MM-YYYY"
                            timeFormat="HH:mm:ss"
                            value={thisState.weighing.grossDetailsDate}
                            inputProps={{
                                readOnly: true,
                                className: "form-control details-input"
                            }}
                            onChange={event => {
                                thisState.weighing.grossDetailsDate = moment(event).format("DD-MM-YYYY HH:mm:ss");
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
                        thisState.weighing.grossDetails = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (thisState.weighing.grossDetailsWeight !== "" && thisState.weighing.grossDetailsWeight >= 0) {
                            thisState.weighing.grossDetails = false;
                            thisState.weight.grossWeight = thisState.weighing.grossDetailsWeight;
                            thisState.weight.grossTime = thisState.weighing.grossDetailsDate;
                            thisState.setMyState(thisState)
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Empty or Zero Gross Weight",
                                message: "Gross Weight Cant be Empty or Zero"
                            });
                        }
                        thisState.setMyState(thisState)
                    }}
                >
                    Get Details
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default GrossDetails;
