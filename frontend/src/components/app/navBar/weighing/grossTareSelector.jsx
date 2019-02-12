import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class GrossTareSelector extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Form.Group as={Row} controlId="gross">
          <Col sm="2" />
          <Form.Check
            type="radio"
            name="Gross-Tare-Selector"
            label="Gross"
            defaultChecked
          />
        </Form.Group>
        <Form.Group as={Row} controlId="gross">
          <Col sm="2" />
          <Form.Check
            type="radio"
            name="Gross-Tare-Selector"
            label="Gross"
            defaultChecked
          />
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default GrossTareSelector;
