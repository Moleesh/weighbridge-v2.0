import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const Material = props => {
    let thisState = props.preState;
    return (
        <Form className="justify-content-center ">
            <Row className="pb-2">
                <Col sm="2"/>
                <Col sm="8" className="pl-3">
                    <h4 className="text-center font-weight-bold">Material</h4>
                </Col>
                <Col sm={2}>
                    <Row className="justify-content-center">
                        <Toggle
                            onClick={() => {
                                thisState.configuration.material.unlock = !thisState.configuration.material.unlock;
                                thisState.setMyState(thisState);
                            }}
                            on="ON"
                            off="OFF"
                            size="lg"
                            offstyle="danger"
                            active={thisState.configuration.material.unlock}
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
                    placeholder="Search in material list ..."
                    value={thisState.configuration.material.filterText}
                    onChange={event => {
                        thisState.configuration.material.filterText = event.target.value;
                        thisState.setMyState(thisState);
                    }}
                />
            </Form.Group>

            {thisState.configuration.material.unlock ? (
                <Form.Row>
                    {Object.keys(thisState.configuration.material.template).map(key => (
                        <Col className="pb-2" key={key}>
                            <Form.Control
                                className="text-center form-control"
                                type="text"
                                name={key}
                                autoComplete="off"
                                value={thisState.configuration.material.template[key]}
                                onChange={event => {
                                    thisState.configuration.material.template[key] =
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
                                Object.values(thisState.configuration.material.template).map(
                                    value => {
                                        if (value === "") send = false;
                                        return null;
                                    }
                                );
                                if (send) {
                                    fetch(thisState.INITIAL_URL + "/material/addUpdateMaterial", {
                                        method: "PUT",
                                        body: JSON.stringify(
                                            {
                                                ...thisState.configuration.material.template,
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
                                            Object.keys(
                                                thisState.configuration.material.template
                                            ).map(
                                                key =>
                                                    (thisState.configuration.material.template[key] = "")
                                            );
                                            thisState.setMyState(thisState).then(() => {
                                                thisState.configuration.material.list.push(result);

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
                                        message: "Found empty fields while adding material"
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
                    {thisState.configuration.material.header.map(item => (
                        <th key={item} className="justify-content-center">
                            {item}
                        </th>
                    ))}
                    {thisState.configuration.material.unlock ? <th/> : null}
                </tr>
                </thead>
                <tbody>
                {thisState.configuration.material.list.map((item, index) => (
                    <tr key={index} className="eachRow">
                        {Object.values(item)
                            .toString()
                            .replace(",", ".")
                            .indexOf(thisState.configuration.material.filterText) ===
                        -1 ? null : (
                            <React.Fragment>
                                {Object.keys(item)
                                    .filter(key => key !== "id" && key !== "profile")
                                    .map(key => (
                                        <td key={key + "_" + item["id"]}>
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
                                                    value={item[key] !== null ? item[key] : ""}
                                                    onChange={event => {
                                                        thisState.configuration.material.list[index][
                                                            key
                                                            ] = event.target.value;
                                                        thisState.setMyState(thisState);
                                                    }}
                                                />
                                            </Col>
                                        </td>
                                    ))}
                                {thisState.configuration.material.unlock ? (
                                    <td>
                                        <Row>
                                            {thisState.configuration.material.editable ? (
                                                <Col>
                                                    <Button
                                                        block
                                                        variant="warning"
                                                        onClick={() => {
                                                            fetch(
                                                                thisState.INITIAL_URL + "/material/addUpdateMaterial",
                                                                {
                                                                    method: "PUT",
                                                                    body: JSON.stringify(
                                                                        thisState.configuration.material.list[index]
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
                                                            "/material/deleteMaterial?id=" +
                                                            thisState.configuration.material.list[index]
                                                                .id,
                                                            {
                                                                method: "DELETE"
                                                            }
                                                        )
                                                            .then(response => {
                                                                if (response.status === 200) {
                                                                    thisState.configuration.material.list.splice(
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

export default Material;
