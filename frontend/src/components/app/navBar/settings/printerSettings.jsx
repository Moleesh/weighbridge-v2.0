import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const PrinterSettings = props => {
    // noinspection JSUnresolvedVariable
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
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.setting.value.printerName}
                        onChange={event => {
                            thisState.setting.value.printerName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availablePrinters.map(item => (
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
                <Col sm="9">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.setting.value.noOfCopies - 1 < 0) return;
                                thisState.setting.value.noOfCopies =
                                    thisState.setting.value.noOfCopies - 1;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.setting.value.noOfCopies}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.setting.value.noOfCopies + 1 > 100) return;
                                thisState.setting.value.noOfCopies =
                                    thisState.setting.value.noOfCopies - 1 + 2;
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
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.setting.value.printFormat}
                        onChange={event => {
                            thisState.setting.value.printFormat = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availablePrintFormat.map(item => (
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
