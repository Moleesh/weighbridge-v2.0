import React from "react";
import {Card, Col, Form, Image, Row} from "react-bootstrap";

import ColumnOne from "./weighing/columnOne";
import ColumnTwo from "./weighing/columnTwo";
import ColumnThree from "./weighing/columnThree";
import Bottom from "./weighing/bottom";

const Weighing = props => {
    let thisState = props.preState;
    return (
        <Form
            className="py-2"
            onKeyDown={event => {
                if (event.keyCode === 9) {
                    event.preventDefault();
                }
            }}
        >
            <Row style={{height: 200}}>
                <Col sm="2" className="mt-5">
                    <Form.Group as={Row}>
                        <Col sm="1"/>
                        <Form.Check
                            type="radio"
                            name="Gross-Tare-Selector"
                            label="Gross"
                            checked={thisState.weighing.grossSelector}
                            onClick={() => {
                                thisState.weighing.grossSelector = true;
                                thisState.weighing.tareSelector = false;
                                thisState.weight.material = "";
                                thisState.weighing.disable.materialDisabled = false;
                                thisState.weighing.reference.materialReference.value = [
                                    {material: ""}
                                ];
                                thisState.weighing.reference.vehicleNoReference.current.focus()
                                thisState.setMyState(thisState);
                            }}
                            onChange={() => {
                            }}
                            disabled={thisState.weighing.disable.grossSelectorDisabled}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0">
                        <Col sm="1"/>
                        <Form.Check
                            type="radio"
                            name="Gross-Tare-Selector"
                            label="Tare"
                            checked={thisState.weighing.tareSelector}
                            onClick={() => {
                                thisState.weighing.tareSelector = true;
                                thisState.weighing.grossSelector = false;
                                thisState.weight.material = "Empty";
                                thisState.weighing.reference.materialReference.value = [
                                    {material: "Empty"}
                                ];
                                thisState.weighing.disable.materialDisabled = true;
                                thisState.weighing.reference.vehicleNoReference.current.focus()
                                thisState.setMyState(thisState);
                            }}
                            onChange={() => {
                            }}
                            disabled={thisState.weighing.disable.tareSelectorDisabled}
                        />
                    </Form.Group>
                </Col>

                <Col sm="5">
                    <Row className="justify-content-center bold mt-3">
                        <Card
                            className="text-center w-100 display-2 "
                            style={{
                                color: "red",
                                fontFamily: "sans-serif"
                            }}
                        >
                            <Card.Header>{thisState.WEIGHT}</Card.Header>
                        </Card>
                    </Row>
                </Col>
                <Col sm="5">
                    <Image
                        src={thisState.primaryWebCamImage}
                        style={{height: 200}}
                        className="rounded mx-auto d-block"
                        alt=""
                        onLoad={() => {
                            thisState.setMyState({
                                primaryWebCamImage:
                                    thisState.INITIAL_URL + "/webCam/getWebCamImage?webcam=" + thisState.webCam.details[0].name + "&rnd=" + Math.random()
                            });
                        }}
                        onError={async () => {
                            setTimeout(function () {
                                thisState.setMyState({
                                    primaryWebCamImage:
                                        thisState.INITIAL_URL + "/webCam/getWebCamImage?webcam=" + thisState.webCam.details[0].name + "&rnd=" + Math.random()
                                });
                            }, 5000);
                        }}
                        fluid
                    />
                </Col>
            </Row>
            <Row>
                <ColumnOne preState={thisState}/>
                <ColumnTwo preState={thisState}/>
                <ColumnThree preState={thisState}/>
            </Row>
            <Row>
                <Col sm="6">
                    <Bottom preState={thisState}/>
                </Col>
                <Col sm="6"/>
            </Row>
        </Form>
    );
};

export default Weighing;
