import React from "react";
import { Row, Col, Form, Card, Image } from "react-bootstrap";

import ColumnOne from "./weighing/columnOne";
import ColumnTwo from "./weighing/columnTwo";
import ColumnThree from "./weighing/columnThree";
import Bottom from "./weighing/bottom";

const Weighing = props => {
  let thisState = props.preState;
  return (
    <Form
      className="py-2"
      onKeyDown={event => {
        if (event.keyCode === 9) {
          event.preventDefault();
        }
      }}
    >
      <Row>
        <Col sm="2" className="mt-5">
          <Form.Group as={Row}>
            <Col sm="1" />
            <Form.Check
              type="radio"
              name="Gross-Tare-Selector"
              label="Gross"
              checked={thisState.weighing.grossSelector}
              onClick={event => {
                thisState.weighing.grossSelector = true;
                thisState.weighing.tareSelector = false;
                thisState.weight.material = "";
                thisState.weighing.disable.materialDisabled = false;
                thisState.weighing.reference.materialReference.value = [
                  { material: "" }
                ];
                thisState.setMyState(thisState);
              }}
              onChange={event => {}}
              disabled={thisState.weighing.disable.grossSelectorDisabled}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-0">
            <Col sm="1" />
            <Form.Check
              type="radio"
              name="Gross-Tare-Selector"
              label="Tare"
              checked={thisState.weighing.tareSelector}
              onClick={event => {
                thisState.weighing.tareSelector = true;
                thisState.weighing.grossSelector = false;
                thisState.weight.material = "Empty";
                thisState.weighing.reference.materialReference.value = [
                  { material: "Empty" }
                ];
                thisState.weighing.disable.materialDisabled = true;
                thisState.setMyState(thisState);
              }}
              onChange={event => {}}
              disabled={thisState.weighing.disable.tareSelectorDisabled}
            />
          </Form.Group>
        </Col>

        <Col sm="5">
          <Row className="justify-content-center bold mt-3">
            <Card
              className="text-center w-100 display-2 "
              style={{
                color: "red",
                fontsize: "20px",
                fontFamily: "sans-serif"
              }}
            >
              <Card.Header>{thisState.weighing.weight}</Card.Header>
            </Card>
          </Row>
        </Col>
        <Col sm="5">
          {thisState.weighing.cameraImage ? (
            <Image
              src={thisState.weighing.cameraImage}
              style={{ height: 200 }}
              className="rounded mx-auto d-block"
              alt="No Camera Available"
              fluid
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <ColumnOne preState={thisState} />
        <ColumnTwo preState={thisState} />
        <ColumnThree preState={thisState} />
      </Row>
      <Row>
        <Col sm="6">
          <Bottom preState={thisState} />
        </Col>
        <Col sm="6" />
      </Row>
    </Form>
  );
};

export default Weighing;
