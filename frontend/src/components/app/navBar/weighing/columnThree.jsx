import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const ColumnThree = props => {
  let thisState = props.preState;
  return (
    <Col sm="6">
      <Form.Group className="py-2">
        <Form.Control plaintext readOnly disabled />
        <Form.Control plaintext readOnly disabled />
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled
            value={
              thisState.weight.grossTime !== null
                ? thisState.weight.grossTime
                : ""
            }
            onChange={event => {
              thisState.weight.grossTime = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
        <Col sm="6">
          <Button className="adam-button" variant="primary" block disabled>
            Get Gross Details
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled
            value={
              thisState.weight.tareTime !== null
                ? thisState.weight.tareTime
                : ""
            }
            onChange={event => {
              thisState.weight.tareTime = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
        <Col sm="6">
          <Button className="adam-button" variant="primary" block disabled>
            Get Tare Details
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled
            value={
              thisState.weight.nettTIme !== null
                ? thisState.weight.nettTIme
                : ""
            }
            onChange={event => {
              thisState.weight.nettTIme = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
        <Col sm="6">
          <Button className="adam-button" variant="primary" block disabled>
            Total
          </Button>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnThree;
