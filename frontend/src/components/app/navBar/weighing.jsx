import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import GrossTareSelector from "./weighing/grossTareSelector";
import ColumnOne from "./weighing/columnOne";

class Weighing extends Component {
  state = {};

  render() {
    return (
      <Form>
        <Row>
          <Col>
            <GrossTareSelector />
          </Col>
          <Col xs={6}>
            <Jumbotron />
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
