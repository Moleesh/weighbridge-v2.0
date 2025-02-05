import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const Webcams = props => {
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.settings.webcamsDialog}
            onHide={() => {
                thisState.settings.webcamsDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enable Webcams
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
                            value={thisState.settings.webcamsPassword}
                            onChange={event => {
                                thisState.settings.webcamsPassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.settings.webcamsReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.webcamsPasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.settings.webcamsDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (
                            thisState.settings.webcamsPassword === thisState.adminSettings.WEBCAMS_PASSWORD) {
                            thisState.settings.value.webcams = true;
                            thisState.settings.webcamsDialog = false;
                        } else {
                            thisState.settings.webcams = false;
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Enable Webcams",
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
                    ref={thisState.settings.webcamsReference}
                >
                    Enable Webcams
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Webcams;
