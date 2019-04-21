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
            disabled={thisState.weighing.disable.customersIdDisabled}
            ref={thisState.weighing.reference.customersIdReference}
            value={thisState.weighing.customersId}
            onChange={event => {
              thisState.weighing.customersId = event.target.value;
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if ((event.keyCode === 13) | (event.keyCode === 9)) {
                let driver = thisState.configuration.drivers.list.filter(
                  item =>
                    parseInt(item.customerId) ===
                    parseInt(thisState.weighing.customersId)
                )[0];
                if (driver !== undefined) {
                  thisState.weight.transporterName = driver.transporterName;
                  thisState.weight.vehicleNo = driver.vehicleNo;
                  thisState.weight.customersName = driver.customerName;
                } else {
                  thisState.weight.transporterName = "";
                  thisState.weight.vehicleNo = "";
                  thisState.weight.customersName = "";
                }
                thisState.setMyState(thisState);

                thisState.weighing.reference.materialIdReference.current.focus();
              }
            }}
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
            disabled={thisState.weighing.disable.materialIdDisabled}
            ref={thisState.weighing.reference.materialIdReference}
            value={thisState.weight.materialId}
            onChange={event => {
              thisState.weight.materialId = event.target.value;
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey)
                thisState.weighing.reference.customersIdReference.current.focus();
              else if ((event.keyCode === 13) | (event.keyCode === 9)) {
                thisState.weighing.reference.customersIdReference.current.focus();
              }
            }}
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
          <Button className="adam-button none" variant="primary" block disabled>
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
          <Button className="adam-button none" variant="primary" block disabled>
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
          <Button className="adam-button none" variant="primary" block disabled>
            Total
          </Button>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnThree;
