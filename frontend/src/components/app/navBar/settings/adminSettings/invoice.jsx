import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const Invoice = props => {
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.settings.invoiceDialog}
            onHide={() => {
                thisState.settings.invoiceDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enable Invoice
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
                            value={thisState.settings.invoicePassword}
                            onChange={event => {
                                thisState.settings.invoicePassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.settings.invoiceReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.invoicePasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.settings.invoiceDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        if (
                            thisState.settings.invoicePassword === thisState.adminSettings.INVOICE_PASSWORD) {
                            thisState.settings.value.invoice = true;
                            thisState.settings.invoiceDialog = false;
                        } else {
                            thisState.settings.invoice = false;
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "danger",
                                headline: "Enable Invoice",
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
                    ref={thisState.settings.invoiceReference}
                >
                    Enable Invoice
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Invoice;
