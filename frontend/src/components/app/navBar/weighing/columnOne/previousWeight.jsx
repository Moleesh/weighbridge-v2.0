import React from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";

const PreviousWeight = props => {
    let thisState = props.preState;
    return (
        <Modal
            show={thisState.weighing.previousWeightSelector}
            onHide={() => {
                thisState.weighing.previousWeightSelector = false;
                thisState.weighing.preventVehicleNoFocus = true;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter">Previous {thisState.weighing.previousWeight} Weight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="my-4  ml-3">
                    Please select 'YES' to enter the previous {thisState.weighing.previousWeight} weight ...
                </Row>
                <Row>
                    <Col className="my-3  ml-5" sm="4">
                        {thisState.weighing.previousWeight} Weight
                    </Col>
                    <Col className="my-3">
                        : <b>{thisState.weighing.previousWeightResult.tareWeight}</b>
                    </Col>
                </Row>
                <Row>
                    <Col className="my-3  ml-5" sm="4">
                        {thisState.weighing.previousWeight} Date & Time
                    </Col>
                    <Col className="my-3">
                        : <b>{thisState.weighing.previousWeightResult.tareTime}</b>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => {
                        thisState.weighing.previousWeightSelector = false;
                        if (thisState.weighing.previousWeight === "Gross") {
                            thisState.weight.grossWeight = thisState.weighing.previousWeightResult.tareWeight;
                            thisState.weight.grossTime = thisState.weighing.previousWeightResult.tareTime;
                        } else {
                            thisState.weight.tareWeight = thisState.weighing.previousWeightResult.tareWeight;
                            thisState.weight.tareTime = thisState.weighing.previousWeightResult.tareTime;
                        }
                        thisState.weighing.preventVehicleNoFocus = true;
                        thisState.setMyState(thisState);
                    }}
                    ref={thisState.weighing.reference.previousWeightReference}
                >
                    YES
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.weighing.previousWeightSelector = false;
                        thisState.weighing.preventVehicleNoFocus = true;
                        thisState.setMyState(thisState);
                    }}
                >
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviousWeight;
