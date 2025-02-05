import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const Customer = props => {
    let thisState = props.preState;
    return (
        <Form className="justify-content-center">
            <Row className="pb-2">
                <Col sm="2" />
                <Col sm="8" className="pl-3">
                    <h4 className="text-center font-weight-bold">Customer's Details</h4>
                </Col>
                <Col sm={2}>
                    <Row className="justify-content-center">
                        <Toggle
                            onClick={() => {
                                thisState.configuration.customer.unlock = !thisState.configuration.customer.unlock;
                                thisState.setMyState(thisState);
                            }}
                            on="ON"
                            off="OFF"
                            size="lg"
                            offstyle="danger"
                            active={thisState.configuration.customer.unlock}
                            recalculateOnResize={true}
                            disabled={thisState.SETTING_DISABLED}
                        />
                    </Row>
                </Col>
            </Row>
            <Form.Group>
                <Form.Control
                    className="text-center form-control"
                    type="text"
                    placeholder="Search in customer list..."
                    value={thisState.configuration.customer.filterText}
                    onChange={event => {
                        thisState.configuration.customer.filterText = event.target.value;
                        thisState.setMyState(thisState);
                    }}
                />
            </Form.Group>
            {thisState.configuration.customer.unlock ? (
                <Row>
                    {Object.keys(thisState.configuration.customer.template).map(key => (
                        <Col className="pb-2" key={key}>
                            <Form.Control
                                className="text-center form-control"
                                type="text"
                                name={key}
                                autoComplete="none"
                                value={thisState.configuration.customer.template[key]}
                                onChange={event => {
                                    thisState.configuration.customer.template[key] =
                                        event.target.value;
                                    thisState.setMyState(thisState);
                                }}
                            />
                        </Col>
                    ))}
                    <Col sm={1}>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                                let send = true;
                                Object.values(thisState.configuration.customer.template).map(
                                    value => {
                                        if (value === "") send = false;
                                        return null;
                                    }
                                );
                                if (send) {
                                    fetch(thisState.INITIAL_URL + "/customer/addUpdateCustomer", {
                                        method: "PUT",
                                        body: JSON.stringify(
                                            {
                                                ...thisState.configuration.customer.template,
                                                profile: thisState.PROFILE
                                            }
                                        ),
                                        headers: { "content-type": "application/json" }
                                    }).then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    }).then(result => {
                                        Object.keys(thisState.configuration.customer.template).map(
                                            key =>
                                                (thisState.configuration.customer.template[key] = "")
                                        );
                                        thisState.setMyState(thisState).then(() => {
                                            thisState.configuration.customer.list.push(result);
                                            thisState.setMyState(thisState);
                                        });
                                    });
                                } else {
                                    thisState.alerts.push({
                                        id: new Date().getTime(),
                                        type: "danger",
                                        headline: "Empty fields",
                                        message: "Found empty fields while adding customer details"
                                    });
                                    thisState.setMyState(thisState);
                                }
                            }}
                            className="btn btn-success pull-right"
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
            ) : (
                ""
            )}
            <Table hover size="sm">
                <thead>
                    <tr>
                        {thisState.configuration.customer.header.map(item => (
                            <th key={item} className="centre">
                                {item}
                            </th>
                        ))}
                        {thisState.configuration.customer.unlock ? <th /> : null}
                    </tr>
                </thead>
                <tbody>
                    {thisState.configuration.customer.list.map((item, index) => (
                        <tr key={index} className="eachRow">
                            {Object.values(item).toString().replaceAll(",", ".").indexOf(thisState.configuration.customer.filterText) ===
                                -1 ? null : (
                                <React.Fragment>
                                    {Object.keys(thisState.configuration.customer.template).map(key => (
                                        <td key={key + "_" + item["id"]}>
                                            <Col>
                                                <Form.Control
                                                    autoComplete="none"
                                                    className="text-center form-control reportInputs"
                                                    disabled={
                                                        !(
                                                            thisState.configuration.customer.unlock &&
                                                            thisState.configuration.customer.editable
                                                        )
                                                    }
                                                    type="text"
                                                    name={key}
                                                    value={item[key] !== null ? item[key] : ""}
                                                    onChange={event => {
                                                        thisState.configuration.customer.list[index][key] =
                                                            event.target.value;
                                                        thisState.setMyState(thisState);
                                                    }}
                                                />
                                            </Col>
                                        </td>
                                    ))}
                                    {thisState.configuration.customer.unlock ? (
                                        <td>
                                            <Row>
                                                {thisState.configuration.customer.editable ? (
                                                    <Col>
                                                        <Button
                                                            className="btn-min-width"
                                                            variant="warning"
                                                            onClick={() => {
                                                                fetch(
                                                                    thisState.INITIAL_URL + "/customer/addUpdateCustomer",
                                                                    {
                                                                        method: "PUT",
                                                                        body: JSON.stringify(
                                                                            thisState.configuration.customer.list[index]
                                                                        ),
                                                                        headers: {
                                                                            "content-type": "application/json"
                                                                        }
                                                                    }
                                                                ).then(response => {
                                                                    if (response.status === 200) {
                                                                        return response.json();
                                                                    } else throw Error(response.statusText);
                                                                });
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </Col>
                                                ) : (
                                                    ""
                                                )}
                                                <Col>
                                                    <Button
                                                        className="btn-min-width"
                                                        variant="danger"
                                                        onClick={() => {
                                                            fetch(
                                                                thisState.INITIAL_URL +
                                                                "/customer/deleteCustomer?id=" +
                                                                thisState.configuration.customer.list[index].id,
                                                                {
                                                                    method: "DELETE"
                                                                }
                                                            ).then(response => {
                                                                if (response.status === 200) {
                                                                    thisState.configuration.customer.list.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                    thisState.setMyState(thisState);
                                                                } else throw Error(response.statusText);
                                                            });
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    ) : null}
                                </React.Fragment>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>
    );
};

export default Customer;
