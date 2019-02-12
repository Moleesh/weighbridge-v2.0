import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import GrossTareSelector from "./weighing/grossTareSelector";

class Weighing extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
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
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>With textarea</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>With textarea</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Weighing;
