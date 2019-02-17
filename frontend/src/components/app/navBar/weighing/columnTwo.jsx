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
            disabled={thisState.customersNameDisabled}
            value={thisState.customersName}
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
            disabled={thisState.transporterNameDisabled}
            value={thisState.transporterName}
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
            disabled={thisState.grossWeightDisabled}
            value={thisState.rossWeight}
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
            disabled={thisState.tareWeightDisabled}
            value={thisState.tareWeight}
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
            disabled={thisState.nettWeightDisabled}
            value={thisState.nettWeight}
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
