import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const RePrint = props => {
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.weighing.reprint}
            onHide={() => {
                thisState.weighing.reprint = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Reprint </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Please Enter Reprint Slip no ..
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.weighing.reprintSlipNo === 0
                                    ? ""
                                    : thisState.weighing.reprintSlipNo
                            }
                            onChange={event => {
                                thisState.weighing.reprintSlipNo =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.switchFocus(thisState, 'weighing', 'rePrintButton', false);
                                }
                            }}
                            ref={thisState.weighing.reference.rePrintFieldReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => {
                        if (thisState.weighing.reprintSlipNo !== "") {
                            fetch(
                                thisState.INITIAL_URL +
                                "/weight/getWeightBySlipNoAndProfile?profile=" + thisState.PROFILE + "&slipNo=" +
                                thisState.weighing.reprintSlipNo
                            ).then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            }).then(result => {
                                thisState.weighing.reprint = false;
                                thisState.weighing.disable.grossSelectorDisabled = true;
                                thisState.weighing.disable.tareSelectorDisabled = true;
                                thisState.weighing.disable.vehicleNoDisabled = true;
                                thisState.weighing.disable.customersNameDisabled = true;
                                thisState.weighing.disable.transporterNameDisabled = true;
                                thisState.weighing.disable.placeDisabled = true;
                                thisState.weighing.disable.materialDisabled = true;
                                thisState.weighing.disable.chargesDisabled = true;
                                thisState.weighing.disable.remarksDisabled = true;
                                thisState.weighing.disable.getWeightDisabled = true;
                                thisState.weighing.disable.saveDisabled = true;
                                thisState.weighing.disable.printDisabled = false;
                                thisState.weighing.disable.secondWeightDisabled = true;
                                thisState.weight = result;
                                thisState.weighing.reference.vehicleNoReference.value = [
                                    { vehicleNo: thisState.weight.vehicleNo }
                                ];
                                thisState.weighing.reference.materialReference.value = [
                                    { material: thisState.weight.material }
                                ];
                                thisState.weighing.reference.placeReference.value = [
                                    { place: thisState.weight.place }
                                ];
                                thisState.setMyState(thisState);
                            }).catch(() => {
                                thisState.weighing.reprint = false;
                                thisState.setMyState(thisState);
                            });
                        } else {
                            thisState.weighing.reprint = false;
                            thisState.setMyState(thisState);
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
                    ref={thisState.weighing.reference.rePrintButtonReference}
                >
                    Get Details
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RePrint;
