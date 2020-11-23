import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const InvoiceNo = props => {
    let thisState = props.preState;
    let prevent = false;

    return (
        <Modal
            show={thisState.invoices.dummySelectorDialog}
            onHide={() => {
                thisState.invoices.dummySelectorDialog = false;
                thisState.setMyState(thisState);
            }}
            onExited={() => thisState.switchFocus(thisState, 'invoices', '', false)}
            restoreFocus={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Dummy Invoice No
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Dummy Invoice No
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="text"
                            autoComplete="none"
                            className="text-centre"
                            value={thisState.invoices.dummyInvoiceNo}
                            onChange={event => {
                                thisState.invoices.dummyInvoiceNo =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.key === "Tab" && event.shiftKey) {

                                } else if (event.key === "Enter" || event.key === "Tab") {
                                    thisState.switchFocus(thisState, 'invoices', 'dummySelector', false);
                                }
                            }}
                            ref={thisState.invoices.reference.dummyInvoiceNoReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.invoices.dummySelectorDialog = false;
                        thisState.setMyState(thisState)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        fetch(thisState.INITIAL_URL + "/invoice/checkDummyByProfile?invoiceNo=" + thisState.invoices.dummyInvoiceNo + "&profile=" + thisState.PROFILE).then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            return result;
                        }).catch(() => {
                            return false;
                        }).then(result => {
                            if (result) {
                                thisState.invoice.dummy = true;
                                thisState.invoice.invoiceNo = thisState.invoices.dummyInvoiceNo;
                                thisState.invoices.dummySelectorDialog = false;
                            } else {
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "danger",
                                    headline: "Dummy Invoice No not available",
                                    message: "Please try another Invoice No"
                                });
                            }
                            thisState.setMyState(thisState)
                        });


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
                    ref={thisState.invoices.reference.dummySelectorReference}
                >
                    Check Dummy Invoice No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceNo;
