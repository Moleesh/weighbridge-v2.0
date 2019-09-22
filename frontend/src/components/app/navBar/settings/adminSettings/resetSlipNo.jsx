import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const ResetSlipNo = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.setting.resetSlipNoDialog}
            onHide={() => {
                thisState.setting.resetSlipNo = 1;
                thisState.setting.resetSlipNoPassword = "";
                thisState.setting.resetSlipNoDialog = false;
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
                                thisState.setting.resetSlipNo <= 0
                                    ? 1
                                    : thisState.setting.resetSlipNo
                            }
                            onChange={event => {
                                thisState.setting.resetSlipNo =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                // noinspection StatementWithEmptyBodyJS
                                if (event.keyCode === 9 && event.shiftKey) ;
                                else if (event.keyCode === 13 || event.keyCode === 9)
                                    thisState.setting.resetSlipNoPasswordReference.current.focus();
                            }}
                            ref={thisState.setting.resetSlipNoReference}
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
                            autoComplete="off"
                            className="text-centre"
                            value={thisState.setting.resetSlipNoPassword}
                            onChange={event => {
                                thisState.setting.resetSlipNoPassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                // noinspection StatementWithEmptyBodyJS
                                if (event.keyCode === 9 && event.shiftKey) ;
                                else if (event.keyCode === 13 || event.keyCode === 9)
                                    thisState.setting.resetSlipNoButtonReference.current.focus();
                            }}
                            ref={thisState.setting.resetSlipNoPasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        if (
                            thisState.setting.resetSlipNoPassword ===
                            thisState.setting.value.RESET_SLIP_PASSWORD
                        ) {
                            fetch(
                                thisState.INITIAL_URL +
                                "/resetWeight?slipNo=" +
                                thisState.setting.resetSlipNo
                            )
                                .then(response => {
                                    if (response.status === 200) {
                                        // noinspection DuplicatedCode
                                        fetch(thisState.INITIAL_URL + "/getNextSlipNo")
                                            .then(response => {
                                                if (response.status === 200) {
                                                    return response.json();
                                                } else throw Error(response.statusText);
                                            })
                                            .then(result => {
                                                return result;
                                            })
                                            .catch(() => {
                                                return -1;
                                            })
                                            .then(result => {
                                                thisState.weighing.disable.grossSelectorDisabled = false;
                                                thisState.weighing.disable.tareSelectorDisabled = false;
                                                thisState.weighing.disable.vehicleNoDisabled = false;
                                                thisState.weighing.disable.customersNameDisabled = false;
                                                thisState.weighing.disable.transporterNameDisabled = false;
                                                thisState.weighing.disable.materialDisabled = false;
                                                thisState.weighing.disable.chargesDisabled = false;
                                                thisState.weighing.disable.remarksDisabled = false;
                                                thisState.weighing.disable.getWeightDisabled =
                                                    result === -1;
                                                thisState.weighing.disable.saveDisabled = true;
                                                thisState.weighing.disable.printDisabled = true;
                                                thisState.weight.slipNo = result;
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
                                                thisState.setting.resetSlipNo = 1;
                                                thisState.setting.resetSlipNoPassword = "";
                                                thisState.setting.resetSlipNoDialog = false;
                                                thisState.setMyState(thisState);
                                            });
                                    } else throw Error(response.statusText);
                                })
                                .catch(() => {
                                });
                        } else {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Reset Slip No",
                                message: "Password incorrect"
                            });
                            thisState.setting.resetSlipNoPassword = "";
                            thisState.setMyState(thisState);
                            thisState.setting.resetSlipNoPasswordReference.current.focus();
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
                    ref={thisState.setting.resetSlipNoButtonReference}
                >
                    Reset Slip No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResetSlipNo;
