import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const GenearalSettings = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">General Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Weighbridge Name
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        className="text-left"
                        value={thisState.setting.value.weighbridgeName}
                        onChange={event => {
                            thisState.setting.value.weighbridgeName = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Weighbridge Address
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        className="text-left"
                        value={thisState.setting.value.weighbridgeAddress}
                        onChange={event => {
                            thisState.setting.value.weighbridgeAddress = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Footer
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        className="text-left"
                        value={thisState.setting.value.footer}
                        onChange={event => {
                            thisState.setting.value.footer = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export default GenearalSettings;
