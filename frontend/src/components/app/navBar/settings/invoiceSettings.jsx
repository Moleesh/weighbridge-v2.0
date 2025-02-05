import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const InvoiceSettings = props => {
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">Invoice Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Invoice Header
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.invoiceHeader}
                        onChange={event => {
                            thisState.settings.value.invoiceHeader = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Invoice Identifier
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.invoiceIdentifier}
                        onChange={event => {
                            thisState.settings.value.invoiceIdentifier = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    GSTIN
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.gstin}
                        onChange={event => {
                            thisState.settings.value.gstin = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Additional Details
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        as="textarea"
                        wrap="soft"
                        rows="5"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.additionalInformation}
                        onChange={event => {
                            thisState.settings.value.additionalInformation = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Invoice Footer
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={thisState.settings.value.invoiceFooter}
                        onChange={event => {
                            thisState.settings.value.invoiceFooter = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    CGST %
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={
                            thisState.settings.value.cgst === ""
                                ? 0
                                : thisState.settings.value.cgst
                        }
                        onChange={event => {
                            thisState.settings.value.cgst = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.settings.value.cgst = thisState.settings.value.cgst.split(".").slice(0, 2).join(".");
                            if (!thisState.invoices.disableCalculation) {
                                thisState.invoice._cgst = thisState.settings.value.cgst;
                            }
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    SGST %
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={
                            thisState.settings.value.sgst === ""
                                ? 0
                                : thisState.settings.value.sgst
                        }
                        onChange={event => {
                            thisState.settings.value.sgst = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.settings.value.sgst = thisState.settings.value.sgst.split(".").slice(0, 2).join(".");
                            if (!thisState.invoices.disableCalculation) {
                                thisState.invoice._sgst = thisState.settings.value.sgst;
                            }
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    IGST %
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="none"
                        className="text-left"
                        value={
                            thisState.settings.value.igst === ""
                                ? 0
                                : thisState.settings.value.igst
                        }
                        onChange={event => {
                            thisState.settings.value.igst = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.settings.value.igst = thisState.settings.value.igst.split(".").slice(0, 2).join(".");
                            if (!thisState.invoices.disableCalculation) {
                                thisState.invoice._igst = thisState.settings.value.igst;
                            }
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export default InvoiceSettings;
