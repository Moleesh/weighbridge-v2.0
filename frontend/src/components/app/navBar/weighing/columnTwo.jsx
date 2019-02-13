import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

class ColumnTwo extends Component {
  state = {};
  render() {
    return (
      <Col column sm="6">
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Custmer's Name
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Dc. No
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Gross Wt
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Tare Wt
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Net Wt
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
      </Col>
    );
  }
}

export default ColumnTwo;
