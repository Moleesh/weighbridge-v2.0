import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const ManualEntry = props => {
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.settings.manualEntryDialog}
            onHide={() => {
                thisState.settings.manualEntryDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Manual Entry
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Password
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="password"
                            autoComplete="none"
                            className="text-centre"
                            value={thisState.settings.manualEntryPassword}
                            onChange={event => {
                                thisState.settings.manualEntryPassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.settings.manualEntryReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.manualEntryPasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.settings.manualEntryDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (
                            thisState.settings.manualEntryPassword ===
                            thisState.adminSettings.MANUAL_ENTRY_PASSWORD
                        ) {
                            thisState.settings.manualEntry = true;
                            thisState.weighing.disable.grossDetailsDisabled = false;
                            thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            thisState.settings.manualEntryDialog = false;
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Manual Entry",
                                message: "Password incorrect"
                            });
                        }
                        thisState.setMyState(thisState)
                    }}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        prevent = true;
                    }}
                    ref={thisState.settings.manualEntryReference}
                >
                    Manual Entry
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManualEntry;
