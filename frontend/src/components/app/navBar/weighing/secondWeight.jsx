import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const SecondWeight = props => {
    let thisState = props.preState;

    return (
        <Modal
            show={thisState.weighing.secondWeight}
            onExited={() => thisState.switchFocus(thisState, 'weighing', '', false)}
            restoreFocus={false}
            onHide={() => {
                thisState.weighing.secondWeight = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Second Weight </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Please Enter previous Slip no ..
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.weighing.secondWeightSlipNo === 0
                                    ? ""
                                    : thisState.weighing.secondWeightSlipNo
                            }
                            onChange={event => {
                                thisState.weighing.secondWeightSlipNo =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.switchFocus(thisState, 'weighing', 'secondWeightButton', false);
                                }
                            }}
                            ref={thisState.weighing.reference.secondWeightFieldReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => {
                        if (thisState.weighing.secondWeightSlipNo !== "") {
                            fetch(
                                thisState.INITIAL_URL +
                                "/weight/secondWeight?profile=" + thisState.PROFILE + "&slipNo=" +
                                thisState.weighing.secondWeightSlipNo
                            ).then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            }).then(result => {
                                thisState.weighing.secondWeight = false;
                                if (!!result.grossTime && !result.tareTime) {
                                    thisState.weighing.disable.grossSelectorDisabled = true;
                                    thisState.weighing.disable.tareSelectorDisabled = true;
                                    thisState.weighing.disable.vehicleNoDisabled = true;
                                    thisState.weighing.tareSelector = true;
                                    thisState.weighing.grossSelector = false;
                                    thisState.weight.material = "Empty";
                                    thisState.weighing.reference.materialReference.value = [
                                        { material: "Empty" }
                                    ];
                                    thisState.weighing.disable.materialDisabled = true;
                                    thisState.weight.grossWeight = result.grossWeight;
                                    thisState.weight.grossTime = result.grossTime;
                                    thisState.weight.vehicleNo = result.vehicleNo;
                                    thisState.weighing.reference.vehicleNoReference.value = [
                                        { vehicleNo: result.vehicleNo }
                                    ];
                                    thisState.weight.customersName = result.customersName;
                                    thisState.weight.transporterName = result.transporterName;
                                    thisState.weight.place = result.place;
                                    thisState.weighing.reference.placeReference.value = [
                                        { place: result.place }
                                    ];
                                    thisState.weighing.disable.secondWeightDisabled = true;
                                } else if (!result.grossTime && !!result.tareTime) {
                                    thisState.weighing.disable.grossSelectorDisabled = true;
                                    thisState.weighing.disable.tareSelectorDisabled = true;
                                    thisState.weighing.disable.vehicleNoDisabled = true;
                                    thisState.weighing.grossSelector = true;
                                    thisState.weighing.tareSelector = false;
                                    thisState.weighing.disable.materialDisabled = false;
                                    thisState.weight.tareWeight = result.tareWeight;
                                    thisState.weight.tareTime = result.tareTime;
                                    thisState.weight.vehicleNo = result.vehicleNo;
                                    thisState.weighing.reference.vehicleNoReference.value = [
                                        { vehicleNo: result.vehicleNo }
                                    ];
                                    thisState.weight.customersName = result.customersName;
                                    thisState.weight.transporterName = result.transporterName;
                                    thisState.weight.place = result.place;
                                    thisState.weighing.reference.placeReference.value = [
                                        { place: result.place }
                                    ];
                                    thisState.weighing.disable.secondWeightDisabled = true;
                                }
                                thisState.setMyState(thisState);
                            }).catch(() => {
                                thisState.weighing.secondWeight = false;
                                thisState.setMyState(thisState);
                            });
                        } else {
                            thisState.weighing.secondWeight = false;
                            thisState.setMyState(thisState);
                        }
                    }}

                    ref={thisState.weighing.reference.secondWeightButtonReference}
                >
                    Get Details
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SecondWeight;
