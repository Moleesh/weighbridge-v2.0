import React from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import FileSaver from "file-saver";

const Print = props => {
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.invoices.print}
            onHide={() => {
                fetch(thisState.INITIAL_URL + "/setting/getNextInvoiceNoByProfile?profile=" + thisState.PROFILE).then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else throw Error(response.statusText);
                }).then(result => {
                    return result;
                }).catch(() => {
                    return -1;
                }).then(result => {
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
                    thisState.invoices.disable.timeOfArrivalDisabled = false;
                    thisState.invoices.disable.saveDisabled = false;
                    thisState.invoice.invoiceNo = result;
                    if (result === -1) {
                        thisState.invoices.disable.saveDisabled = true;
                        thisState.SETTING_DISABLED = true;
                    }
                    thisState.invoice.referenceSlipNo = "";
                    thisState.invoice.invoiceTime = "";
                    thisState.invoice.customersName = "";
                    thisState.invoice.gstin = "";
                    thisState.invoices.reference.customersNameReference.value = [
                        { customerName: "" }
                    ];
                    thisState.invoice.address1 = "";
                    thisState.invoice.address2 = "";
                    thisState.invoice.vehicleNo = "";
                    thisState.invoice.material = "";
                    thisState.invoices.reference.materialReference.value = [
                        { material: "" }
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
                    thisState.invoices.print = false;
                    thisState.setMyState(thisState);
                });
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Print </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Do you want to print ?
                    </Form.Label>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="adam-button"
                    variant="primary"
                    onClick={() => {
                        if (thisState.settings.value.printerNameForInvoice === "get as .pdf File") {
                            fetch(thisState.INITIAL_URL + "/printer/getPrintInvoicePDF", {
                                method: "POST",
                                body: JSON.stringify({
                                    invoice: thisState.invoice,
                                    printerName: thisState.settings.value.printerNameForInvoice,
                                    noOfCopies: thisState.settings.value.noOfCopiesForInvoice,
                                    printFormat: thisState.settings.value.printFormatForInvoice,
                                    weighbridgeName: thisState.settings.value.weighbridgeName,
                                    weighbridgeAddress: thisState.settings.value.weighbridgeAddress,
                                    contacts: thisState.settings.value.contacts,
                                    phone: thisState.settings.value.phone,
                                    footer: thisState.settings.value.footer,
                                    invoiceHeader: thisState.settings.value.invoiceHeader,
                                    invoiceIdentifier: thisState.settings.value.invoiceIdentifier,
                                    invoiceFooter: thisState.settings.value.invoiceFooter,
                                    gstin: thisState.settings.value.gstin,
                                    additionalInformation: thisState.settings.value.additionalInformation
                                }),
                                headers: { "content-type": "application/json" }
                            }).then(response => {
                                if (response.status !== 200) {
                                    throw Error(response.statusText);
                                }
                                return response.blob();
                            }).then(blob => {
                                FileSaver.saveAs(blob, "invoice.pdf");
                            });
                        } else {
                            fetch(thisState.INITIAL_URL + "/printer/printInvoice", {
                                method: "POST",
                                body: JSON.stringify({
                                    invoice: thisState.invoice,
                                    printerName: thisState.settings.value.printerNameForInvoice,
                                    noOfCopies: thisState.settings.value.noOfCopiesForInvoice,
                                    printFormat: thisState.settings.value.printFormatForInvoice,
                                    weighbridgeName: thisState.settings.value.weighbridgeName,
                                    weighbridgeAddress: thisState.settings.value.weighbridgeAddress,
                                    contacts: thisState.settings.value.contacts,
                                    phone: thisState.settings.value.phone,
                                    footer: thisState.settings.value.footer,
                                    invoiceHeader: thisState.settings.value.invoiceHeader,
                                    invoiceIdentifier: thisState.settings.value.invoiceIdentifier,
                                    invoiceFooter: thisState.settings.value.invoiceFooter,
                                    gstin: thisState.settings.value.gstin,
                                    additionalInformation: thisState.settings.value.additionalInformation

                                }),
                                headers: { "content-type": "application/json" }
                            }).then(response => {
                                if (response.status !== 200) {
                                    throw Error(response.statusText);
                                }
                            });
                        }
                        fetch(thisState.INITIAL_URL + "/setting/getNextInvoiceNoByProfile?profile=" + thisState.PROFILE).then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            return result;
                        }).catch(() => {
                            return -1;
                        }).then(result => {
                            thisState.invoice.dummy = false;
                            thisState.invoices.disable.selector = false;
                            thisState.invoices.disable.referenceSlipNoDisabled = false;
                            thisState.invoices.disable.customersNameDisabled = false;
                            thisState.invoices.disable.gstinDisabled = false;
                            thisState.invoices.disable.vehicleNoDisabled = false;
                            thisState.invoices.disable.driverNameDisabled = false;
                            thisState.invoices.disable.materialDisabled = false;
                            thisState.invoices.disable.unitPriceDisabled = false;
                            thisState.invoices.disable.quantityDisabled = false;
                            thisState.invoices.disable.address1Disabled = false;
                            thisState.invoices.disable.address2Disabled = false;
                            thisState.invoices.disable.timeOfArrivalDisabled = false;
                            thisState.invoices.disable.modeOfPaymentDisabled = false;
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
                            thisState.invoice.gstin = "";
                            thisState.invoices.reference.customersNameReference.value = [
                                { customerName: "" }
                            ];
                            thisState.invoice.address1 = "";
                            thisState.invoice.address2 = "";
                            thisState.invoice.timeOfArrival = "";
                            thisState.invoice.modeOfPayment = "";
                            thisState.invoices.reference.modeOfPaymentReference.value = [""];
                            thisState.invoice.vehicleNo = "";
                            thisState.invoice.driverName = "";
                            thisState.invoice.material = "";
                            thisState.invoices.reference.materialReference.value = [
                                { material: "" }
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
                            thisState.invoices.print = false;
                            thisState.setMyState(thisState);
                        });
                    }}
                    ref={thisState.invoices.reference.printDialogReference}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        prevent = true;
                    }}
                >
                    Print
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        fetch(thisState.INITIAL_URL + "/setting/getNextInvoiceNoByProfile?profile=" + thisState.PROFILE).then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            return result;
                        }).catch(() => {
                            return -1;
                        }).then(result => {
                            thisState.invoice.dummy = false;
                            thisState.invoices.disable.selector = false;
                            thisState.invoices.disable.referenceSlipNoDisabled = false;
                            thisState.invoices.disable.customersNameDisabled = false;
                            thisState.invoices.disable.gstinDisabled = false;
                            thisState.invoices.disable.vehicleNoDisabled = false;
                            thisState.invoices.disable.driverNameDisabled = false;
                            thisState.invoices.disable.materialDisabled = false;
                            thisState.invoices.disable.unitPriceDisabled = false;
                            thisState.invoices.disable.quantityDisabled = false;
                            thisState.invoices.disable.address1Disabled = false;
                            thisState.invoices.disable.address2Disabled = false;
                            thisState.invoices.disable.timeOfArrivalDisabled = false;
                            thisState.invoices.disable.modeOfPaymentDisabled = false;
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
                            thisState.invoice.gstin = "";
                            thisState.invoices.reference.customersNameReference.value = [
                                { customerName: "" }
                            ];
                            thisState.invoice.address1 = "";
                            thisState.invoice.address2 = "";
                            thisState.invoice.timeOfArrival = "";
                            thisState.invoice.modeOfPayment = "";
                            thisState.invoices.reference.modeOfPaymentReference.value = [""];
                            thisState.invoice.vehicleNo = "";
                            thisState.invoice.driverName = "";
                            thisState.invoice.material = "";
                            thisState.invoices.reference.materialReference.value = [
                                { material: "" }
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
                            thisState.invoices.print = false;
                            thisState.setMyState(thisState);
                        });
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Print;
