import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const ColumnThree = props => {
  let thisState = props.preState;
  return (
    <Col sm="6" className="pt-4 mt-2">
      <Form.Group as={Row} className="pt-3">
        <Form.Label column sm="6">
          Customer's Id
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            // disabled={thisState.weighing.disable.customersNameDisabled}
            // ref={thisState.weighing.reference.customersNameReference}
            // value={thisState.weight.customersName}
            // onChange={event => {
            //   thisState.weight.customersName = event.target.value;
            //   thisState.setMyState(thisState);
            // }}
            // onKeyDown={event => {
            //   if (event.keyCode === 9 && event.shiftKey)
            //     thisState.weighing.reference.materialReference.reference.current.focus();
            //   else if ((event.keyCode === 13) | (event.keyCode === 9)) {
            //     thisState.weight.customersName = thisState.weight.customersName
            //       .toLowerCase()
            //       .split(" ")
            //       .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            //       .join(" ");
            //     thisState.setMyState(thisState);
            //     thisState.weighing.reference.transporterNameReference.current.focus();
            //   }
            // }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Material Id
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            // disabled={thisState.weighing.disable.transporterNameDisabled}
            // ref={thisState.weighing.reference.transporterNameReference}
            // value={thisState.weight.transporterName}
            // onChange={event => {
            //   thisState.weight.transporterName = event.target.value;
            //   thisState.setMyState(thisState);
            // }}
            // onKeyDown={event => {
            //   if (event.keyCode === 9 && event.shiftKey)
            //     thisState.weighing.reference.customersNameReference.current.focus();
            //   else if ((event.keyCode === 13) | (event.keyCode === 9)) {
            //     thisState.weight.transporterName = thisState.weight.transporterName
            //       .toLowerCase()
            //       .split(" ")
            //       .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            //       .join(" ");
            //     thisState.setMyState(thisState);
            //     thisState.weighing.reference.chargesReference.current.focus();
            //   }
            // }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled
            value={
              thisState.weight.grossTime !== null
                ? thisState.weight.grossTime
                : ""
            }
            onChange={event => {
              thisState.weight.grossTime = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
        <Col sm="6">
          <Button className="adam-button" variant="primary" block disabled>
            Get Gross Details
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled
            value={
              thisState.weight.tareTime !== null
                ? thisState.weight.tareTime
                : ""
            }
            onChange={event => {
              thisState.weight.tareTime = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
        <Col sm="6">
          <Button className="adam-button" variant="primary" block disabled>
            Get Tare Details
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled
            value={
              thisState.weight.nettTime !== null
                ? thisState.weight.nettTime
                : ""
            }
            onChange={event => {
              thisState.weight.nettTime = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
        <Col sm="6">
          <Button className="adam-button" variant="primary" block disabled>
            Total
          </Button>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnThree;
