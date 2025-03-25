import React from "react";
import moment from "moment";

import { Button, Col, Form, Row } from "react-bootstrap";

import TareDetails from "./columnThree/tareDetails";
import GrossDetails from "./columnThree/grossDetails";

const ColumnThree = props => {
    let thisState = props.preState;
    return (
        <Col sm="4" className="mt-2">
            {thisState.settings.value.automation ?
                <React.Fragment>
                    <Form.Group as={Row}>
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
                                    if (event.key === "Tab" && event.shiftKey) {

                                    } else if (event.key === "Enter" || event.key === "Tab") {
                                        let customer = thisState.configuration.customer.list.filter(
                                            item =>
                                                parseInt(item.customerId) ===
                                                parseInt(thisState.weighing.customersId)
                                        )[0];
                                        if (customer !== undefined) {
                                            thisState.weight.transporterName = customer.transporterName;
                                            thisState.weight.vehicleNo = customer.vehicleNo;
                                            thisState.weight.customersName = customer.customerName;
                                        } else {
                                            thisState.weight.transporterName = "";
                                            thisState.weight.vehicleNo = "";
                                            thisState.weight.customersName = "";
                                        }
                                        thisState.setMyState(thisState);
                                        thisState.switchFocus(thisState, 'weighing', 'materialId', false);
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
                                value={thisState.weighing.materialId}
                                onChange={event => {
                                    thisState.weighing.materialId = event.target.value;
                                    thisState.setMyState(thisState);
                                }}
                                onKeyDown={async event => {
                                    if (event.key === "Tab" && event.shiftKey) {
                                        thisState.switchFocus(thisState, 'weighing', 'customersId', false);
                                    } else if (event.key === "Enter" || event.key === "Tab") {
                                        let material = thisState.configuration.material.list.filter(
                                            item =>
                                                parseInt(item.materialId) ===
                                                parseInt(thisState.weighing.materialId)
                                        )[0];
                                        if (material !== undefined) {
                                            thisState.weighing.reference.materialReference.value = [
                                                { material: material.material }
                                            ];
                                            thisState.weight.material = material.material;
                                            if (material.material === "EMPTY") {
                                                thisState.weighing.grossSelector = false;
                                                thisState.weighing.tareSelector = true;
                                            }
                                        } else {
                                            thisState.weighing.reference.materialReference.value = [
                                                { material: "" }
                                            ];
                                            thisState.weight.material = "";
                                        }
                                        if (thisState.weighing.tareSelector) {
                                            await fetch(
                                                thisState.INITIAL_URL +
                                                "/weight/getGrossWeightByVehicleNoAndProfile?profile=" + thisState.PROFILE + "&vehicleNo=" +
                                                thisState.weight.vehicleNo
                                            ).then(response => {
                                                if (response.status === 200) {
                                                    return response.json();
                                                } else throw Error(response.statusText);
                                            }).then(result => {
                                                thisState.weight.grossWeight = result.grossWeight;
                                                thisState.weight.grossTime = result.grossTime;
                                            });
                                        } else {
                                            await fetch(
                                                thisState.INITIAL_URL +
                                                "/tareWeight/getTareWeightByVehicleNo?vehicleNo=" +
                                                thisState.weight.vehicleNo
                                            ).then(response => {
                                                if (response.status === 200) {
                                                    return response.json();
                                                } else throw Error(response.statusText);
                                            }).then(result => {
                                                thisState.weight.tareWeight = result.tareWeight;
                                                thisState.weight.tareTime = result.tareTime;
                                            });
                                        }
                                        let date = moment().format("DD-MM-YYYY HH:mm:ss");

                                        if (thisState.weighing.grossSelector) {
                                            thisState.weight.grossWeight = thisState.WEIGHT;
                                            thisState.weight.grossTime = date;
                                        } else {
                                            thisState.weight.tareWeight = thisState.WEIGHT;
                                            thisState.weight.tareTime = date;
                                        }

                                        let total =
                                            ((
                                                ("0" + thisState.weight.grossWeight).match("[0-9]+") || []
                                            ).pop() || "") -
                                            ((
                                                ("0" + thisState.weight.tareWeight).match("[0-9]+") || []
                                            ).pop() || "");

                                        if ((total > 0) && (thisState.weight.tareWeight > 0)) {
                                            thisState.weight.nettWeight = total;
                                        }
                                        thisState.weight.nettTime = date;
                                        fetch(thisState.INITIAL_URL + "/weight/saveWeight", {
                                            method: "POST",
                                            body: JSON.stringify(thisState.weight),
                                            headers: { "content-type": "application/json" }
                                        }).then(response => {
                                            if (response.status === 200) {
                                                fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(response => {
                                                    if (response.status === 200) {
                                                        return response.json();
                                                    } else throw Error(response.statusText);
                                                }).then(result => {
                                                    return result;
                                                }).catch(() => {
                                                    return -1;
                                                }).then(result => {
                                                    thisState.weight.slipNo = result;
                                                    thisState.weight.vehicleNo = "";
                                                    thisState.weighing.reference.vehicleNoReference.value = [
                                                        { vehicleNo: "" }
                                                    ];
                                                    thisState.weight.customersName = "";
                                                    thisState.weight.transporterName = "";
                                                    thisState.weight.place = "";
                                                    thisState.weighing.reference.placeReference.value = [
                                                        { place: "" }
                                                    ];
                                                    thisState.weight.material = "";
                                                    thisState.weighing.customersId = "";
                                                    thisState.weighing.materialId = "";
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
                                                    thisState.weighing.grossSelector = true;
                                                    thisState.weighing.tareSelector = false;
                                                    thisState.setMyState(thisState).then(() => thisState.switchFocus(thisState, 'weighing', 'customersId', false));
                                                });

                                                thisState.setMyState(thisState).then(() => thisState.switchFocus(thisState, 'weighing', 'customersId', false));
                                            } else throw Error(response.statusText);
                                        });
                                        await thisState.setMyState(thisState);
                                    }
                                }}
                            />
                        </Col>
                    </Form.Group>
                </React.Fragment>
                : <React.Fragment>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Control
                                className="nullButton"
                                disabled

                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Control
                                className="nullButton"
                                disabled

                            />
                        </Col>
                    </Form.Group>
                </React.Fragment>}
            <Form.Group as={Row}>
                <Col>
                    <Form.Control
                        className="nullButton"
                        disabled

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
                {thisState.settings.manualEntry ?
                    <Col sm="6">
                        <Button className="adam-button " variant="primary" block
                            disabled={thisState.weighing.disable.grossDetailsDisabled}
                            onClick={() => {
                                thisState.weighing.grossDetails = true;
                                thisState.weighing.grossDetailsWeight = "";
                                thisState.weighing.grossDetailsDate = moment().format("DD-MM-YYYY HH:mm:ss")
                                thisState.setMyState(thisState).then(() => thisState.switchFocus(thisState, 'weighing', 'grossDetails', false));
                            }}>
                            Get Gross Details
                        </Button>
                        <GrossDetails preState={thisState} />
                    </Col>
                    : ""}
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
                {thisState.settings.manualEntry ?
                    <Col sm="6">
                        <Button className="adam-button " variant="primary" block
                            disabled={thisState.weighing.disable.tareDetailsWeightDisabled}
                            onClick={() => {
                                thisState.weighing.tareDetails = true;
                                thisState.weighing.tareDetailsWeight = "";
                                thisState.weighing.tareDetailsDate = moment().format("DD-MM-YYYY HH:mm:ss")
                                thisState.setMyState(thisState).then(() => thisState.switchFocus(thisState, 'weighing', 'tareDetails', false));
                            }}>
                            Get Tare Details
                        </Button>
                        <TareDetails preState={thisState} />
                    </Col>
                    : ""}
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
            </Form.Group>
        </Col>
    );
};

export default ColumnThree;
