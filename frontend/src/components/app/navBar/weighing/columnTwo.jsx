import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const ColumnTwo = props => {
  let thisState = props.preState;
  return (
    <Col sm="6">
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Customer's Name
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled={thisState.weighing.disable.customersNameDisabled}
            ref={thisState.weighing.reference.customersNameReference}
            value={thisState.weight.customersName}
            onChange={event => {
              thisState.weight.customersName = event.target.value;
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey)
                thisState.weighing.reference.materialReference.reference.current.focus();
              else if ((event.keyCode === 13) | (event.keyCode === 9)) {
                thisState.weight.customersName = thisState.weight.customersName
                  .toLowerCase()
                  .split(" ")
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ");
                thisState.setMyState(thisState);
                thisState.weighing.reference.transporterNameReference.current.focus();
              }
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Transporter Name
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled={thisState.weighing.disable.transporterNameDisabled}
            ref={thisState.weighing.reference.transporterNameReference}
            value={thisState.weight.transporterName}
            onChange={event => {
              thisState.weight.transporterName = event.target.value;
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey)
                thisState.weighing.reference.customersNameReference.current.focus();
              else if ((event.keyCode === 13) | (event.keyCode === 9)) {
                thisState.weight.transporterName = thisState.weight.transporterName
                  .toLowerCase()
                  .split(" ")
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ");
                thisState.setMyState(thisState);
                thisState.weighing.reference.chargesReference.current.focus();
              }
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Gross Weight
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-right"
            disabled
            value={
              thisState.weight.grossWeight === 0
                ? ""
                : thisState.weight.grossWeight
            }
            onChange={event => {
              thisState.weight.grossWeight = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Tare Weight
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-right"
            disabled
            value={
              thisState.weight.tareWeight === 0
                ? ""
                : thisState.weight.tareWeight
            }
            onChange={event => {
              thisState.weight.tareWeight = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Nett Weight
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-right"
            disabled
            value={
              thisState.weight.nettWeight === 0
                ? ""
                : thisState.weight.nettWeight
            }
            onChange={event => {
              thisState.weight.nettWeight = event.target.value;
              thisState.setMyState(thisState);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnTwo;
