import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSync} from "@fortawesome/free-solid-svg-icons";

const DisplaySettings = props => {
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">Display Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Display Com Port
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.displayCOMPort}
                        onChange={event => {
                            thisState.settings.value.displayCOMPort = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableSerialPorts.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Display Baud Rate
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.displayBaudRate}
                        onChange={event => {
                            thisState.settings.value.displayBaudRate = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableBaudRate.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Display Data Bits
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.displayDataBits}
                        onChange={event => {
                            thisState.settings.value.displayDataBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableDataBits.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Display Parity
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.displayParity}
                        onChange={event => {
                            thisState.settings.value.displayParity = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableParity.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Display Stop Bits
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.displayStopBits}
                        onChange={event => {
                            thisState.settings.value.displayStopBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableStopBits.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Display Flow Control
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.value.displayFlowControl}
                        onChange={event => {
                            thisState.settings.value.displayFlowControl = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.settings.array.availableFlowControl.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
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
                        headers: {"content-type": "application/json"}
                    }).then(response => {
                        if (response.status === 200) {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "Display Settings Update",
                                message: "Display Settings Successfully Updated."
                            });
                            thisState.setMyState(thisState);
                        } else throw Error(response.statusText);
                    }).catch(() => {
                        thisState.alerts.push({
                            id: new Date().getTime(),
                            type: "danger",
                            headline: "Display Settings Update",
                            message: "Display Settings Update Failed."
                        });
                    });
                }}
                disabled={thisState.SETTING_DISABLED}
            >
                <FontAwesomeIcon icon={faEdit} className="mr-3"/>
                update Display SerialPort Settings
            </Button>
            <Button
                variant="light"
                size="lg"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/serialPort/settingUpSerialPort?serialPort=display&setDataListener=false").then(response => {
                        if (response.status === 200) {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "Display Settings Refreshed",
                                message: "Display Settings Successfully Refreshed."
                            });
                            thisState.setMyState(thisState);
                        } else throw Error(response.statusText);
                    });
                }}
                disabled={thisState.SETTING_DISABLED}
            >
                <FontAwesomeIcon icon={faSync} spin className="mr-3"/>
                Refresh Display SerialPort Settings
            </Button>
        </Form>
    );
};

export default DisplaySettings;
