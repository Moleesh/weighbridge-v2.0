import React, { Component } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";

import ColumnOne from "./weighing/columnOne";
import ColumnTwo from "./weighing/columnTwo";
import ColumnThree from "./weighing/columnThree";
import Bottom from "./weighing/bottom";

class Weighing extends Component {
  state = {};

  render() {
    return (
      <Form className="mt-4">
        <Row>
          <ColumnOne />
          <Col column sm="8">
            <Row className="justify-content-center pb-2 bold  ">
              <Card
                className="text-center w-75 display-2 "
                style={{
                  color: "red",
                  fontsize: "20px",
                  fontFamily: "sans-serif"
                }}
              >
                <Card.Header>00000000</Card.Header>
              </Card>
            </Row>
            <Row>
              <ColumnTwo />
              <ColumnThree />
            </Row>
          </Col>
        </Row>
        <Bottom />
      </Form>
    );
  }
}

export default Weighing;
