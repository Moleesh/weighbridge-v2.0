import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const ResetInvoiceNo = props => {
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.settings.resetInvoiceNoDialog}
            onHide={() => {
                thisState.settings.resetInvoiceNo = 1;
                thisState.settings.resetInvoiceNoPassword = "";
                thisState.settings.resetInvoiceNoDialog = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reset Invoice No
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Please Enter Starting Invoice no ..
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            className="text-centre"
                            value={
                                thisState.settings.resetInvoiceNo <= 0
                                    ? 1
                                    : thisState.settings.resetInvoiceNo
                            }
                            onChange={event => {
                                thisState.settings.resetInvoiceNo =
                                    (event.target.value.match("[0-9]+") || []).pop() || "";
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.keyCode === 9 && event.shiftKey) {

                                } else if (event.keyCode === 13 || event.keyCode === 9) {
                                    thisState.settings.resetInvoiceNoPasswordReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.resetInvoiceNoReference}
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
                            value={thisState.settings.resetInvoiceNoPassword}
                            onChange={event => {
                                thisState.settings.resetInvoiceNoPassword = event.target.value;
                                thisState.setMyState(thisState);
                            }}
                            onKeyDown={event => {
                                if (event.keyCode === 9 && event.shiftKey) {

                                } else if (event.keyCode === 13 || event.keyCode === 9) {
                                    thisState.settings.resetInvoiceNoButtonReference.current.focus();
                                }
                            }}
                            ref={thisState.settings.resetInvoiceNoPasswordReference}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        if (
                            thisState.settings.resetInvoiceNoPassword ===
                            thisState.adminSettings.RESET_INVOICE_PASSWORD
                        ) {
                            fetch(
                                thisState.INITIAL_URL +
                                "/invoice/resetInvoiceByProfile?profile=" + thisState.PROFILE + "&invoiceNo=" +
                                thisState.settings.resetInvoiceNo
                            )
                                .then(response => {
                                    if (response.status === 200) {
                                        fetch(thisState.INITIAL_URL + "/setting/getNextInvoiceNoByProfile?profile=" + thisState.PROFILE)
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
                                                thisState.invoice.dummy = false;
                                                thisState.invoices.disable.selector = false;
                                                thisState.invoices.disable.referenceSlipNoDisabled = false;
                                                thisState.invoices.disable.customersNameDisabled = false;
                                                thisState.invoices.disable.gstinDisabled = false;
                                                thisState.invoices.disable.vehicleNoDisabled = false;
                                                thisState.invoices.disable.materialDisabled = false;
                                                thisState.invoices.disable.unitPriceDisabled = false;
                                                thisState.invoices.disable.quantityDisabled = false;
                                                thisState.invoices.disable.address1Disabled = false;
                                                thisState.invoices.disable.address2Disabled = false;
                                                thisState.invoices.disable.timeOfArrivalDisabled = false;
                                                thisState.invoices.disable.saveDisabled = false;
                                                thisState.invoices.disable.printDisabled = true;
                                                thisState.invoice.invoiceNo = result;
                                                if (result === -1) {
                                                    thisState.invoices.disable.saveDisabled = true;
                                                    thisState.SETTING_DISABLED = true;
                                                }
                                                thisState.invoice.referenceSlipNo = "";
                                                thisState.invoice.invoiceTime = "";
                                                thisState.invoice.customersName = "";
                                                thisState.invoices.reference.customersNameReference.value = [
                                                    {customerName: ""}
                                                ];
                                                thisState.invoice.address1 = "";
                                                thisState.invoice.address2 = "";
                                                thisState.invoice.vehicleNo = "";
                                                thisState.invoice.material = "";
                                                thisState.invoices.reference.materialReference.value = [
                                                    {material: ""}
                                                ];
                                                thisState.invoice.unitPrice = 0;
                                                thisState.invoice.quantity = 0;
                                                thisState.invoice.amount = 0;
                                                thisState.invoice._cgst = thisState.settings.value.cgst;
                                                thisState.invoice._sgst = thisState.settings.value.sgst;
                                                thisState.invoice._igst = thisState.settings.value.igst;
                                                thisState.invoice.cgst = 0;
                                                thisState.invoice.sgst = 0;
                                                thisState.invoice.igst = 0;
                                                thisState.invoice.total = 0;
                                                thisState.invoices.igstSelector = false;
                                                thisState.invoices.disablecalculation = false;
                                                thisState.alerts.push({
                                                    id: new Date().getTime(),
                                                    type: "success",
                                                    headline: "Reset Invoice No",
                                                    message: "Invoice No Reset Successfully."
                                                });
                                                thisState.settings.resetInvoiceNo = 1;
                                                thisState.settings.resetInvoiceNoPassword = "";
                                                thisState.settings.resetInvoiceNoDialog = false;
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
                                headline: "Reset Invoice No",
                                message: "Password incorrect"
                            });
                            thisState.settings.resetInvoiceNoPassword = "";
                            thisState.setMyState(thisState);
                            thisState.settings.resetInvoiceNoPasswordReference.current.focus();
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
                    ref={thisState.settings.resetInvoiceNoButtonReference}
                >
                    Reset Invoice No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResetInvoiceNo;
