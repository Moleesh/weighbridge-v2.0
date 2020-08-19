import React from "react";
import {Button, Form, Modal, Row} from "react-bootstrap";

import moment from "moment";

const InvoiceSelect = props => {
    let thisState = props.preState;
    let prevent = false;
    return (
        <Modal
            show={thisState.report.invoiceSelect}
            onHide={() => {
                thisState.report.invoiceSelect = false;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Please Choose the type of Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Check
                        type="radio"
                        name="dummy"
                        className="mx-5"
                        label="Invoice"
                        checked={thisState.report.dummy === "invoice"}
                        onClick={() => {
                            thisState.report.dummy = "invoice";
                            thisState.setMyState(thisState);
                        }}
                        onChange={() => {
                        }}
                    />
                    <Form.Check
                        type="radio"
                        name="dummy"
                        className="mx-5"
                        label="Dummy invoice"
                        checked={thisState.report.dummy === "dummy"}
                        onClick={() => {
                            thisState.report.dummy = "dummy";
                            thisState.setMyState(thisState);
                        }}
                        onChange={() => {
                        }}
                    />
                    <Form.Check
                        type="radio"
                        name="dummy"
                        className="mx-5"
                        label="Both"
                        checked={thisState.report.dummy === "both"}
                        onClick={() => {
                            thisState.report.dummy = "both";
                            thisState.setMyState(thisState);
                        }}
                        onChange={() => {
                        }}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => {
                        fetch(thisState.INITIAL_URL + "/invoice/getInvoiceReportByProfile", {
                            method: "POST",
                            body: JSON.stringify({
                                startDate: moment(thisState.report.date.start).format("DD-MM-YYYY HH:mm:ss"),
                                endDate: moment(thisState.report.date.end).format("DD-MM-YYYY HH:mm:ss"),
                                inputLabel: thisState.report.inputLabel,
                                input: thisState.report.input,
                                dummy: thisState.report.dummy,
                                profile: thisState.PROFILE
                            }),
                            headers: {"content-type": "application/json"}
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            })
                            .then(result => {
                                thisState.report.isType = "invoice";
                                thisState.report.filter = thisState.report.filters[thisState.report.isType];
                                thisState.report.headers[thisState.report.currentHeader] = thisState.report.header;
                                thisState.report.header = thisState.report.headers[thisState.report.isType];
                                thisState.report.currentHeader = thisState.report.isType;
                                thisState.report.list = result.invoices;
                                thisState.report.totalRecords = result.totalRecords;
                                thisState.report.totalWeight = result.totalQuantity;
                                thisState.report.totalCharge = result.totalAmount;
                                thisState.report.invoiceSelect = false;
                                thisState.setMyState(thisState);
                            })
                            .catch(() => {
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
                    ref={thisState.report.getReport}
                >
                    Get Report
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        thisState.report.invoiceSelect = false;
                        thisState.setMyState(thisState);
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceSelect;
