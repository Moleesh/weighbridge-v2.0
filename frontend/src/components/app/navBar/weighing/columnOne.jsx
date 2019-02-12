import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ColumnOne extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Form.Group as={Row} controlId="slNo">
          <Form.Label column sm="6">
            Sl No
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Sl No" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="custmerName">
          <Form.Label column sm="6">
            Custmer's Name
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Custmer's Name" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="dateAndTime">
          <Form.Label column sm="6">
            Date & Time
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Date & Time" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="vehicleNo">
          <Form.Label column sm="6">
            Vehicle No
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Vehicle No" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="material">
          <Form.Label column sm="6">
            Material
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Material" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="charges">
          <Form.Label column sm="6">
            Charges
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Charges" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="remarks">
          <Form.Label column sm="6">
            Remarks
          </Form.Label>
          <Col sm="6">
            <Form.Control placeholder="Remarks" />
          </Col>
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default ColumnOne;
