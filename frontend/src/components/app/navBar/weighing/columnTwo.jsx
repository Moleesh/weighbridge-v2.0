import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const ColumnTwo = props => {
  let thisState = props.preState;
  return (
    <Col column sm="6">
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Customer's Name
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled={thisState.weighing.disable.customersNameDisabled}
            value={thisState.weight.customersName}
            onChange={event =>
              thisState.setMyState({ customersName: event.target.value })
            }
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
            value={thisState.weight.transporterName}
            onChange={event =>
              thisState.setMyState({ transporterName: event.target.value })
            }
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
            disabled={thisState.weighing.disable.grossWeightDisabled}
            value={thisState.weight.grossWeight}
            onChange={event =>
              thisState.setMyState({
                charges: (event.target.value.match("[0-9]+") || []).pop() || ""
              })
            }
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
            disabled={thisState.weighing.disable.tareWeightDisabled}
            value={thisState.weight.tareWeight}
            onChange={event =>
              thisState.setMyState({
                tareWeight:
                  (event.target.value.match("[0-9]+") || []).pop() || ""
              })
            }
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
            disabled={thisState.weighing.disable.nettWeightDisabled}
            value={thisState.weight.nettWeight}
            onChange={event =>
              thisState.setMyState({
                nettWeight:
                  (event.target.value.match("[0-9]+") || []).pop() || ""
              })
            }
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnTwo;
