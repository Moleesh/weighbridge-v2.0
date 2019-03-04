import React from "react";
import logo from "../../logo.svg";
import { Row, Col, Card } from "react-bootstrap";

const Header = props => {
  let thisState = props.preState;
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
          <Col sm="1">
            <img
              src={logo}
              alt=""
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Col>
          <Col sm="10">
            <Row className="justify-content-center font-weight-bold  h3">
              {thisState.weighing.headingLineOne}
            </Row>
            <Row className="justify-content-center font-italic h5">
              {thisState.weighing.headingLineTwo}
            </Row>
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );
};

export default Header;
