import React, { Component } from "react";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";

const RePrint = props => {
  let thisState = props.preState;
  return (
    <Modal
      //   show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Reprint </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Please Enter Reprint Slip no ..{" "}
          </Form.Label>
          <Col sm="6">
            <Form.Control
              className="text-right"
              value={""}
              onChange={event => {
                // thisState.weight.nettWeight = event.target.value;
                // thisState.setMyState(thisState);
              }}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={thisState.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RePrint;
