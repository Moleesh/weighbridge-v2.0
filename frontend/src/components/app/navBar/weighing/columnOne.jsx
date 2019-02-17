import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Clock from "react-live-clock";

const ColumnOne = props => {
  let thisState = props.preState;
  return (
    <Col column sm="4" className="mt-3">
      <Form.Group as={Row}>
        <Col sm="1" />
        <Form.Check
          type="radio"
          name="Gross-Tare-Selector"
          label="Gross"
          defaultChecked
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="1" />
        <Form.Check type="radio" name="Gross-Tare-Selector" label="Tare" />
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Sl No
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            value={thisState.slNo}
            disabled
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Date & Time
        </Form.Label>
        <Col sm="6">
          <center>
            <Clock format={"MM-DD-YYYY HH:mm:ss"} ticking={true} />
          </center>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Vehicle No
        </Form.Label>
        <Col sm="6">
          <Form.Control className="text-center" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Material
        </Form.Label>
        <Col sm="6">
          <Form.Control type="select" className="text-center" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Charges
        </Form.Label>
        <Col sm="6">
          <Form.Control className="text-center" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Remarks
        </Form.Label>
        <Col sm="6">
          <Form.Control className="text-center" />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnOne;
