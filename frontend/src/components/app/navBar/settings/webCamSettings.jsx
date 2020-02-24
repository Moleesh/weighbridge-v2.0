import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSync} from "@fortawesome/free-solid-svg-icons";

const WebCamSettings = props => {
    let thisState = props.preState;
    return (
        <Form>
            <Row className="pb-5">
                <Col>
                    <h4 className="text-center font-weight-bold">WebCam Settings</h4>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    WebCam Name
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        as="select"
                        value={thisState.settings.webCamSelect}
                        onChange={event => {
                            thisState.settings.webCamSelect = event.target.value;
                            thisState.webCam.details[0].name = event.target.value.split(" [")[0];
                            if (event.target.value.includes("[")) {
                                thisState.webCam.details[0].width = event.target.value.split("[")[1].split("*")[0];
                                thisState.webCam.details[0].height = event.target.value.split("[")[1].split("*")[1].split("]")[0];
                                thisState.setMyState(thisState);
                            }
                        }}
                    >
                        {thisState.settings.array.availableWebCams.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    WebCam X-Axis
                </Form.Label>
                <Col sm="9">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].x_Axis - 5 < 0) return;
                                thisState.webCam.details[0].x_Axis =
                                    thisState.webCam.details[0].x_Axis - 5;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.webCam.details[0].x_Axis}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].x_Axis + 5 > 10000) return;
                                thisState.webCam.details[0].x_Axis =
                                    thisState.webCam.details[0].x_Axis - 1 + 6;
                                thisState.setMyState(thisState);
                            }}
                        >
                            +
                        </button>
                    </div>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    WebCam Y-Axis
                </Form.Label>
                <Col sm="9">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].y_Axis - 5 < 0) return;
                                thisState.webCam.details[0].y_Axis =
                                    thisState.webCam.details[0].y_Axis - 5;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.webCam.details[0].y_Axis}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].y_Axis + 5 > 10000) return;
                                thisState.webCam.details[0].y_Axis =
                                    thisState.webCam.details[0].y_Axis - 1 + 6;
                                thisState.setMyState(thisState);
                            }}
                        >
                            +
                        </button>
                    </div>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    WebCam Width
                </Form.Label>
                <Col sm="9">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].width - 5 <= 0) return;
                                thisState.webCam.details[0].width =
                                    thisState.webCam.details[0].width - 5;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.webCam.details[0].width}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].width + 5 > 10000) return;
                                thisState.webCam.details[0].width =
                                    thisState.webCam.details[0].width - 1 + 6;
                                thisState.setMyState(thisState);
                            }}
                        >
                            +
                        </button>
                    </div>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    WebCam Height
                </Form.Label>
                <Col sm="9">
                    <div className="input-number">
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].height - 5 <= 0) return;
                                thisState.webCam.details[0].height =
                                    thisState.webCam.details[0].height - 5;
                                thisState.setMyState(thisState);
                            }}
                        >
                            -
                        </button>
                        <span>{thisState.webCam.details[0].height}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (thisState.webCam.details[0].height + 5 > 10000) return;
                                thisState.webCam.details[0].height =
                                    thisState.webCam.details[0].height - 1 + 6;
                                thisState.setMyState(thisState);
                            }}
                        >
                            +
                        </button>
                    </div>
                </Col>
            </Form.Group>
            <Button
                variant="warning"
                size="lg"
                className="mr-1"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/webCam/updateWebCam", {
                        method: "POST",
                        body: JSON.stringify(thisState.webCam.details[0]),
                        headers: {"content-type": "application/json"}
                    }).then(response => {
                        if (response.status === 200) {
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "WebCam Settings Update",
                                message: "WebCam Settings Successfully Updated."
                            });
                            thisState.setMyState(thisState);
                        } else throw Error(response.statusText);
                    }).catch(() => {
                        thisState.alerts.push({
                            id: new Date().getTime(),
                            type: "danger",
                            headline: "WebCam Settings Update",
                            message: "WebCam Settings Update Failed."
                        });
                    });
                }}
            >
                <FontAwesomeIcon icon={faEdit} className="mr-3"/>
                update WebCam Settings
            </Button>
            <Button
                variant="light"
                size="lg"
                onClick={() => {
                    fetch(thisState.INITIAL_URL + "/webCam/settingUpWebCam?webcam=" + thisState.webCam.details[0].name)
                        .then(response => {
                            if (response.status === 200) {
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "success",
                                    headline: "WebCam Settings Refreshed",
                                    message: "WebCam Settings Refreshed Successfully."
                                });
                                thisState.setMyState(thisState);
                            } else throw Error(response.statusText);
                        })
                        .catch(() => {
                        });
                }}
            >
                <FontAwesomeIcon icon={faSync} spin className="mr-3"/>
                Refresh WebCam Settings
            </Button>
        </Form>
    );
};

export default WebCamSettings;
