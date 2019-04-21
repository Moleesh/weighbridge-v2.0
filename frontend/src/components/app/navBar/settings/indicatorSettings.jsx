import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const IndicatorSettings = props => {
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
            value={thisState.setting.value.indicatorCOMPort}
            onChange={event => {
              thisState.setting.value.indicatorCOMPort = event.target.value;
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
          Indicator Baud Rate
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={thisState.setting.value.indicatorBaudRate}
            onChange={event => {
              thisState.setting.value.indicatorBaudRate = event.target.value;
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
          Indicator Data Bits
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={thisState.setting.value.indicatorDataBits}
            onChange={event => {
              thisState.setting.value.indicatorDataBits = event.target.value;
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
          Indicator Parity
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={thisState.setting.value.indicatorParity}
            onChange={event => {
              thisState.setting.value.indicatorParity = event.target.value;
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
          Indicator Stop Bits
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={thisState.setting.value.indicatorStopBits}
            onChange={event => {
              thisState.setting.value.indicatorStopBits = event.target.value;
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
          Indicator Flow Control
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={thisState.setting.value.indicatorFlowControl}
            onChange={event => {
              thisState.setting.value.indicatorFlowControl = event.target.value;
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

export default IndicatorSettings;
