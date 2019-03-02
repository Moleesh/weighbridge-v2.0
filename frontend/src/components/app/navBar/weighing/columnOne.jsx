import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Clock from "react-live-clock";
import { Typeahead } from "react-bootstrap-typeahead";

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
          checked={thisState.weighing.grossSelector}
          onChange={event =>
            thisState.setMyState({
              weighing: {
                grossSelector: event.currentTarget.value,
                tareSelector: !event.currentTarget.value
              }
            })
          }
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="1" />
        <Form.Check
          type="radio"
          name="Gross-Tare-Selector"
          label="Tare"
          checked={thisState.weighing.tareSelector}
          onChange={event =>
            thisState.setMyState({
              weighing: {
                grossSelector: !event.currentTarget.value,
                tareSelector: event.currentTarget.value
              }
            })
          }
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Slip No
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center"
            value={thisState.weight.slipNo}
            onChange={event =>
              thisState.setMyState({
                weight: { slipNo: event.target.value }
              })
            }
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
            <Clock
              format={"MM-DD-YYYY HH:mm:ss"}
              ticking={true}
              interval={100000}
              onChange={event => console.log(event)}
            />
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
            disabled={thisState.weighing.disable.vehicleNoDisabled}
            value={thisState.weight.vehicleNo}
            onChange={event =>
              thisState.setMyState({
                weight: { vehicleNo: event.target.value }
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Material
        </Form.Label>
        <Col sm="6">
          <Typeahead
            highlightOnlyResult
            selectHintOnEnter
            filterBy={["id", "name"]}
            labelKey={option => option.name}
            options={[
              { id: "1", name: "John" },
              { id: "2", name: "Miles" },
              { id: "3", name: "Charles" },
              { id: "4", name: "Herbie" }
            ]}
            selected={thisState.weight.material}
            disabled={thisState.weighing.disable.materialDisabled}
            value=""
            onChange={event => {
              //  thisState.setMyState({ material: event });
            }}
            ref={material => (thisState.materialRef = material)}
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
            disabled={thisState.weighing.disable.chargesDisabled}
            value={thisState.weight.charges}
            onChange={event =>
              thisState.setMyState({
                weight: {
                  charges:
                    (event.target.value.match("[0-9]+") || []).pop() || ""
                }
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
            disabled={thisState.weighing.disable.remarksDisabled}
            value={thisState.weight.remarks}
            onChange={event =>
              thisState.setMyState({
                weight: { remarks: event.target.value.substring(0, 15) }
              })
            }
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnOne;
