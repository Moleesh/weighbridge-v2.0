import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const Place = props => {
    let thisState = props.preState;
    return (
        <Form className="justify-content-center">
            <Row className="pb-2">
                <Col sm="2" />
                <Col sm="8" className="pl-3">
                    <h4 className="text-center font-weight-bold">Places</h4>
                </Col>
                <Col sm="2">
                    <Row className="justify-content-center">
                        <Toggle
                            onClick={() => {
                                thisState.configuration.place.unlock = !thisState.configuration.place.unlock;
                                thisState.setMyState(thisState);
                            }}
                            on="ON"
                            off="OFF"
                            size="lg"
                            offstyle="danger"
                            active={thisState.configuration.place.unlock}
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
                    placeholder="Search in place list..."
                    value={thisState.configuration.place.filterText}
                    onChange={event => {
                        thisState.configuration.place.filterText = event.target.value;
                        thisState.setMyState(thisState);
                    }}
                />
            </Form.Group>
            {thisState.configuration.place.unlock ? (
                <Row>
                    {Object.keys(thisState.configuration.place.template).map(key => (
                        <Col className="pb-2" key={key}>
                            <Form.Control
                                className="text-center form-control"
                                type="text"
                                name={key}
                                autoComplete="none"
                                value={thisState.configuration.place.template[key]}
                                onChange={event => {
                                    thisState.configuration.place.template[key] =
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
                                Object.values(thisState.configuration.place.template).map(
                                    value => {
                                        if (value === "") send = false;
                                        return null;
                                    }
                                );
                                if (send) {
                                    fetch(thisState.INITIAL_URL + "/place/addUpdatePlace", {
                                        method: "PUT",
                                        body: JSON.stringify(
                                            {
                                                ...thisState.configuration.place.template,
                                                profile: thisState.PROFILE
                                            }
                                        ),
                                        headers: { "content-type": "application/json" }
                                    }).then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    }).then(result => {
                                        Object.keys(thisState.configuration.place.template).map(
                                            key =>
                                                (thisState.configuration.place.template[key] = "")
                                        );
                                        thisState.setMyState(thisState).then(() => {
                                            thisState.configuration.place.list.push(result);

                                            thisState.setMyState(thisState);
                                        });
                                    });
                                } else {
                                    thisState.alerts.push({
                                        id: new Date().getTime(),
                                        type: "danger",
                                        headline: "Empty fields",
                                        message: "Found empty fields while adding place details"
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
                        {thisState.configuration.place.header.map(item => (
                            <th key={item} className="centre">
                                {item}
                            </th>
                        ))}
                        {thisState.configuration.place.unlock ? <th /> : null}
                    </tr>
                </thead>
                <tbody>
                    {thisState.configuration.place.list.map((item, index) => (
                        <tr key={index} className="eachRow">
                            {Object.values(item).toString().replaceAll(",", ".").indexOf(thisState.configuration.place.filterText) ===
                                -1 ? null : (
                                <React.Fragment>
                                    {Object.keys(thisState.configuration.place.template).map(key => (
                                        <td key={key + "_" + item["id"]}>
                                            <Col>
                                                <Form.Control
                                                    autoComplete="none"
                                                    className="text-center form-control reportInputs"
                                                    disabled={
                                                        !(
                                                            thisState.configuration.place.unlock &&
                                                            thisState.configuration.place.editable
                                                        )
                                                    }
                                                    type="text"
                                                    name={key}
                                                    value={item[key] !== null ? item[key] : ""}
                                                    onChange={event => {
                                                        thisState.configuration.place.list[index][key] =
                                                            event.target.value;
                                                        thisState.setMyState(thisState);
                                                    }}
                                                />
                                            </Col>
                                        </td>
                                    ))}
                                    {thisState.configuration.place.unlock ? (
                                        <td>
                                            <Row>
                                                {thisState.configuration.place.editable ? (
                                                    <Col>
                                                        <Button
                                                            className="btn-min-width"
                                                            variant="warning"
                                                            onClick={() => {
                                                                fetch(
                                                                    thisState.INITIAL_URL + "/place/addUpdatePlace",
                                                                    {
                                                                        method: "PUT",
                                                                        body: JSON.stringify(
                                                                            thisState.configuration.place.list[index]
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
                                                                "/place/deletePlace?id=" +
                                                                thisState.configuration.place.list[index].id,
                                                                {
                                                                    method: "DELETE"
                                                                }
                                                            ).then(response => {
                                                                if (response.status === 200) {
                                                                    thisState.configuration.place.list.splice(
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

export default Place;
