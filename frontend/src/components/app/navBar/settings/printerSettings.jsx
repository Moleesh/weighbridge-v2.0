import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const PrinterSettings = props => {
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">Printer Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Printer Name
                </Form.Label>
                <Col sm="4">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.printerNameForWeighing}
                        onChange={event => {
                            thisState.settings.value.printerNameForWeighing = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availablePrinters.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col sm="4">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.printerNameForInvoice}
                        onChange={event => {
                            thisState.settings.value.printerNameForInvoice = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availablePrinters.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    No Of Copies
                </Form.Label>
                <Col sm="4">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.settings.value.noOfCopiesForWeighing - 1 < 0) return;
                                thisState.settings.value.noOfCopiesForWeighing =
                                    thisState.settings.value.noOfCopiesForWeighing - 1;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.settings.value.noOfCopiesForWeighing}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.settings.value.noOfCopiesForWeighing + 1 > 100) return;
                                thisState.settings.value.noOfCopiesForWeighing =
                                    thisState.settings.value.noOfCopiesForWeighing - 1 + 2;
                                thisState.setMyState(thisState);
                            }}
                        >
                            +
                        </button>
                    </div>
                </Col>
                <Col sm="4">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.settings.value.noOfCopiesForInvoice - 1 < 0) return;
                                thisState.settings.value.noOfCopiesForInvoice =
                                    thisState.settings.value.noOfCopiesForInvoice - 1;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.settings.value.noOfCopiesForInvoice}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.settings.value.noOfCopiesForInvoice + 1 > 100) return;
                                thisState.settings.value.noOfCopiesForInvoice =
                                    thisState.settings.value.noOfCopiesForInvoice - 1 + 2;
                                thisState.setMyState(thisState);
                            }}
                        >
                            +
                        </button>
                    </div>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Print Format
                </Form.Label>
                <Col sm="4">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.printFormatForWeighing}
                        onChange={event => {
                            thisState.settings.value.printFormatForWeighing = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableWeightPrintFormats.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col sm="4">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.printFormatForInvoice}
                        onChange={event => {
                            thisState.settings.value.printFormatForInvoice = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableInvoicetPrintFormats.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default PrinterSettings;
