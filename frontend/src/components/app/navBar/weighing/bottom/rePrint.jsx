import React from "react";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";

const RePrint = props => {
  let thisState = props.preState;
  let prevent = false;
  return (
    <Modal
      show={thisState.weighing.reprint}
      onHide={() => {
        thisState.weighing.reprint = false;
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
        <Modal.Title id="contained-modal-title-vcenter">Reprint </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row}>
          <Form.Label column sm="6">
            Please Enter Reprint Slip no ..
          </Form.Label>
          <Col sm="6">
            <Form.Control
              className="text-centre"
              value={
                thisState.weighing.reprintSlipNo === 0
                  ? ""
                  : thisState.weighing.reprintSlipNo
              }
              onChange={event => {
                thisState.weighing.reprintSlipNo =
                  (event.target.value.match("[0-9]+") || []).pop() || "";
                thisState.setMyState(thisState);
              }}
              onKeyDown={event => {
                if (event.keyCode === 9 && event.shiftKey);
                else if ((event.keyCode === 13) | (event.keyCode === 9))
                  thisState.weighing.reference.rePrintButtonReference.current.focus();
              }}
              ref={thisState.weighing.reference.rePrintFieldReference}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={event => {
            if (thisState.weighing.reprintSlipNo !== "") {
              fetch(
                thisState.INITIAL_URL +
                "/getWeight?slipNo=" +
                thisState.weighing.reprintSlipNo
              )
                .then(response => {
                  if (response.status === 200) {
                    return response.json();
                  } else throw Error(response.statusText);
                })
                .then(result => {
                  thisState.weighing.reprint = false;
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
                  thisState.weight = result;
                  thisState.weighing.reference.materialReference.value = [
                    { material: thisState.weight.material }
                  ];
                  thisState.setMyState(thisState);
                })
                .catch(error => {
                  thisState.weighing.reprint = false;
                  thisState
                    .setMyState(thisState)
                    .then(() =>
                      thisState.weighing.reference.rePrintReference.current.focus()
                    );
                });
            } else {
              thisState.weighing.reprint = false;
              thisState
                .setMyState(thisState)
                .then(() =>
                  thisState.weighing.reference.rePrintReference.current.focus()
                );
            }
          }}
          onKeyPress={event => {
            if (prevent) {
              prevent = false;
              event.preventDefault();
            }
          }}
          onFocus={event => {
            prevent = true;
          }}
          ref={thisState.weighing.reference.rePrintButtonReference}
        >
          Get Details
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RePrint;
