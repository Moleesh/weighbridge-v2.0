import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const ColumnTwo = props => {
  let thisState = props.preState;
  return (
    <Col column sm="6">
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Customer's Name
        </Form.Label>
        <Col sm="6">
          <Form.Control />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Transporter Name
        </Form.Label>
        <Col sm="6">
          <Form.Control />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Gross Weight
        </Form.Label>
        <Col sm="6">
          <Form.Control disabled />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Tare Weight
        </Form.Label>
        <Col sm="6">
          <Form.Control disabled />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Nett Weight
        </Form.Label>
        <Col sm="6">
          <Form.Control disabled />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnTwo;
