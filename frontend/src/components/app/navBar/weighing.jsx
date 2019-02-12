import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import GrossTareSelector from "./weighing/grossTareSelector";
import ColumnOne from "./weighing/columnOne";

class Weighing extends Component {
  state = {};

  render() {
    return (
      <Form className="mt-3">
        <Row>
          <Col>
            <GrossTareSelector />
          </Col>
          <Col xs={8}>
            <Form.Group as={Row} controlId="slNo">
              <Form.Label column>asdsa</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <ColumnOne />
          </Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Form>
    );
  }
}

export default Weighing;
