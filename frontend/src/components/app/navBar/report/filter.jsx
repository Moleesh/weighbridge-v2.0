import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const Filter = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Modal
            show={thisState.report.filterPopUp}
            onHide={() => {
                thisState.report.filterPopUp = false;
                thisState
                    .setMyState(thisState)
                    .then(() =>
                        thisState.weighing.reference.rePrintReference.current.focus()
                    );
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Available Filters
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="pl-4">
                    {Object.keys(thisState.report.header).map(key => (
                        <Col sm="4" key={key}>
                            <Form.Group as={Row}>
                                <Form.Check
                                    type="checkbox"
                                    checked={thisState.report.filter[key]}
                                    onClick={() => {
                                        thisState.report.filter[key] = !thisState.report.filter[
                                            key
                                            ];
                                        thisState.setMyState(thisState);
                                    }}
                                    onChange={() => {
                                    }}
                                    label={thisState.report.header[key]}
                                />
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        thisState.report.filterPopUp = false;
                        thisState.setMyState(thisState);
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Filter;
