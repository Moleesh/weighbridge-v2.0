import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const AdminSettings = props => {
  let thisState = props.preState;
  return (
    <Form className="justify-content-center ">
      <Row className="pb-5">
        <Col>
          <h4 className="text-center font-weight-bold">Admin Settings</h4>
        </Col>
      </Row>
      reset weight
      <br />
      Automation
    </Form>
  );
};

export default AdminSettings;
