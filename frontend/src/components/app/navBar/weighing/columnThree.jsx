import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const ColumnThree = props => {
  let thisState = props.preState;
  return (
    <Col column sm="6">
      <Form.Group className="py-2">
        <Form.Control plaintext readOnly disabled />
        <Form.Control plaintext readOnly disabled />
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled={thisState.grossTimeDisabled}
            value={thisState.grossTime}
            onChange={event =>
              thisState.setMyState({ grossTime: event.target.value })
            }
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
            disabled={thisState.tareTimeDisabled}
            value={thisState.tareTime}
            onChange={event =>
              thisState.setMyState({ tareTime: event.target.value })
            }
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
            disabled={thisState.nettTImeDisabled}
            value={thisState.nettTIme}
            onChange={event =>
              thisState.setMyState({ nettTIme: event.target.value })
            }
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
