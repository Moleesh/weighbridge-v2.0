import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const EditEnable = props => {
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.settings.editEnableDialog}
            onHide={() => {
                thisState.settings.editEnableDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enable Edit Records
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
                            autoComplete="off"
                            className="text-centre"
                            value={thisState.settings.editEnablePassword}
                            onChange={event => {
                                thisState.settings.editEnablePassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.keyCode === 9 && event.shiftKey) ;
                                else if (event.keyCode === 13 || event.keyCode === 9)
                                    thisState.settings.editEnableReference.current.focus();
                            }}
                            ref={thisState.settings.editEnablePasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.settings.editEnableDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (
                            thisState.settings.editEnablePassword ===
                            thisState.adminSettings.EDIT_ENABLE_PASSWORD
                        ) {
                            thisState.settings.editEnable = true;
                            thisState.weighing.disable.grossDetailsDisabled = false;
                            thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            thisState.settings.editEnableDialog = false;
                        } else {
                            thisState.settings.editEnable = false;
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Enable Edit Records",
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
                    ref={thisState.settings.editEnableReference}
                >
                    Enable Edit Records
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditEnable;
