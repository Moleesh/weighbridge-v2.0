import React from "react";
import { Form, Col, Row } from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const AdminSettings = props => {
  let thisState = props.preState;
  return (
    <Form>
      <Row className="pb-5">
        <Col>
          <h4 className="text-center font-weight-bold">Admin Settings</h4>
        </Col>
      </Row>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Reset Weight
        </Form.Label>
        <Col sm="9" />
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Automation
        </Form.Label>
        <Col sm="9">
          <Toggle
            onClick={() => {
              thisState.automation = !thisState.automation;
              if (thisState.automation) {
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
                    thisState.weighing.disable.printDisabled = true;
                    thisState.weighing.disable.customersIdDisabled = false;
                    thisState.weighing.disable.materialIdDisabled = false;
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
              } else {
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
                    thisState.weighing.disable.customersIdDisabled = true;
                    thisState.weighing.disable.materialIdDisabled = true;
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
              }
              thisState.setMyState(thisState);
            }}
            on="ON"
            off="OFF"
            size="lg"
            offstyle="danger"
            active={thisState.automation}
            recalculateOnResize={true}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AdminSettings;
