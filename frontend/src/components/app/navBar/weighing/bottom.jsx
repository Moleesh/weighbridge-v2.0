import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Moment from "moment";

const Bottom = props => {
  let thisState = props.preState;
  return (
    <Row>
      <Col sm="2">
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={event => {
            thisState.weighing.disable.grossSelectorDisabled = true;
            thisState.weighing.disable.tareSelectorDisabled = true;
            thisState.weighing.disable.vehicleNoDisabled = true;
            thisState.weighing.disable.customersNameDisabled = true;
            thisState.weighing.disable.transporterNameDisabled = true;
            thisState.weighing.disable.materialDisabled = true;
            thisState.weighing.disable.chargesDisabled = true;
            thisState.weighing.disable.remarksDisabled = true;
            thisState.weighing.disable.getWeightDisabled = true;
            thisState.weighing.disable.saveDisabled = false;

            let date = Moment().format("MM-DD-YYYY HH:mm:ss");

            if (thisState.weighing.grossSelector) {
              thisState.weight.grossWeight = thisState.weighing.weight;
              thisState.weight.grossTime = date;
            } else {
              thisState.weight.tareWeight = thisState.weighing.weight;
              thisState.weight.tareTime = date;
            }

            let total =
              ((thisState.weight.grossWeight.match("[0-9]+") || []).pop() ||
                "") -
              ((thisState.weight.tareWeight.match("[0-9]+") || []).pop() || "");

            if ((total > 0) & (thisState.weight.tareWeight > 0)) {
              thisState.weight.nettWeight = total;
              thisState.weight.nettTIme = date;
            }
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.saveReference.current.focus()
              );
          }}
          disabled={thisState.weighing.disable.getWeightDisabled}
          ref={thisState.weighing.reference.getWeightReference}
          onFocus={event => {
            event.stopPropagation();
          }}
        >
          Get Weight
        </Button>
      </Col>
      <Col sm="2">
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            thisState.weighing.disable.saveDisabled = true;
            thisState.weighing.disable.printDisabled = false;
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.printReference.current.focus()
              );
          }}
          disabled={thisState.weighing.disable.saveDisabled}
          ref={thisState.weighing.reference.saveReference}
          onFocus={event => {
            console.log("hrer");
          }}
        >
          Save
        </Button>
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            thisState.weighing.disable.grossSelectorDisabled = true;
            thisState.weighing.disable.tareSelectorDisabled = true;
            thisState.weighing.disable.vehicleNoDisabled = true;
            thisState.weighing.disable.customersNameDisabled = true;
            thisState.weighing.disable.transporterNameDisabled = true;
            thisState.weighing.disable.materialDisabled = true;
            thisState.weighing.disable.chargesDisabled = true;
            thisState.weighing.disable.remarksDisabled = true;
            thisState.weighing.disable.getWeightDisabled = true;
            thisState.weighing.disable.saveDisabled = true;
            thisState.weighing.disable.printDisabled = false;
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.printReference.current.focus()
              );
          }}
        >
          Re Print
        </Button>
      </Col>
      <Col sm="2">
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            thisState.weighing.disable.grossSelectorDisabled = false;
            thisState.weighing.disable.tareSelectorDisabled = false;
            thisState.weighing.disable.vehicleNoDisabled = false;
            thisState.weighing.disable.customersNameDisabled = false;
            thisState.weighing.disable.transporterNameDisabled = false;
            thisState.weighing.disable.materialDisabled = false;
            thisState.weighing.disable.chargesDisabled = false;
            thisState.weighing.disable.remarksDisabled = false;
            thisState.weighing.disable.getWeightDisabled = false;
            thisState.weighing.disable.saveDisabled = true;
            thisState.weighing.disable.printDisabled = true;
            thisState.weight.slipNo = "";
            thisState.weight.vehicleNo = "";
            thisState.weight.customersName = "";
            thisState.weight.transporterName = "";
            thisState.weight.material = "";
            thisState.weighing.reference.materialReference.value = [
              { material: "" }
            ];
            thisState.weight.grossWeight = "";
            thisState.weight.grossTime = "";
            thisState.weight.tareWeight = "";
            thisState.weight.tareTime = "";
            thisState.weight.nettWeight = "";
            thisState.weight.nettTIme = "";
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.vehicleNoReference.current.focus()
              );
          }}
          disabled={thisState.weighing.disable.printDisabled}
          ref={thisState.weighing.reference.printReference}
        >
          Print
        </Button>
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            thisState.weighing.grossSelector = true;
            thisState.weighing.tareSelector = false;
            thisState.weighing.disable.grossSelectorDisabled = false;
            thisState.weighing.disable.tareSelectorDisabled = false;
            thisState.weighing.disable.vehicleNoDisabled = false;
            thisState.weighing.disable.customersNameDisabled = false;
            thisState.weighing.disable.transporterNameDisabled = false;
            thisState.weighing.disable.materialDisabled = false;
            thisState.weighing.disable.chargesDisabled = false;
            thisState.weighing.disable.remarksDisabled = false;
            thisState.weighing.disable.getWeightDisabled = false;
            thisState.weighing.disable.saveDisabled = true;
            thisState.weighing.disable.printDisabled = true;
            thisState.weight.slipNo = "";
            thisState.weight.vehicleNo = "";
            thisState.weight.customersName = "";
            thisState.weight.transporterName = "";
            thisState.weight.material = "";
            thisState.weighing.reference.materialReference.value = [
              { material: "" }
            ];
            thisState.weight.grossWeight = "";
            thisState.weight.grossTime = "";
            thisState.weight.tareWeight = "";
            thisState.weight.tareTime = "";
            thisState.weight.nettWeight = "";
            thisState.weight.nettTIme = "";
            thisState.setMyState(thisState);
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.vehicleNoReference.current.focus()
              );
          }}
        >
          Clear
        </Button>
      </Col>
      <Col sm="6" />
    </Row>
  );
};

export default Bottom;
