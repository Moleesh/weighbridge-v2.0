import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const AddNewProfile = props => {
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.settings.addNewProfileDialog}
            onHide={() => {
                thisState.settings.addNewProfileDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Profile Name
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="text"
                            autoComplete="none"
                            className="text-centre"
                            value={thisState.settings.newProfile}
                            onChange={event => {
                                thisState.settings.newProfile = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.settings.addNewProfileReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.newProfileReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.settings.addNewProfileDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (thisState.settings.newProfile !== "") {
                            thisState.settings.addNewProfileDialog = false;
                            fetch(thisState.INITIAL_URL + "/profile/addUpdateProfile?profile=" + thisState.settings.newProfile, {
                                method: "PATCH",
                            }).then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            }).then((profiles) => {
                                thisState.profiles = profiles;
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "success",
                                    headline: "Adding New Profile",
                                    message: "Adding New Profile Successfully."
                                });
                                thisState.setMyState(thisState);
                            }).catch(() => {
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "danger",
                                    headline: "Adding New Profile",
                                    message: "Adding New Profile Failed."
                                });
                                thisState.setMyState(thisState);
                            });
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "New Profile",
                                message: "Profile Name is empty"
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
                    ref={thisState.settings.addNewProfileReference}
                >
                    Add Profile
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewProfile;
