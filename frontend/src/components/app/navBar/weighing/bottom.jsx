import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Bottom = props => {
  let thisState = props.preState;
  return (
    <Row>
      <Col column sm="2">
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={event => {
            console.log("here", thisState);

            let disable = thisState.weighing.disable;
            let weight = thisState.weight;
            console.log(disable, weight);
            thisState.setMyState({
              weighing: { disable: disable },
              weight: weight
            });
            console.log("here", thisState);
          }}
        >
          Get Weight
        </Button>
      </Col>
      <Col column sm="2">
        <Button className="adam-button" variant="primary" block>
          Save
        </Button>
        <Button className="adam-button" variant="primary" block>
          Re Print
        </Button>
      </Col>
      <Col column sm="2">
        <Button className="adam-button" variant="primary" block>
          Print
        </Button>
        <Button className="adam-button" variant="primary" block>
          Clear
        </Button>
      </Col>
      <Col column sm="6" />
    </Row>
  );
};

export default Bottom;
