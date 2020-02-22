import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";

const IndicatorSettings = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">Indicator Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Com Port
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.indicatorCOMPort}
                        onChange={event => {
                            thisState.settings.value.indicatorCOMPort = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableCOMPorts.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Baud Rate
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.indicatorBaudRate}
                        onChange={event => {
                            thisState.settings.value.indicatorBaudRate = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableBaudRate.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Data Bits
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.indicatorDataBits}
                        onChange={event => {
                            thisState.settings.value.indicatorDataBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableDataBits.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Parity
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.indicatorParity}
                        onChange={event => {
                            thisState.settings.value.indicatorParity = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableParity.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Stop Bits
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.indicatorStopBits}
                        onChange={event => {
                            thisState.settings.value.indicatorStopBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableStopBits.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Flow Control
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.indicatorFlowControl}
                        onChange={event => {
                            thisState.settings.value.indicatorFlowControl = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableFlowControl.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Delimiter
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        className="text-left"
                        value={thisState.settings.value.indicatorDelimiter}
                        onChange={event => {
                            thisState.settings.value.indicatorDelimiter =
                                (event.target.value.match("[0-9]+") || []).pop() || "";
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Indicator Last Character
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        className="text-left"
                        value={thisState.settings.value.indicatorLastCharacter}
                        onChange={event => {
                            thisState.settings.value.indicatorLastCharacter =
                                event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Refresh weight Time in sec
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        className="text-left"
                        value={thisState.settings.value.REFRESH_TIME_WEIGHT}
                        onChange={event => {
                            thisState.settings.value.REFRESH_TIME_WEIGHT =
                                (event.target.value.match("[0-9]+") || []).pop() || "";
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Button
                variant="light"
                size="lg"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/settingUpIndicator")
                        .then(response => {
                            if (response.status === 200) {
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "success",
                                    headline: "Indicator Settings Refreshed",
                                    message: "Indicator Settings Refreshed Successfully."
                                });
                                thisState.setMyState(thisState);
                            } else throw Error(response.statusText);
                        })
                        .catch(() => {
                        });
                }}
            >
                <FontAwesomeIcon icon={faSync} spin className="mr-3"/>
                Refresh Indicator SerialPort Settings
            </Button>
        </Form>
    );
};

export default IndicatorSettings;
