import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSync} from "@fortawesome/free-solid-svg-icons";

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
                        value={thisState.settings.indicator.serialPort}
                        onChange={event => {
                            thisState.settings.indicator.serialPort = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableserialPorts.map(item => (
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
                        value={thisState.settings.indicator.baudRate}
                        onChange={event => {
                            thisState.settings.indicator.baudRate = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableBaudRate.map(item => (
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
                        value={thisState.settings.indicator.dataBits}
                        onChange={event => {
                            thisState.settings.indicator.dataBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableDataBits.map(item => (
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
                        value={thisState.settings.indicator.parity}
                        onChange={event => {
                            thisState.settings.indicator.parity = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableParity.map(item => (
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
                        value={thisState.settings.indicator.stopBits}
                        onChange={event => {
                            thisState.settings.indicator.stopBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableStopBits.map(item => (
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
                        value={thisState.settings.indicator.flowControl}
                        onChange={event => {
                            thisState.settings.indicator.flowControl = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableFlowControl.map(item => (
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
                        value={thisState.settings.indicator.delimiter}
                        onChange={event => {
                            thisState.settings.indicator.delimiter =
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
                        value={thisState.settings.indicator.lastCharacter}
                        onChange={event => {
                            thisState.settings.indicator.lastCharacter =
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
                        value={thisState.adminSettings.REFRESH_TIME_WEIGHT}
                        onChange={event => {
                            thisState.adminSettings.REFRESH_TIME_WEIGHT =
                                (event.target.value.match("[0-9]+") || []).pop() || "";
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Button
                variant="warning"
                size="lg"
                className="mr-1"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/serialPort/updateSerialPort", {
                        method: "POST",
                        body: JSON.stringify(thisState.settings.indicator),
                        headers: { "content-type": "application/json" }
                    }).then(response => {
                        if (response.status === 200) {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "Indicator Settings Refreshed",
                                message: "Indicator Settings Refreshed Successfully."
                            });
                            thisState.setMyState(thisState);
                        } else throw Error(response.statusText);
                    }).catch(() => {
                        thisState.alerts.push({
                            id: new Date().getTime(),
                            type: "danger",
                            headline: "Indicator Settings Refreshed",
                            message: "Indicator Settings Refreshed Failed."
                        });
                    });
                }}
            >
                <FontAwesomeIcon icon={faEdit} edclassName="mr-3" />
                update Indicator SerialPort Settings
            </Button>
            <Button
                variant="light"
                size="lg"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/serialPort/settingUpSerialPort?serialPort=indicator&setDataListener=true")
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
                <FontAwesomeIcon icon={faSync} spin className="mr-3" />
                Refresh Indicator SerialPort Settings
            </Button>

        </Form>
    );
};

export default IndicatorSettings;
