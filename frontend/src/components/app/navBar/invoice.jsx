import React from "react";
import {Card, Col, Form, Row} from "react-bootstrap";

import ColumnOne from "./invoice/columnOne";
import ColumnTwo from "./invoice/columnTwo";
import ColumnThree from "./invoice/columnThree";
import Bottom from "./invoice/bottom";

const Invoice = props => {
    let thisState = props.preState;
    return (
        <Form
            className="py-2"
            onKeyDown={event => {
                if (event.keyCode === 9) {
                    event.preventDefault();
                }
            }}
        >
            <Row style={{height: 200}}>
                <Col sm="2" className="mt-5">
                    <Form.Group as={Row}>
                        <Col sm="1"/>
                        <Form.Check
                            type="radio"
                            name="GST-Selector"
                            label="CGST/SGST"
                            checked={!thisState.invoices.igstSelector}
                            onClick={() => {
                                thisState.invoices.igstSelector = false;
                                thisState.invoices.reference.referenceSlipNoReference.current.focus();
                                thisState.setMyState(thisState);
                            }}
                            onChange={() => {
                            }}
                            disabled={thisState.invoices.disable.igstSelector}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0">
                        <Col sm="1"/>
                        <Form.Check
                            type="radio"
                            name="GST-Selector"
                            label="IGST"
                            checked={thisState.invoices.igstSelector}
                            onClick={() => {
                                thisState.invoices.igstSelector = true;
                                thisState.invoices.reference.referenceSlipNoReference.current.focus();
                                thisState.setMyState(thisState);
                            }}
                            onChange={() => {
                            }}
                            disabled={thisState.invoices.disable.igstSelector}
                        />
                    </Form.Group>
                </Col>
                <Col sm="5">
                    <Row className="justify-content-center bold mt-3">
                        <Card
                            className="text-center w-100 display-2 "
                            style={{
                                color: "red",
                                fontFamily: "sans-serif"
                            }}
                        >
                            <Card.Header>{thisState.invoice.total === "" ? 0 : thisState.invoice.total}</Card.Header>
                        </Card>
                    </Row>
                </Col>
            </Row>
            <Row>
                <ColumnOne preState={thisState}/>
                <ColumnTwo preState={thisState}/>
                <ColumnThree preState={thisState}/>
            </Row>
            <Row>
                <Col sm="6">
                    <Bottom preState={thisState}/>
                </Col>
                <Col sm="6"/>
            </Row>
        </Form>
    );
};

export default Invoice;
