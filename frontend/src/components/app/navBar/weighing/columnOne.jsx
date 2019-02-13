import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

class ColumnOne extends Component {
  state = {};
  render() {
    return (
      <Col column sm="4" className="mt-2">
        <Form.Group as={Row}>
          <Col sm="1" />
          <Form.Check
            type="radio"
            name="Gross-Tare-Selector"
            label="Gross"
            defaultChecked
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm="1" />
          <Form.Check
            type="radio"
            name="Gross-Tare-Selector"
            label="Gross"
            defaultChecked
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Sl No
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Date & Time
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Vehicle No
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Material
          </Form.Label>
          <Col sm="6">
            <Form.Control type="select" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Charges
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Remarks
          </Form.Label>
          <Col sm="6">
            <Form.Control />
          </Col>
        </Form.Group>
      </Col>
    );
  }
}

export default ColumnOne;
