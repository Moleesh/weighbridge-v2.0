import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const DisplaySettings = props => {
    // noinspection JSUnresolvedVariable
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
                        value={thisState.setting.value.displayCOMPort}
                        onChange={event => {
                            thisState.setting.value.displayCOMPort = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableCOMPorts.map((item) => (
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
                        value={thisState.setting.value.displayBaudRate}
                        onChange={event => {
                            thisState.setting.value.displayBaudRate = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableBaudRate.map((item) => (
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
                        value={thisState.setting.value.displayDataBits}
                        onChange={event => {
                            thisState.setting.value.displayDataBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableDataBits.map((item) => (
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
                        value={thisState.setting.value.displayParity}
                        onChange={event => {
                            thisState.setting.value.displayParity = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableParity.map((item) => (
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
                        value={thisState.setting.value.displayStopBits}
                        onChange={event => {
                            thisState.setting.value.displayStopBits = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableStopBits.map((item) => (
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
                        value={thisState.setting.value.displayFlowControl}
                        onChange={event => {
                            thisState.setting.value.displayFlowControl = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    >
                        {thisState.setting.array.availableFlowControl.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Button
                variant="light"
                size="lg"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/settingUpDisplay")
                        .then(response => {
                            if (response.status === 200) {
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "success",
                                    headline: "Display Settings Refreshed",
                                    message: "Display Settings Refreshed Successfully."
                                });
                                thisState.setMyState(thisState);
                            } else throw Error(response.statusText);
                        })
                        .catch(() => {
                        });
                }}
            >
                <FontAwesomeIcon icon={faSync} spin className="mr-3" />
                Refresh Display CommPort Settings
            </Button>
        </Form>
    );
};

export default DisplaySettings;
