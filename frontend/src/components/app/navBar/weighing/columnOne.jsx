import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Clock from "react-live-clock";
import Typeahead from "react-bootstrap-typeahead";

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
          Slip No
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            value={thisState.slipNo}
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
          <Form.Control
            className="text-center"
            disabled={thisState.vehicleNoDisabled}
            value={thisState.vehicleNo}
            onChange={event =>
              thisState.setMyState({ vehicleNo: event.target.value })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Material
        </Form.Label>
        <Col sm="6">
          {/* <Typeahead
            labelKey="name"
            options={[]}
            placeholder="Choose a state..."
          /> */}
          <Form.Control
            className="text-center"
            disabled={thisState.materialDisabled}
            value={thisState.material}
            onChange={event =>
              thisState.setMyState({ material: event.target.value })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Charges
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled={thisState.chargesDisabled}
            value={thisState.charges}
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
          Remarks
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            disabled={thisState.remarksDisabled}
            value={thisState.remarks}
            onChange={event =>
              thisState.setMyState({
                remarks: event.target.value.substring(0, 15)
              })
            }
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnOne;
