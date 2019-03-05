import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Clock from "react-live-clock";
import { Typeahead } from "react-bootstrap-typeahead";

const ColumnOne = props => {
  let thisState = props.preState;
  return (
    <Col sm="4" className="mt-3">
      <Form.Group as={Row}>
        <Col sm="1" />
        <Form.Check
          type="radio"
          name="Gross-Tare-Selector"
          label="Gross"
          checked={thisState.weighing.grossSelector}
          onClick={event => {
            thisState.weighing.grossSelector = true;
            thisState.weighing.tareSelector = false;
            thisState.weight.material = "";
            thisState.weight.material = "";
            thisState.weighing.disable.materialDisabled = false;
            thisState.weighing.reference.materialReference.value = [
              { material: "" }
            ];
            thisState.setMyState(thisState);
          }}
          onChange={event => {}}
          disabled={thisState.weighing.disable.grossSelectorDisabled}
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="1" />
        <Form.Check
          type="radio"
          name="Gross-Tare-Selector"
          label="Tare"
          checked={thisState.weighing.tareSelector}
          onClick={event => {
            thisState.weighing.tareSelector = true;
            thisState.weighing.grossSelector = false;
            thisState.weight.material = "Empty";
            thisState.weighing.reference.materialReference.value = [
              { material: "Empty" }
            ];
            thisState.weighing.disable.materialDisabled = true;
            thisState.setMyState(thisState);
          }}
          onChange={event => {}}
          disabled={thisState.weighing.disable.tareSelectorDisabled}
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
            onChange={event => {
              thisState.weight.slipNo = event.target.value;
              thisState.setMyState(thisState);
            }}
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
            <Clock format={"DD-MM-YYYY HH:mm:ss"} ticking={true} />
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
            ref={thisState.weighing.reference.vehicleNoReference}
            onChange={event => {
              thisState.weight.vehicleNo = event.target.value;
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey);
              else if ((event.keyCode === 13) | (event.keyCode === 9)) {
                thisState.weight.vehicleNo = thisState.weight.vehicleNo
                  .toUpperCase()
                  .replace(" ", "");
                thisState.setMyState(thisState);
                !thisState.weighing.disable.materialDisabled
                  ? thisState.weighing.reference.materialReference.reference.current.focus()
                  : thisState.weighing.reference.customersNameReference.current.focus();
              }
            }}
            autoFocus={true}
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
            filterBy={["materialId", "material"]}
            labelKey={option => option.material}
            emptyLabel={""}
            options={[
              { materialId: "1", material: "John" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" },
              { materialId: "2", material: "Miles" },
              { materialId: "3", material: "Charles" },
              { materialId: "4", material: "Herbie" }
            ]}
            maxHeight={"200px"}
            selected={thisState.weighing.reference.materialReference.value}
            disabled={thisState.weighing.disable.materialDisabled}
            open={thisState.weighing.reference.materialReference.open}
            onChange={event => {
              thisState.weighing.reference.materialReference.value =
                event.length === 0
                  ? [
                      {
                        material: thisState.weighing.reference.materialReference.reference.current
                          .getInstance()
                          .getInput().value
                      }
                    ]
                  : event;
              thisState.weight.material =
                thisState.weighing.reference.materialReference.value[0].material;
              thisState.setMyState(thisState);
            }}
            ref={thisState.weighing.reference.materialReference.reference}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey)
                thisState.weighing.reference.vehicleNoReference.current.focus();
              else if ((event.keyCode === 13) | (event.keyCode === 9)) {
                thisState.weighing.reference.materialReference.open = false;
                thisState.weighing.reference.materialReference.value[0].material = thisState.weighing.reference.materialReference.value[0].material
                  .toLowerCase()
                  .split(" ")
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ");
                thisState.weight.material =
                  thisState.weighing.reference.materialReference.value[0].material;
                if (thisState.weight.material.toUpperCase() === "EMPTY") {
                  thisState.weighing.tareSelector = true;
                  thisState.weighing.grossSelector = false;
                }
                thisState.setMyState(thisState);
                thisState.weighing.reference.customersNameReference.current.focus();
              }
            }}
            onFocus={() => {
              thisState.weighing.reference.materialReference.open = undefined;
              thisState.setMyState(thisState);
            }}
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
            ref={thisState.weighing.reference.chargesReference}
            value={thisState.weight.charges}
            onChange={event => {
              thisState.weight.charges =
                (event.target.value.match("[0-9]+") || []).pop() || "";
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey)
                thisState.weighing.reference.transporterNameReference.current.focus();
              else if ((event.keyCode === 13) | (event.keyCode === 9))
                thisState.weighing.reference.remarksReference.current.focus();
            }}
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
            ref={thisState.weighing.reference.remarksReference}
            value={thisState.weight.remarks}
            onChange={event => {
              thisState.weight.remarks = event.target.value.substring(0, 15);
              thisState.setMyState(thisState);
            }}
            onKeyDown={event => {
              if (event.keyCode === 9 && event.shiftKey)
                thisState.weighing.reference.chargesReference.current.focus();
              else if ((event.keyCode === 13) | (event.keyCode === 9))
                thisState.weighing.reference.getWeightReference.current.focus();
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ColumnOne;
