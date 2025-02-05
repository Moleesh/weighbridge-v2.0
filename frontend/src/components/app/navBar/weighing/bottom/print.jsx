import React from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import FileSaver from "file-saver";

const Print = props => {
    let thisState = props.preState;
    return (
        <Modal
            show={thisState.weighing.print}
            onHide={() => {
                fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else throw Error(response.statusText);
                }).then(result => {
                    return result;
                }).catch(() => {
                    return -1;
                }).then(result => {
                    thisState.weighing.disable.grossSelectorDisabled = false;
                    thisState.weighing.disable.tareSelectorDisabled = false;
                    thisState.weighing.disable.vehicleNoDisabled = false;
                    thisState.weighing.disable.customersNameDisabled = false;
                    thisState.weighing.disable.transporterNameDisabled = false;
                    thisState.weighing.disable.placeDisabled = false;
                    thisState.weighing.disable.materialDisabled = false;
                    thisState.weighing.disable.chargesDisabled = false;
                    thisState.weighing.disable.remarksDisabled = false;
                    thisState.weighing.disable.getWeightDisabled = false;
                    thisState.weighing.disable.saveDisabled = true;
                    thisState.weight.slipNo = result;
                    if (result === -1) {
                        thisState.weighing.disable.getWeightDisabled = true;
                        thisState.SETTING_DISABLED = true;
                    }
                    thisState.weight.vehicleNo = "";
                    thisState.weight.customersName = "";
                    thisState.weight.transporterName = "";
                    thisState.weight.place = ""; thisState.weighing.reference.placeReference.value = [
                        { place: "" }
                    ];
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
                    thisState.weighing.grossSelector = true;
                    thisState.weighing.tareSelector = false;
                    if (thisState.settings.manualEntry) {
                        thisState.weighing.disable.grossDetailsDisabled = false;
                        thisState.weighing.disable.tareDetailsWeightDisabled = false;
                    }
                    thisState.weighing.print = false;
                    thisState.weighing.disable.secondWeightDisabled = false;
                    thisState.setMyState(thisState);
                });
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Print </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        Do you want to print ?
                    </Form.Label>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="adam-button"
                    variant="primary"
                    onClick={() => {
                        if (thisState.settings.value.printerNameForWeighing === "get as .pdf File") {
                            fetch(thisState.INITIAL_URL + "/printer/getPrintWeightPDF", {
                                method: "POST",
                                body: JSON.stringify({
                                    weight: thisState.weight,
                                    printerName: thisState.settings.value.printerNameForWeighing,
                                    noOfCopies: thisState.settings.value.noOfCopiesForWeighing,
                                    printFormat: thisState.settings.value.printFormatForWeighing,
                                    weighbridgeName: thisState.settings.value.weighbridgeName,
                                    weighbridgeAddress:
                                        thisState.settings.value.weighbridgeAddress,
                                    footer: thisState.settings.value.footer
                                }),
                                headers: { "content-type": "application/json" }
                            }).then(response => {
                                if (response.status !== 200) {
                                    throw Error(response.statusText);
                                }
                                return response.blob();
                            }).then(blob => {
                                FileSaver.saveAs(blob, "weight.pdf");
                            });
                        } else {
                            fetch(thisState.INITIAL_URL + "/printer/printWeight", {
                                method: "POST",
                                body: JSON.stringify({
                                    weight: thisState.weight,
                                    printerName: thisState.settings.value.printerNameForWeighing,
                                    noOfCopies: thisState.settings.value.noOfCopiesForWeighing,
                                    printFormat: thisState.settings.value.printFormatForWeighing,
                                    weighbridgeName: thisState.settings.value.weighbridgeName,
                                    weighbridgeAddress:
                                        thisState.settings.value.weighbridgeAddress,
                                    footer: thisState.settings.value.footer
                                }),
                                headers: { "content-type": "application/json" }
                            }).then(response => {
                                if (response.status !== 200) {
                                    throw Error(response.statusText);
                                }
                            });
                        }
                        fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            return result;
                        }).catch(() => {
                            return -1;
                        }).then(result => {
                            thisState.weighing.disable.grossSelectorDisabled = false;
                            thisState.weighing.disable.tareSelectorDisabled = false;
                            thisState.weighing.disable.vehicleNoDisabled = false;
                            thisState.weighing.disable.customersNameDisabled = false;
                            thisState.weighing.disable.transporterNameDisabled = false;
                            thisState.weighing.disable.placeDisabled = false;
                            thisState.weighing.disable.materialDisabled = false;
                            thisState.weighing.disable.chargesDisabled = false;
                            thisState.weighing.disable.remarksDisabled = false;
                            thisState.weighing.disable.getWeightDisabled = false;
                            thisState.weighing.disable.saveDisabled = true;
                            thisState.weight.slipNo = result;
                            if (result === -1) {
                                thisState.weighing.disable.getWeightDisabled = true;
                                thisState.SETTING_DISABLED = true;
                            }
                            thisState.weight.vehicleNo = "";
                            thisState.weight.customersName = "";
                            thisState.weight.transporterName = "";
                            thisState.weight.place = ""; thisState.weighing.reference.placeReference.value = [
                                { place: "" }
                            ];
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
                            thisState.weighing.grossSelector = true;
                            thisState.weighing.tareSelector = false;
                            if (thisState.settings.manualEntry) {
                                thisState.weighing.disable.grossDetailsDisabled = false;
                                thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            }
                            thisState.weighing.print = false;
                            thisState.weighing.disable.secondWeightDisabled = false;
                            thisState.setMyState(thisState);
                        });
                    }}
                    ref={thisState.weighing.reference.printDialogReference}
                >
                    Print
                </Button>
                <Button
                    variant="info"
                    onClick={() => {
                        fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            return result;
                        }).catch(() => {
                            return -1;
                        }).then(result => {
                            thisState.weighing.disable.grossSelectorDisabled = false;
                            thisState.weighing.disable.tareSelectorDisabled = false;
                            thisState.weighing.disable.vehicleNoDisabled = false;
                            thisState.weighing.disable.customersNameDisabled = false;
                            thisState.weighing.disable.transporterNameDisabled = false;
                            thisState.weighing.disable.placeDisabled = false;
                            thisState.weighing.disable.materialDisabled = false;
                            thisState.weighing.disable.chargesDisabled = false;
                            thisState.weighing.disable.remarksDisabled = false;
                            thisState.weighing.disable.getWeightDisabled = false;
                            thisState.weighing.disable.saveDisabled = true;
                            thisState.weight.slipNo = result;
                            if (result === -1) {
                                thisState.weighing.disable.getWeightDisabled = true;
                                thisState.SETTING_DISABLED = true;
                            }
                            thisState.weight.vehicleNo = "";
                            thisState.weight.customersName = "";
                            thisState.weight.transporterName = "";
                            thisState.weight.place = ""; thisState.weighing.reference.placeReference.value = [
                                { place: "" }
                            ];
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
                            thisState.weighing.grossSelector = true;
                            thisState.weighing.tareSelector = false;
                            if (thisState.settings.manualEntry) {
                                thisState.weighing.disable.grossDetailsDisabled = false;
                                thisState.weighing.disable.tareDetailsWeightDisabled = false;
                            }
                            thisState.weighing.print = false;
                            thisState.setMyState(thisState)

                        });
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Print;
