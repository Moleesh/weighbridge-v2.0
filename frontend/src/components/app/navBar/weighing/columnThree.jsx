import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

class ColumnThree extends Component {
  state = {};
  render() {
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
            <Form.Control />
          </Col>
          <Col sm="6">
            <Button variant="primary" block>
              Get Gross Details
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm="6">
            <Form.Control />
          </Col>
          <Col sm="6">
            <Button variant="primary" block>
              Get Tare Details
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm="6">
            <Form.Control />
          </Col>
          <Col sm="6">
            <Button variant="primary" block>
              Total
            </Button>
          </Col>
        </Form.Group>
      </Col>
    );
  }
}

export default ColumnThree;
