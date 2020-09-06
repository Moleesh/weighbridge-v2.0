import React from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";

const PreviousWeight = props => {
    let thisState = props.preState;
    return (
        <Modal
            show={thisState.invoices.previousWeightSelector}
            onHide={() => {
                thisState.invoices.previousWeightSelector = false;
                thisState.invoices.preventFocus = true;
                thisState.setMyState(thisState);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter">Reference Weight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="my-4  ml-3">
                    Please select 'YES' to fill the below details ...
                </Row>
                <Row>
                    <Col className="my-2  ml-5" sm="4">
                        Reference Slip No
                    </Col>
                    <Col className="my-2">
                        : <b>{thisState.invoices.previousWeightResult.slipNo}</b>
                    </Col>
                </Row>
                <Row>
                    <Col className="my-2  ml-5" sm="4">
                        Customer Name
                    </Col>
                    <Col className="my-2">
                        : <b>{thisState.invoices.previousWeightResult.customersName}</b>
                    </Col>
                </Row>
                {thisState.invoices.previousWeightResult.gstin ?
                    <Row>
                        <Col className="my-2  ml-5" sm="4">
                            GSTIN
                        </Col>
                        <Col className="my-2">
                            : <b>{thisState.invoices.previousWeightResult.gstin}</b>
                        </Col>
                    </Row> : ""}
                {thisState.invoices.previousWeightResult.address1 ?
                    <Row>
                        <Col className="my-2  ml-5" sm="4">
                            Adreess line 1
                        </Col>
                        <Col className="my-2">
                            : <b>{thisState.invoices.previousWeightResult.address1}</b>
                        </Col>
                    </Row> : ""}
                {thisState.invoices.previousWeightResult.address2 ?
                    <Row>
                        <Col className="my-2  ml-5" sm="4">
                            Adreess line 2
                        </Col>
                        <Col className="my-2">
                            : <b>{thisState.invoices.previousWeightResult.address2}</b>
                        </Col>
                    </Row> : ""}
                <Row>
                    <Col className="my-2  ml-5" sm="4">
                        Vehicle No
                    </Col>
                    <Col className="my-2">
                        : <b>{thisState.invoices.previousWeightResult.vehicleNo}</b>
                    </Col>
                </Row>
                <Row>
                    <Col className="my-2  ml-5" sm="4">
                        Material
                    </Col>
                    <Col className="my-2">
                        : <b>{thisState.invoices.previousWeightResult.material}</b>
                    </Col>
                </Row>
                {thisState.invoices.previousWeightResult.unitPrice ?
                    <Row>
                        <Col className="my-2  ml-5" sm="4">
                            Unit Price
                        </Col>
                        <Col className="my-2">
                            : <b>{thisState.invoices.previousWeightResult.unitPrice}</b>
                        </Col>
                    </Row> : ""}
                <Row>
                    <Col className="my-2  ml-5" sm="4">
                        Quantity
                    </Col>
                    <Col className="my-2">
                        : <b>{thisState.invoices.previousWeightResult.nettWeight}</b>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="info"
                    onClick={() => {
                        thisState.invoices.previousWeightSelector = false;
                        thisState.invoices.reference.customersNameReference.value = [
                            {customerName: thisState.invoices.previousWeightResult.customersName}
                        ];
                        thisState.invoice.vehicleNo = thisState.invoices.previousWeightResult.vehicleNo;
                        thisState.invoices.reference.materialReference.value = [
                            {material: thisState.invoices.previousWeightResult.material}
                        ];
                        thisState.invoice.quantity = thisState.invoices.previousWeightResult.nettWeight;
                        thisState.invoices.preventFocus = true;
                        thisState.invoices.disable.vehicleNoDisabled = true;
                        thisState.invoices.disable.quantityDisabled = true;
                        if (thisState.invoices.previousWeightResult.unitPrice) {
                            thisState.invoice.unitPrice = thisState.invoices.previousWeightResult.unitPrice;
                        }
                        if (thisState.invoices.previousWeightResult.gstin) {
                            thisState.invoice.gstin = thisState.invoices.previousWeightResult.gstin;
                        }
                        if (thisState.invoices.previousWeightResult.address1) {
                            thisState.invoice.address1 = thisState.invoices.previousWeightResult.address1;
                        }
                        if (thisState.invoices.previousWeightResult.address2) {
                            thisState.invoice.address2 = thisState.invoices.previousWeightResult.address2;
                        }
                        thisState.setMyState(thisState);
                        thisState.calculateInvoiceAmount(thisState);
                    }}
                    ref={thisState.invoices.reference.previousWeightReference}
                >
                    YES
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        thisState.invoices.previousWeightSelector = false;
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
