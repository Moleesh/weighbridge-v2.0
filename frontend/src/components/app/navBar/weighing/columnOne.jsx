import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Clock from "react-live-clock";
import { Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";

const ColumnOne = props => {
  let thisState = props.preState;
  return (
    <Col sm="4" className="mt-2">
      <Form.Group as={Row}>
        <Form.Label column sm="6">
          Slip No
        </Form.Label>
        <Col sm="6">
          <Form.Control
            className="text-center disbleBG"
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
            onKeyDown={async event => {
              if (event.keyCode === 9 && event.shiftKey);
              else if ((event.keyCode === 13) | (event.keyCode === 9)) {
                thisState.weight.vehicleNo = thisState.weight.vehicleNo
                  .toUpperCase()
                  .replace(" ", "");
                if (thisState.weighing.tareSelector) {
                  await fetch(
                    thisState.INITIAL_URL +
                      "/getGrossWeight?vehicleNo=" +
                      thisState.weight.vehicleNo
                  )
                    .then(response => {
                      if (response.status === 200) {
                        return response.json();
                      } else throw Error(response.statusText);
                    })
                    .then(result => {
                      thisState.weight.grossWeight = result.grossWeight;
                      thisState.weight.grossTime = result.grossTime;
                    })
                    .catch(error => {});
                } else {
                  await fetch(
                    thisState.INITIAL_URL +
                      "/getTareWeight?vehicleNo=" +
                      thisState.weight.vehicleNo
                  )
                    .then(response => {
                      if (response.status === 200) {
                        return response.json();
                      } else throw Error(response.statusText);
                    })
                    .then(result => {
                      thisState.weight.tareWeight = result.tareWeight;
                      thisState.weight.tareTime = result.tareTime;
                    })
                    .catch(error => {});
                }

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
            id="material"
            selectHintOnEnter
            filterBy={["materialId", "material"]}
            labelKey={option => option.material}
            renderMenu={(results, menuProps) =>
              results.length !== 0 ? (
                <Menu {...menuProps} key="materialMenu">
                  {results.map((result, index) => (
                    <MenuItem
                      option={result}
                      position={index}
                      key={(result.id ? result.id : -1).toString()}
                    >
                      {result.material}
                    </MenuItem>
                  ))}
                </Menu>
              ) : null
            }
            options={thisState.configuration.material.list}
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
