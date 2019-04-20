import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const DisplaySettings = props => {
  let thisState = props.preState;
  return (
    <Form className="justify-content-center ">
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
            {thisState.setting.Array.availableCOMPorts.map((item, index) => (
              <option value={item}>{item}</option>
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
            {thisState.setting.Array.availableBaudRate.map((item, index) => (
              <option value={item}>{item}</option>
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
            {thisState.setting.Array.availableDataBits.map((item, index) => (
              <option value={item}>{item}</option>
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
            {thisState.setting.Array.avaiableParity.map((item, index) => (
              <option value={item}>{item}</option>
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
            {thisState.setting.Array.avaiableStopBits.map((item, index) => (
              <option value={item}>{item}</option>
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
            {thisState.setting.Array.availableFlowControl.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default DisplaySettings;
