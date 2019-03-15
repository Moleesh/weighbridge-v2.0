import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import moment from "moment";
import RePrint from "./bottom/rePrint";

const Bottom = props => {
  let thisState = props.preState;
  let prevent = false;

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

            let date = moment().format("DD-MM-YYYY HH:mm:ss");

            if (thisState.weighing.grossSelector) {
              thisState.weight.grossWeight = thisState.weighing.weight;
              thisState.weight.grossTime = date;
            } else {
              thisState.weight.tareWeight = thisState.weighing.weight;
              thisState.weight.tareTime = date;
            }

            let total =
              ((
                ("0" + thisState.weight.grossWeight).match("[0-9]+") || []
              ).pop() || "") -
              ((
                ("0" + thisState.weight.tareWeight).match("[0-9]+") || []
              ).pop() || "");

            if ((total > 0) & (thisState.weight.tareWeight > 0)) {
              thisState.weight.nettWeight = total;
            }
            thisState.weight.nettTime = date;
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.saveReference.current.focus()
              );
          }}
          disabled={thisState.weighing.disable.getWeightDisabled}
          ref={thisState.weighing.reference.getWeightReference}
          onKeyPress={event => {
            if (prevent) {
              prevent = false;
              event.preventDefault();
            }
          }}
          onFocus={event => {
            prevent = true;
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
            fetch(thisState.INITIAL_URL + "/saveWeight", {
              method: "POST",
              body: JSON.stringify(thisState.weight),
              headers: { "content-type": "application/json" }
            })
              .then(response => {
                if (response.status === 200) {
                  thisState.weighing.disable.saveDisabled = true;
                  thisState.weighing.disable.printDisabled = false;
                  thisState
                    .setMyState(thisState)
                    .then(() =>
                      thisState.weighing.reference.printReference.current.focus()
                    );
                } else throw Error(response.statusText);
              })
              .catch(error => {});
          }}
          disabled={thisState.weighing.disable.saveDisabled}
          ref={thisState.weighing.reference.saveReference}
          onKeyPress={event => {
            if (prevent) {
              prevent = false;
              event.preventDefault();
            }
          }}
          onFocus={event => {
            prevent = true;
          }}
        >
          Save
        </Button>
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            thisState.weighing.reprint = true;
            thisState.weighing.reprintSlipNo = "";
            thisState
              .setMyState(thisState)
              .then(() =>
                thisState.weighing.reference.rePrintFieldReference.current.focus()
              );
          }}
          onKeyPress={event => {
            if (prevent) {
              prevent = false;
              event.preventDefault();
            }
          }}
          onFocus={event => {
            thisState.weighing.disable.printDisabled
              ? (prevent = true)
              : thisState.weighing.reference.printReference.current.focus();
          }}
          ref={thisState.weighing.reference.rePrintReference}
        >
          Re Print
        </Button>
        <RePrint preState={thisState} />
      </Col>
      <Col sm="2">
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            fetch(thisState.INITIAL_URL + "/getNextSlipNo")
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else throw Error(response.statusText);
              })
              .then(result => {
                return result;
              })
              .catch(error => {
                return -1;
              })
              .then(result => {
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
                thisState.weight.slipNo = result;
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
                thisState.weight.nettTime = "";
                thisState.weight.charges = "";
                thisState.weight.remarks = "";
                thisState
                  .setMyState(thisState)
                  .then(() =>
                    thisState.weighing.reference.vehicleNoReference.current.focus()
                  );
              });
          }}
          disabled={thisState.weighing.disable.printDisabled}
          ref={thisState.weighing.reference.printReference}
          onKeyPress={event => {
            if (prevent) {
              prevent = false;
              event.preventDefault();
            }
          }}
          onFocus={event => {
            prevent = true;
          }}
        >
          Print
        </Button>
        <Button
          className="adam-button"
          variant="primary"
          block
          onClick={() => {
            fetch(thisState.INITIAL_URL + "/getNextSlipNo")
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else throw Error(response.statusText);
              })
              .then(result => {
                return result;
              })
              .catch(error => {
                return -1;
              })
              .then(result => {
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
                thisState.weight.slipNo = result;
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
                thisState.weight.nettTime = "";
                thisState.weight.charges = "";
                thisState.weight.remarks = "";
                thisState
                  .setMyState(thisState)
                  .then(() =>
                    thisState.weighing.reference.vehicleNoReference.current.focus()
                  );
              });
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
