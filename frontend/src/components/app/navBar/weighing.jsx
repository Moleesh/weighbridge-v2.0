import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
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
          <Col xs={4}>
            <Form.Group as={Row} controlId="slNo">
              <InputGroup className="mb-2">
              <FormControl aria-label="Amount (to the nearest dollar)" />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            </Form.Group>
          </Col>
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
