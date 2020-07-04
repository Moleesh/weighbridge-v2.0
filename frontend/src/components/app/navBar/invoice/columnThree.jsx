import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ColumnThree = props => {
    let thisState = props.preState;
    return (
        <Col sm="4" className="mt-2">
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Invoice Date & Time
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.invoice.invoiceTime === 0
                                ? ""
                                : thisState.invoice.invoiceTime
                        }
                        onChange={event => {
                            thisState.invoice.invoiceTime = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Amount
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.invoice.amount === ""
                                ? 0
                                : thisState.invoice.amount
                        }
                        onChange={event => {
                            thisState.invoice.amount = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    CGST {thisState.invoice._cgst} %
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.invoice.cgst === ""
                                ? 0
                                : thisState.invoice.cgst
                        }
                        onChange={event => {
                            thisState.invoice.cgst = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    SGST {thisState.invoice._sgst} %
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.invoice.sgst === ""
                                ? 0
                                : thisState.invoice.sgst
                        }
                        onChange={event => {
                            thisState.invoice.sgst = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Total
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled
                        value={
                            thisState.invoice.total === ""
                                ? 0
                                : thisState.invoice.total
                        }
                        onChange={event => {
                            thisState.invoice.total = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnThree;
