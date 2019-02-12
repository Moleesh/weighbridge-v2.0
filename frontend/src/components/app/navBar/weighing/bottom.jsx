import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Bottom extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col column sm="2">
          <Button variant="primary" block>
            Get Weight
          </Button>
        </Col>
        <Col column sm="2">
          <Button variant="primary" block>
            Save
          </Button>
          <Button variant="primary" block>
            Re Print
          </Button>
        </Col>
        <Col column sm="2">
          <Button variant="primary" block>
            Print
          </Button>
          <Button variant="primary" block>
            Clear
          </Button>
        </Col>
        <Col column sm="6">
          {}
        </Col>
      </Row>
    );
  }
}

export default Bottom;
