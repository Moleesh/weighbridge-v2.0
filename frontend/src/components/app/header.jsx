import React, { Component } from "react";
import logo from "../../logo.svg";
import { Row, Col, Card } from "react-bootstrap";

class Header extends Component {
  state = {};
  render() {
    return (
      <Card
        className="text-center w-100"
        style={{
          backgroundColor: "black",
          color: "white"
        }}
      >
        <Card.Header>
          <Row>
            <Col column sm="1">
              <img
                src={logo}
                alt=""
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Col>
            <Col column sm="10">
              <Row className="justify-content-center font-weight-bold  h3">
                Babulens Enterprises
              </Row>
              <Row className="justify-content-center font-italic h5">
                Address
              </Row>
            </Col>
          </Row>
        </Card.Header>
      </Card>
    );
  }
}
export default Header;
