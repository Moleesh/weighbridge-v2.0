import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const EditEnable = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.setting.editEnableDialog}
            onHide={() => {
                thisState.setting.editEnableDialog = false;
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
                            value={thisState.setting.editEnablePassword}
                            onChange={event => {
                                thisState.setting.editEnablePassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                // noinspection StatementWithEmptyBodyJS
                                if (event.keyCode === 9 && event.shiftKey);
                                else if (event.keyCode === 13 || event.keyCode === 9)
                                    thisState.setting.editEnableReference.current.focus();
                            }}
                            ref={thisState.setting.editEnablePasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.setting.editEnableDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (
                            thisState.setting.editEnablePassword ===
                            thisState.setting.value.EDIT_ENABLE_PASSWORD
                        ) {
                            thisState.setting.editEnable = true;
                            thisState.weighing.disable.grossDetailsDisabled = false;
                            thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            thisState.setting.editEnableDialog = false;
                        } else {
                            thisState.setting.editEnable = false;
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
                    ref={thisState.setting.editEnableReference}
                >
                    Enable Edit Records
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditEnable;
