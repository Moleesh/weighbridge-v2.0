import React from "react";
import { Row, Col, Form, Card } from "react-bootstrap";

import ColumnOne from "./weighing/columnOne";
import ColumnTwo from "./weighing/columnTwo";
import ColumnThree from "./weighing/columnThree";
import Bottom from "./weighing/bottom";

const Weighing = props => {
  let thisState = props.preState;
  return (
    <Form>
      <Row>
        <ColumnOne preState={thisState} />
        <Col sm="8">
          <Row className="justify-content-center py-2 bold">
            <Card
              className="text-center w-75 display-2 "
              style={{
                color: "red",
                fontsize: "20px",
                fontFamily: "sans-serif"
              }}
            >
              <Card.Header
                onClick={event => console.log(event.target.children)}
              >
                {thisState.weighing.weight}
              </Card.Header>
            </Card>
          </Row>
          <Row>
            <ColumnTwo preState={thisState} />
            <ColumnThree preState={thisState} />
          </Row>
        </Col>
      </Row>
      <Bottom preState={thisState} />
    </Form>
  );
};

export default Weighing;
