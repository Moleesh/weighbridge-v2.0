import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const ResetSlipNo = props => {
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.settings.resetSlipNoDialog}
            onHide={() => {
                thisState.settings.resetSlipNo = 1;
                thisState.settings.resetSlipNoPassword = "";
                thisState.settings.resetSlipNoDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reset Slip No
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Please Enter Starting Slip no ..
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.settings.resetSlipNo <= 0
                                    ? 1
                                    : thisState.settings.resetSlipNo
                            }
                            onChange={event => {
                                thisState.settings.resetSlipNo =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.settings.resetSlipNoPasswordReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.resetSlipNoReference}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Password
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="password"
                            autoComplete="none"
                            className="text-centre"
                            value={thisState.settings.resetSlipNoPassword}
                            onChange={event => {
                                thisState.settings.resetSlipNoPassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.settings.resetSlipNoButtonReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.resetSlipNoPasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        if (
                            thisState.settings.resetSlipNoPassword ===
                            thisState.adminSettings.RESET_SLIP_PASSWORD
                        ) {
                            fetch(
                                thisState.INITIAL_URL +
                                "/weight/resetWeightByProfile?profile=" + thisState.PROFILE + "&slipNo=" +
                                thisState.settings.resetSlipNo
                            ).then(response => {
                                if (response.status === 200) {
                                    fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    }).then(result => {
                                        return result;
                                    }).catch(() => {
                                        return -1;
                                    }).then(result => {
                                        thisState.weighing.disable.grossSelectorDisabled = false;
                                        thisState.weighing.disable.tareSelectorDisabled = false;
                                        thisState.weighing.disable.vehicleNoDisabled = false;
                                        thisState.weighing.disable.customersNameDisabled = false;
                                        thisState.weighing.disable.transporterNameDisabled = false;
                                        thisState.weighing.disable.materialDisabled = false;
                                        thisState.weighing.disable.chargesDisabled = false;
                                        thisState.weighing.disable.remarksDisabled = false;
                                        thisState.weighing.disable.getWeightDisabled = false;
                                        thisState.weighing.disable.saveDisabled = true;
                                        thisState.weighing.disable.printDisabled = true;
                                        thisState.weight.slipNo = result;
                                        if (result === -1) {
                                            thisState.weighing.disable.getWeightDisabled = true;
                                            thisState.SETTING_DISABLED = true;
                                        }
                                        thisState.weight.vehicleNo = "";
                                        thisState.weight.customersName = "";
                                        thisState.weight.transporterName = "";
                                        thisState.weight.material = "";
                                        thisState.weighing.reference.materialReference.value = [
                                            {material: ""}
                                        ];
                                        thisState.weight.grossWeight = "";
                                        thisState.weight.grossTime = "";
                                        thisState.weight.tareWeight = "";
                                        thisState.weight.tareTime = "";
                                        thisState.weight.nettWeight = "";
                                        thisState.weight.nettTime = "";
                                        thisState.weight.charges = "";
                                        thisState.weight.remarks = "";
                                        thisState.weighing.grossSelector = true;
                                        thisState.weighing.tareSelector = false;
                                        thisState.alerts.push({
                                            id: new Date().getTime(),
                                            type: "success",
                                            headline: "Reset Slip No",
                                            message: "Slip No Reset Successfully."
                                        });
                                        thisState.settings.resetSlipNo = 1;
                                        thisState.settings.resetSlipNoPassword = "";
                                        thisState.settings.resetSlipNoDialog = false;
                                        thisState.setMyState(thisState);
                                    });
                                } else throw Error(response.statusText);
                            });
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Reset Slip No",
                                message: "Password incorrect"
                            });
                            thisState.settings.resetSlipNoPassword = "";
                            thisState.setMyState(thisState);
                            thisState.settings.resetSlipNoPasswordReference.current.focus();
                        }
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
                    ref={thisState.settings.resetSlipNoButtonReference}
                >
                    Reset Slip No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResetSlipNo;
