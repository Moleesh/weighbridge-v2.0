import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import moment from "moment";

import RePrint from "./bottom/rePrint";
import Print from "./bottom/print";

const Bottom = props => {
    let thisState = props.preState;
    let prevent = false;
    let preventSave = false;
    return (
        <Row>
            <Col sm="3">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        if (!preventSave) {
                            preventSave = true;
                            thisState.invoices.disablecalculation = true;
                            thisState.invoice.invoiceTime = moment().format("DD-MM-YYYY HH:mm:ss");
                            thisState.invoice.profile = thisState.PROFILE
                            fetch(thisState.INITIAL_URL + "/invoice/saveInvoice", {
                                method: "POST",
                                body: JSON.stringify(thisState.invoice),
                                headers: {"content-type": "application/json"}
                            })
                                .then(response => {
                                    if (response.status === 200) {
                                        return response.json();
                                    } else throw Error(response.statusText);
                                })
                                .then(result => {
                                    thisState.invoice = result;
                                    thisState.invoices.disable.selector = true;
                                    thisState.invoices.disable.referenceSlipNoDisabled = true;
                                    thisState.invoices.disable.customersNameDisabled = true;
                                    thisState.invoices.disable.gstinDisabled = true;
                                    thisState.invoices.disable.vehicleNoDisabled = true;
                                    thisState.invoices.disable.materialDisabled = true;
                                    thisState.invoices.disable.unitPriceDisabled = true;
                                    thisState.invoices.disable.quantityDisabled = true;
                                    thisState.invoices.disable.address1Disabled = true;
                                    thisState.invoices.disable.address2Disabled = true;
                                    thisState.invoices.disable.timeOfArrivalDisabled = true;
                                    thisState.invoices.disable.saveDisabled = true;
                                    thisState.invoices.disable.printDisabled = false;
                                    thisState
                                        .setMyState(thisState)
                                        .then(() => {
                                                thisState.invoices.reference.printReference.current.focus();
                                                preventSave = false;
                                            }
                                        );
                                })
                                .catch(() => {
                                    preventSave = false;
                                });
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
                    disabled={thisState.invoices.disable.saveDisabled}
                    ref={thisState.invoices.reference.saveReference}
                >
                    Save
                </Button>
            </Col>
            <Col sm="3">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        thisState.invoices.reprint = true;
                        thisState.invoices.reprintSlipNo = "";
                        thisState
                            .setMyState(thisState)
                            .then(() =>
                                thisState.invoices.reference.rePrintFieldReference.current.focus()
                            );
                    }}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        thisState.invoices.disable.printDisabled
                            ? (prevent = true)
                            : thisState.invoices.reference.printReference.current.focus();
                    }}
                >
                    Re Print
                </Button>
                <RePrint preState={thisState}/>
            </Col>
            <Col sm="3">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
                        thisState.invoices.print = true;
                        thisState.setMyState(thisState).then(() =>
                            thisState.invoices.reference.printDialogReference.current.focus()
                        );
                    }}
                    disabled={thisState.invoices.disable.printDisabled}
                    ref={thisState.invoices.reference.printReference}
                    onKeyPress={event => {
                        if (prevent) {
                            prevent = false;
                            event.preventDefault();
                        }
                    }}
                    onFocus={() => {
                        if (thisState.invoices.disable.referenceSlipNoDisabled)
                            prevent = true;
                        else {
                            thisState.invoices.disable.printDisabled = true;
                            thisState.invoices.reference.referenceSlipNoReference.current.focus();
                        }
                    }}
                >
                    Print
                </Button>
                <Print preState={thisState}/>
            </Col>
            <Col sm="3">
                <Button
                    className="adam-button"
                    variant="primary"
                    block
                    onClick={() => {
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
                                thisState.invoice.gstin = "";
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
                                thisState
                                    .setMyState(thisState)
                                    .then(() =>
                                        thisState.invoices.reference.referenceSlipNoReference.current.focus()
                                    );
                            });
                    }}
                >
                    Clear
                </Button>
            </Col>
        </Row>
    );
};

export default Bottom;
