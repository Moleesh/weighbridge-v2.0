import React from "react";
import { Form, Col, Button, Table, Row } from "react-bootstrap";

const Settings = props => {
  let thisState = props.preState;
  return (
    <Form className="justify-content-center ">
      <Row className="pb-5">
        <Col>
          <h4 className="text-center font-weight-bold">General Settings</h4>
        </Col>
      </Row>
      <Form.Group as={Row} block>
        <Form.Label column sm="3">
          Weighbridge Name
        </Form.Label>
        <Col sm="9">
          <Form.Control />
        </Col>
      </Form.Group>
      <Form.Group as={Row} block>
        <Form.Label column sm="3">
          Weighbridge Address
        </Form.Label>
        <Col sm="9">
          <Form.Control />
        </Col>
      </Form.Group>
      <Form.Group as={Row} block>
        <Form.Label column sm="3">
          Footer
        </Form.Label>
        <Col sm="9">
          <Form.Control />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Settings;
