import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const RePrint = props => {
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.invoices.reprint}
            onHide={() => {
                thisState.invoices.reprint = false;
                thisState.setMyState(thisState);
            }}
            onAfterClose={() => thisState.switchFocus(thisState, 'invoices', '', false)}
            onRequestClose={() => thisState.switchFocus(thisState, 'invoices', '', false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Reprint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Please Enter Reprint Invoice no ..
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.invoices.reprintSlipNo === 0
                                    ? ""
                                    : thisState.invoices.reprintSlipNo
                            }
                            onChange={event => {
                                thisState.invoices.reprintSlipNo = (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.switchFocus(thisState, 'invoices', 'rePrintButton', false);

                                }
                            }}
                            ref={thisState.invoices.reference.rePrintFieldReference}
                        />
                    </Col>
                </Form.Group>
                <Row>
                    <Col sm="7"/>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Dummy Invoice"
                            checked={thisState.invoices.dummy}
                            onChange={event => {
                                thisState.invoices.dummy = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Form.Group>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => {
                        if (thisState.invoices.reprintSlipNo !== "") {
                            fetch(
                                thisState.INITIAL_URL +
                                "/invoice/getInvoiceByInvoiceNoAndProfile?dummy=" + thisState.invoices.dummy + "&profile=" + thisState.PROFILE + "&invoiceNo=" +
                                thisState.invoices.reprintSlipNo
                            ).then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            }).then(result => {
                                thisState.invoices.reprint = false;
                                thisState.invoices.disable.selector = true;
                                thisState.invoices.disable.referenceSlipNoDisabled = true;
                                thisState.invoices.disable.customersNameDisabled = true;
                                thisState.invoices.disable.vehicleNoDisabled = true;
                                thisState.invoices.disable.materialDisabled = true;
                                thisState.invoices.disable.unitPriceDisabled = true;
                                thisState.invoices.disable.quantityDisabled = true;
                                thisState.invoices.disable.address1Disabled = true;
                                thisState.invoices.disable.address2Disabled = true;
                                thisState.invoices.disable.timeOfArrivalDisabled = true;
                                thisState.invoices.disable.saveDisabled = true;
                                thisState.invoices.disable.printDisabled = false;
                                thisState.invoice = result;
                                thisState.invoices.reference.customersNameReference.value = [
                                    {customerName: thisState.invoice.customersName}
                                ];
                                thisState.invoices.reference.materialReference.value = [
                                    {material: thisState.invoice.material}
                                ];
                                thisState.setMyState(thisState);
                            }).catch(() => {
                                thisState.invoices.reprint = false;
                                thisState.setMyState(thisState);
                            });
                        } else {
                            thisState.invoices.reprint = false;
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
                    ref={thisState.invoices.reference.rePrintButtonReference}
                >
                    Get Details
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RePrint;
