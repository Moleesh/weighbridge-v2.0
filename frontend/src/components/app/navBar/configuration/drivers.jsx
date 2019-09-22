import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const Drivers = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Form className="justify-content-center ">
            <Row className="pb-2">
                <Col sm="2"/>
                <Col sm="8" className="pl-3">
                    <h4 className="text-center font-weight-bold">Driver Details</h4>
                </Col>
                <Col sm="2">
                    <Row className="justify-content-center">
                        <Toggle
                            onClick={() => {
                                thisState.configuration.drivers.unlock = !thisState
                                    .configuration.drivers.unlock;
                                thisState.setMyState(thisState);
                            }}
                            on="ON"
                            off="OFF"
                            size="lg"
                            offstyle="danger"
                            active={thisState.configuration.drivers.unlock}
                            recalculateOnResize={true}
                        />
                    </Row>
                </Col>
            </Row>
            <Form.Group>
                <Form.Control
                    className="text-center form-control"
                    type="text"
                    placeholder="Search..."
                    value={thisState.configuration.drivers.filterText}
                    onChange={event => {
                        thisState.configuration.drivers.filterText = event.target.value;
                        thisState.setMyState(thisState);
                    }}
                />
            </Form.Group>
            {thisState.configuration.drivers.unlock ? (
                <Form.Row>
                    {Object.keys(thisState.configuration.drivers.template).map(key => (
                        <Col className="pb-2" key={key}>
                            <Form.Control
                                className="text-center form-control"
                                type="text"
                                name={key}
                                autoComplete="off"
                                value={thisState.configuration.drivers.template[key]}
                                onChange={event => {
                                    thisState.configuration.drivers.template[key] =
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
                                Object.values(thisState.configuration.drivers.template).map(
                                    value => {
                                        if (value === "") send = false;
                                        return null;
                                    }
                                );
                                if (send) { // noinspection DuplicatedCode
                                    fetch(thisState.INITIAL_URL + "/addUpdateDrivers", {
                                        method: "PUT",
                                        body: JSON.stringify(
                                            thisState.configuration.drivers.template
                                        ),
                                        headers: {"content-type": "application/json"}
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                return response.json();
                                            } else throw Error(response.statusText);
                                        })
                                        .then(result => {
                                            Object.keys(thisState.configuration.drivers.template).map(
                                                key =>
                                                    (thisState.configuration.drivers.template[key] = "")
                                            );
                                            thisState.setMyState(thisState).then(() => {
                                                thisState.configuration.drivers.list.push(result);

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
                                        message: "Found empty fileds while adding driver details"
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
                    {thisState.configuration.drivers.header.map(item => (
                        <th key={item} className="centre">
                            {item}
                        </th>
                    ))}
                    {thisState.configuration.drivers.unlock ? <th/> : null}
                </tr>
                </thead>
                <tbody>
                {thisState.configuration.drivers.list.map((item, index) => (
                    <tr key={index} className="eachRow">
                        {Object.values(item)
                            .toString()
                            .replace(",", ".")
                            .indexOf(thisState.configuration.drivers.filterText) ===
                        -1 ? null : (
                            <React.Fragment>
                                {Object.keys(item)
                                    .filter(key => key !== "id")
                                    .map(key => (
                                        <td key={key + "" + item[key]}>
                                            <Col>
                                                <Form.Control
                                                    autoComplete="off"
                                                    className="text-center form-control reportInputs"
                                                    disabled={
                                                        !(
                                                            thisState.configuration.material.unlock &&
                                                            thisState.configuration.material.editable
                                                        )
                                                    }
                                                    type="text"
                                                    name={key}
                                                    id={"driver_" + key + "_" + item["id"]}
                                                    value={item[key] !== null ? item[key] : ""}
                                                    onChange={event => {
                                                        thisState.configuration.drivers.list[index][key] =
                                                            event.target.value;
                                                        thisState.setMyState(thisState);
                                                    }}
                                                />
                                            </Col>
                                        </td>
                                    ))}
                                {thisState.configuration.drivers.unlock ? (
                                    <td>
                                        <Row>
                                            {thisState.configuration.drivers.editable ? (
                                                <Col>
                                                    <Button
                                                        block
                                                        variant="warning"
                                                        onClick={() => {
                                                            fetch(
                                                                thisState.INITIAL_URL + "/addUpdateDrivers",
                                                                {
                                                                    method: "PUT",
                                                                    body: JSON.stringify(
                                                                        thisState.configuration.drivers.list[
                                                                            index
                                                                            ]
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
                                                    variant="danger"
                                                    onClick={() => {
                                                        fetch(
                                                            thisState.INITIAL_URL +
                                                            "/deleteDrivers?id=" +
                                                            thisState.configuration.drivers.list[index]
                                                                .id,
                                                            {
                                                                method: "DELETE"
                                                            }
                                                        )
                                                            .then(response => {
                                                                if (response.status === 200) {
                                                                    thisState.configuration.drivers.list.splice(
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
