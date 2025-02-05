import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Menu, MenuItem, Typeahead } from "react-bootstrap-typeahead";


const ColumnTwo = props => {
    let thisState = props.preState;
    return (
        <Col sm="4" className="mt-2">
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Material
                </Form.Label>
                <Col sm="6">
                    <Typeahead
                        highlightOnlyResult
                        id="material"
                        shouldSelect={true}
                        filterBy={["materialId", "material"]}
                        labelKey={option => option.material}
                        renderMenu={(results, menuProps) =>
                            results.length !== 0 ? (
                                <Menu {...menuProps} key="materialMenu">
                                    {results.map((result, index) => (
                                        <MenuItem
                                            option={result}
                                            position={index}
                                            key={(result.id ? result.id : -1).toString()}
                                        >
                                            {result.material}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            ) : null
                        }
                        options={thisState.configuration.material.list}
                        maxHeight={"200px"}
                        selected={thisState.invoices.reference.materialReference.value}
                        disabled={thisState.invoices.disable.materialDisabled}
                        open={thisState.invoices.reference.materialReference.open}
                        onChange={event => {
                            thisState.invoices.reference.materialReference.value =
                                event.length === 0
                                    ? [
                                        {
                                            material: thisState.invoices.reference.materialReference.reference.current.getInput().value
                                        }
                                    ]
                                    : event;
                            thisState.invoice.material = thisState.invoices.reference.materialReference.value[0].material;
                            let temp = thisState.configuration.material.list
                                .filter((material) => material.material === thisState.invoice.material);
                            if (temp.length === 1) {
                                thisState.invoice.unitPrice = temp[0].unitPrice;
                            }
                            thisState.setMyState(thisState);
                        }}
                        ref={thisState.invoices.reference.materialReference.reference}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'driverName', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoices.reference.materialReference.open = false;
                                thisState.invoices.reference.materialReference.value[0].material =
                                    thisState.invoices.reference.materialReference.value[0].material.toUpperCase()
                                thisState.invoice.material =
                                    thisState.invoices.reference.materialReference.value[0].material;
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'unitPrice', false);
                            }
                        }}
                        onFocus={() => {
                            thisState.invoices.reference.materialReference.open = undefined;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Unit Price
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled={thisState.invoices.disable.unitPriceDisabled}
                        ref={thisState.invoices.reference.unitPriceReference}
                        value={
                            thisState.invoice.unitPrice === ""
                                ? 0
                                : thisState.invoice.unitPrice
                        }
                        onChange={event => {
                            thisState.invoice.unitPrice = (event.target.value.match("[0-9.]+") || []).pop() || "";
                            thisState.invoice.unitPrice = thisState.invoice.unitPrice.split(".").slice(0, 2).join(".");
                            thisState.setMyState(thisState);
                            thisState.calculateInvoiceAmount(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'material', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.switchFocus(thisState, 'invoices', 'quantity', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Quantity
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-right"
                        disabled={thisState.invoices.disable.quantityDisabled}
                        ref={thisState.invoices.reference.quantityReference}
                        value={
                            thisState.invoice.quantity === ""
                                ? 0
                                : thisState.invoice.quantity
                        }
                        onChange={event => {
                            thisState.invoice.quantity = (event.target.value.match("[0-9]*\\.?[0-9]*") || []).pop() || "";
                            thisState.setMyState(thisState);
                            thisState.calculateInvoiceAmount(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'unitPrice', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.switchFocus(thisState, 'invoices', 'address1', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Address Line 1
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.invoices.disable.address1Disabled}
                        ref={thisState.invoices.reference.address1Reference}
                        value={thisState.invoice.address1}
                        autoComplete="none"
                        onChange={event => {
                            thisState.invoice.address1 = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'quantity', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoice.address1 = thisState.invoice.address1.toUpperCase();
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'address2', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="6">
                    Address Line 2
                </Form.Label>
                <Col sm="6">
                    <Form.Control
                        className="text-center"
                        disabled={thisState.invoices.disable.address2Disabled}
                        autoComplete="none"
                        ref={thisState.invoices.reference.address2Reference}
                        value={thisState.invoice.address2}
                        onChange={event => {
                            thisState.invoice.address2 = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'address1', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoice.address2 = thisState.invoice.address2.toUpperCase();
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'timeOfArrival', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}> {thisState.settings.hideFields ?
                <Col sm="6">
                    <Form.Check
                        type="checkbox"
                        label=" Time Of Arrival (Approx)"
                        checked={thisState.settings.value.hideTimeOfArrival}
                        onChange={event => {
                            thisState.settings.value.hideTimeOfArrival = event.target.checked;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
                :
                <Form.Label column sm="6" className={thisState.settings.value.hideTimeOfArrival ? "hide" : ""}>
                    Time Of Arrival (Approx)
                </Form.Label>
            }
                <Col sm="6">
                    <Form.Control
                        className={thisState.settings.value.hideTimeOfArrival ? "hide" : "text-center"}
                        disabled={thisState.invoices.disable.timeOfArrivalDisabled || thisState.settings.value.hideTimeOfArrival}
                        autoComplete="none"
                        ref={thisState.invoices.reference.timeOfArrivalReference}
                        value={thisState.invoice.timeOfArrival}
                        onChange={event => {
                            thisState.invoice.timeOfArrival = event.target.value;
                            thisState.setMyState(thisState);
                        }}
                        onKeyDown={event => {
                            if (event.key === "Tab" && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'address2', true);
                            } else if (event.key === "Enter" || event.key === "Tab") {
                                thisState.invoice.timeOfArrival = thisState.invoice.timeOfArrival.toUpperCase();
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'modeOfPayment', false);
                            }
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                {thisState.settings.hideFields ?
                    <Col sm="6">
                        <Form.Check
                            type="checkbox"
                            label="Mode Of Payment"
                            checked={thisState.settings.value.hideModeOfPayment}
                            onChange={event => {
                                thisState.settings.value.hideModeOfPayment = event.target.checked;
                                thisState.setMyState(thisState);
                            }}
                        />
                    </Col>
                    :
                    <Form.Label column sm="6" className={thisState.settings.value.hideModeOfPayment ? "hide" : ""}>
                        Mode Of Payment
                    </Form.Label>
                }
                <Col sm="6">
                    <Typeahead
                        className={thisState.settings.value.hideModeOfPayment ? "hide" : ""}
                        highlightOnlyResult
                        id="modeOfPayment"
                        shouldSelect={true}
                        options={thisState.configuration.modeOfPayment.list}
                        maxHeight={"200px"}
                        selected={thisState.invoices.reference.modeOfPaymentReference.value}
                        disabled={thisState.invoices.disable.modeOfPaymentDisabled || thisState.settings.value.hideModeOfPayment}
                        open={thisState.invoices.reference.modeOfPaymentReference.open}
                        onChange={event => {
                            thisState.invoices.reference.modeOfPaymentReference.value = event.length === 0 ? [thisState.invoices.reference.modeOfPaymentReference.reference.current.getInput().value] : event;
                            thisState.invoice.modeOfPayment = thisState.invoices.reference.modeOfPaymentReference.value[0];
                            thisState.setMyState(thisState);
                        }}
                        ref={thisState.invoices.reference.modeOfPaymentReference.reference}
                        onKeyDown={event => {
                            if (event.keyCode === 9 && event.shiftKey) {
                                thisState.switchFocus(thisState, 'invoices', 'timeOfArrival', true);
                            } else if (event.keyCode === 13 || event.keyCode === 9) {
                                thisState.invoices.reference.modeOfPaymentReference.open = false;
                                thisState.invoices.reference.modeOfPaymentReference.value[0] = thisState.invoices.reference.modeOfPaymentReference.value[0].toUpperCase()
                                thisState.invoice.modeOfPayment = thisState.invoices.reference.modeOfPaymentReference.value[0];
                                thisState.setMyState(thisState);
                                thisState.switchFocus(thisState, 'invoices', 'save', false);
                            }
                        }}
                        onFocus={() => {
                            thisState.invoices.reference.modeOfPaymentReference.open = undefined;
                            thisState.setMyState(thisState);
                        }}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ColumnTwo;
