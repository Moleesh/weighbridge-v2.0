import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Bottom = props => {
  let thisState = props.preState;
  return (
    <Row>
      <Col column sm="2">
        <Button className='adam-button' variant="primary" block>
          Get Weight
        </Button>
      </Col>
      <Col column sm="2">
        <Button className='adam-button' variant="primary" block>
          Save
        </Button>
        <Button className='adam-button' variant="primary" block>
          Re Print
        </Button>
      </Col>
      <Col column sm="2">
        <Button className='adam-button' variant="primary" block>
          Print
        </Button>
        <Button className='adam-button' variant="primary" block>
          Clear
        </Button>
      </Col>
      <Col column sm="6">
        {}
      </Col>
    </Row>
  );
};

export default Bottom;
