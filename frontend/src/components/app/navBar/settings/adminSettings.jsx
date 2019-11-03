import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Toggle from "react-bootstrap-toggle";

import ResetSlipNo from "./adminSettings/resetSlipNo";
import ManualEntry from "./adminSettings/manualEntry"
import EditEnable from "./adminSettings/editEnable"

const AdminSettings = props => {
    // noinspection JSUnresolvedVariable
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
                    Reset Slip No
                </Form.Label>
                <Col sm="9">
                    <Button
                        variant="danger"
                        size="lg"
                        onClick={() => {
                            thisState.setting.resetSlipNo = 1;
                            thisState.setting.resetSlipNoPassword = "";
                            thisState.setting.resetSlipNoDialog = true;
                            thisState
                                .setMyState(thisState)
                                .then(() =>
                                    thisState.setting.resetSlipNoReference.current.focus()
                                );
                        }}
                    >
                        <FontAwesomeIcon icon={faBackward} className="mr-3" />
                        Reset Slip No
                    </Button>
                    <ResetSlipNo preState={thisState} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Manual Entry
                </Form.Label>
                <Col sm="9">
                    <Toggle
                        onClick={() => {
                            if (!thisState.setting.manualEntry) {
                                thisState.setting.manualEntryDialog = true;
                                thisState.setting.manualEntryPassword = "";
                                thisState
                                    .setMyState(thisState)
                                    .then(() =>
                                        thisState.setting.manualEntryPasswordReference.current.focus()
                                    );
                            } else {
                                thisState.weight.manual = "N";
                                thisState.setting.manualEntry = false;
                                thisState.setMyState(thisState);
                            }
                        }}
                        on="ON"
                        off="OFF"
                        size="lg"
                        offstyle="danger"
                        active={thisState.setting.manualEntry}
                        recalculateOnResize={true}
                    />
                    <ManualEntry preState={thisState} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Enable Edit Records
                </Form.Label>
                <Col sm="9">
                    <Toggle
                        onClick={() => {
                            if (!thisState.setting.editEnable) {
                                thisState.setting.editEnableDialog = true;
                                thisState.setting.editEnablePassword = "";
                                thisState
                                    .setMyState(thisState)
                                    .then(() =>
                                        thisState.setting.editEnablePasswordReference.current.focus()
                                    );
                            } else {
                                thisState.setting.editEnable = false;
                                thisState.setMyState(thisState);
                            }
                        }}
                        on="ON"
                        off="OFF"
                        size="lg"
                        offstyle="danger"
                        active={thisState.setting.editEnable}
                        recalculateOnResize={true}
                    />
                    <EditEnable preState={thisState} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Automation
                </Form.Label>
                <Col sm="9">
                    <Toggle
                        onClick={() => {
                            thisState.setting.automation = !thisState.setting.automation;
                            thisState.setMyState(thisState);
                            if (thisState.setting.automation) {
                                // noinspection DuplicatedCode
                                fetch(thisState.INITIAL_URL + "/getNextSlipNo")
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    })
                                    .then(result => {
                                        return result;
                                    })
                                    .catch(() => {
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
                                        thisState.setMyState(thisState)
                                    });
                            } else {
                                // noinspection DuplicatedCode
                                fetch(thisState.INITIAL_URL + "/getNextSlipNo")
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    })
                                    .then(result => {
                                        return result;
                                    })
                                    .catch(() => {
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
                                        thisState.setMyState(thisState)
                                    });
                            }
                        }}
                        on="ON"
                        off="OFF"
                        size="lg"
                        offstyle="danger"
                        active={thisState.setting.automation}
                        recalculateOnResize={true}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export default AdminSettings;
