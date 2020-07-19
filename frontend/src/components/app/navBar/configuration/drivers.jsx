import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const Drivers = props => {
    let thisState = props.preState;
    return (
        <Form className="justify-content-center ">
            <Row className="pb-2">
                <Col sm="2"/>
                <Col sm="8" className="pl-3">
                    <h4 className="text-center font-weight-bold">Customer's Details</h4>
                </Col>
                <Col sm="2">
                    <Row className="justify-content-center">
                        <Toggle
                            onClick={() => {
                                thisState.configuration.driver.unlock = !thisState.configuration.driver.unlock;
                                thisState.setMyState(thisState);
                            }}
                            on="ON"
                            off="OFF"
                            size="lg"
                            offstyle="danger"
                            active={thisState.configuration.driver.unlock}
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
                    placeholder="Search in driver list..."
                    value={thisState.configuration.driver.filterText}
                    onChange={event => {
                        thisState.configuration.driver.filterText = event.target.value;
                        thisState.setMyState(thisState);
                    }}
                />
            </Form.Group>
            {thisState.configuration.driver.unlock ? (
                <Form.Row>
                    {Object.keys(thisState.configuration.driver.template).map(key => (
                        <Col className="pb-2" key={key}>
                            <Form.Control
                                className="text-center form-control"
                                type="text"
                                name={key}
                                autoComplete="none"
                                value={thisState.configuration.driver.template[key]}
                                onChange={event => {
                                    thisState.configuration.driver.template[key] =
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
                                Object.values(thisState.configuration.driver.template).map(
                                    value => {
                                        if (value === "") send = false;
                                        return null;
                                    }
                                );
                                if (send) {
                                    fetch(thisState.INITIAL_URL + "/driver/addUpdateDriver", {
                                        method: "PUT",
                                        body: JSON.stringify(
                                            {
                                                ...thisState.configuration.driver.template,
                                                profile: thisState.PROFILE
                                            }
                                        ),
                                        headers: {"content-type": "application/json"}
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                return response.json();
                                            } else throw Error(response.statusText);
                                        })
                                        .then(result => {
                                            Object.keys(thisState.configuration.driver.template).map(
                                                key =>
                                                    (thisState.configuration.driver.template[key] = "")
                                            );
                                            thisState.setMyState(thisState).then(() => {
                                                thisState.configuration.driver.list.push(result);

                                                thisState.setMyState(thisState);
                                            });
                                        })
                                        .catch(() => {
                                        });
                                } else {
                                    thisState.alerts.push({
                                        id: new Date().getTime(),
                                        type: "danger",
                                        headline: "Empty fields",
                                        message: "Found empty fields while adding driver details"
                                    });
                                    thisState.setMyState(thisState);
                                }
                            }}
                            className="btn btn-success pull-right"
                        >
                            Add
                        </Button>
                    </Col>
                </Form.Row>
            ) : (
                ""
            )}
            <Table hover size="sm">
                <thead>
                <tr>
                    {thisState.configuration.driver.header.map(item => (
                        <th key={item} className="centre">
                            {item}
                        </th>
                    ))}
                    {thisState.configuration.driver.unlock ? <th/> : null}
                </tr>
                </thead>
                <tbody>
                {thisState.configuration.driver.list.map((item, index) => (
                    <tr key={index} className="eachRow">
                        {Object.values(item)
                            .toString()
                            .replace(",", ".")
                            .indexOf(thisState.configuration.driver.filterText) ===
                        -1 ? null : (
                            <React.Fragment>
                                {Object.keys(item)
                                    .filter(key => key !== "id" && key !== "profile")
                                    .map(key => (
                                        <td key={key + "_" + item["id"]}>
                                            <Col>
                                                <Form.Control
                                                    autoComplete="none"
                                                    className="text-center form-control reportInputs"
                                                    disabled={
                                                        !(
                                                            thisState.configuration.driver.unlock &&
                                                            thisState.configuration.driver.editable
                                                        )
                                                    }
                                                    type="text"
                                                    name={key}
                                                    value={item[key] !== null ? item[key] : ""}
                                                    onChange={event => {
                                                        thisState.configuration.driver.list[index][key] =
                                                            event.target.value;
                                                        thisState.setMyState(thisState);
                                                    }}
                                                />
                                            </Col>
                                        </td>
                                    ))}
                                {thisState.configuration.driver.unlock ? (
                                    <td>
                                        <Row>
                                            {thisState.configuration.driver.editable ? (
                                                <Col>
                                                    <Button
                                                        block
                                                        className="btn-min-width"
                                                        variant="warning"
                                                        onClick={() => {
                                                            fetch(
                                                                thisState.INITIAL_URL + "/driver/addUpdateDriver",
                                                                {
                                                                    method: "PUT",
                                                                    body: JSON.stringify(
                                                                        thisState.configuration.driver.list[index]
                                                                    ),
                                                                    headers: {
                                                                        "content-type": "application/json"
                                                                    }
                                                                }
                                                            )
                                                                .then(response => {
                                                                    if (response.status === 200) {
                                                                        return response.json();
                                                                    } else throw Error(response.statusText);
                                                                })
                                                                .then(() => {
                                                                })
                                                                .catch(() => {
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
                                                    block
                                                    className="btn-min-width"
                                                    variant="danger"
                                                    onClick={() => {
                                                        fetch(
                                                            thisState.INITIAL_URL +
                                                            "/driver/deleteDriver?id=" +
                                                            thisState.configuration.driver.list[index].id,
                                                            {
                                                                method: "DELETE"
                                                            }
                                                        )
                                                            .then(response => {
                                                                if (response.status === 200) {
                                                                    thisState.configuration.driver.list.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                    thisState.setMyState(thisState);
                                                                } else throw Error(response.statusText);
                                                            })
                                                            .catch(() => {
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

export default Drivers;
