import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const ColumnThree = props => {
  let thisState = props.preState;
  return (
    <Col column sm="6">
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Transporter's Name
        </Form.Label>
        <Col sm="6">
          <Form.Control />
        </Col>
      </Form.Group>
      <Form.Group size="lg">
        <Form.Control plaintext readOnly disabled />
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control disabled />
        </Col>
        <Col sm="6">
          <Button variant="primary" block disabled>
            Get Gross Details
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control disabled />
        </Col>
        <Col sm="6">
          <Button variant="primary" block disabled>
            Get Tare Details
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control disabled />
        </Col>
        <Col sm="6">
          <Button variant="primary" block disabled>
            Total
          </Button>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnThree;
