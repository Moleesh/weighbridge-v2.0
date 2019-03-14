import React from "react";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";

const Filter = props => {
  let thisState = props.preState;
  return (
    <Modal
      show={thisState.report.filterPopUp}
      onHide={() => {
        thisState.report.filterPopUp = false;
        thisState
          .setMyState(thisState)
          .then(() =>
            thisState.weighing.reference.rePrintReference.current.focus()
          );
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Available Filters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="pl-4">
          {Object.keys(thisState.report.headers).map(key => (
            <Col sm="4" key={key}>
              <Form.Group as={Row}>
                <Form.Check
                  type="checkbox"
                  checked={thisState.report.filters[key]}
                  onClick={event => {
                    thisState.report.filters[key] = !thisState.report.filters[
                      key
                    ];
                    thisState.setMyState(thisState);
                  }}
                  onChange={() => {}}
                  label={thisState.report.headers[key]}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={event => {
            thisState.report.filterPopUp = false;
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.rePrintReference.current.focus()
              );
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Filter;
