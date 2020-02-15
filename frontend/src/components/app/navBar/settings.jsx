import React from "react";
import {Button, Col, Nav, Row, Tab} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRetweet, faSync, faWrench} from "@fortawesome/free-solid-svg-icons";

import GeneralSettings from "./settings/generalSettings";
import WebCamSettings from "./settings/webCamSettings";
import PrinterSettings from "./settings/printerSettings";
import IndicatorSettings from "./settings/indicatorSettings";
import DisplaySettings from "./settings/displaySettings";
import AdminSettings from "./settings/adminSettings";

const Settings = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Tab.Container defaultActiveKey="generalSettings">
            <Row>
                <Col sm="2" className="pt-5">
                    <Nav variant="pills" className="flex-column">
                        <h5 className="font-weight-bold pb-3">Settings</h5>
                        <Nav.Item>
                            <Nav.Link eventKey="generalSettings">General Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cameraSettings">Camera Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="printerSettings">Printer Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="indicatorSettings">
                                Indicator Settings
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="displaySettings">Display Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="adminSettings">Admin Settings</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm="10" className="pt-2">
                    <Tab.Content>
                        <Tab.Pane eventKey="generalSettings">
                            <GeneralSettings preState={thisState} key="generalSettings" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="cameraSettings">
                            <WebCamSettings preState={thisState} key="cameraSettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="printerSettings">
                            <PrinterSettings preState={thisState} key="printerSettings" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="indicatorSettings">
                            <IndicatorSettings preState={thisState} key="indicatorSettings" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="displaySettings">
                            <DisplaySettings preState={thisState} key="displaySettings" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="adminSettings">
                            <AdminSettings preState={thisState} key="adminSettings" />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            <Row />
            <div className="footer-copyright text-center py-3 ">
                <footer>
                    <Button
                        variant="success"
                        size="lg"
                        className="mr-3"
                        onClick={() => {
                            fetch(thisState.INITIAL_URL + "/saveAllSettings", {
                                method: "PUT",
                                body: JSON.stringify(thisState.setting.value),
                                headers: { "content-type": "application/json" }
                            })
                                .then(response => {
                                    if (response.status === 200) {
                                        thisState.alerts.push({
                                            id: new Date().getTime(),
                                            type: "success",
                                            headline: "Setting Updated",
                                            message: "Setting Updated successfully."
                                        });
                                        thisState.setMyState(thisState);
                                    } else throw Error(response.statusText);
                                })
                                .catch(() => {
                                    thisState.alerts.push({
                                        id: new Date().getTime(),
                                        type: "danger",
                                        headline: "Setting Updated",
                                        message: "Setting Updated Failed."
                                    });
                                    thisState.setMyState(thisState);
                                });
                        }}
                    >
                        <FontAwesomeIcon icon={faWrench} className="mr-3" />
                        UPDATE
                  </Button>
                    <Button
                        variant="info"
                        size="lg"
                        className="mr-3"
                        onClick={() => {
                            // noinspection DuplicatedCode
                            fetch(thisState.INITIAL_URL + "/getAllSettings")
                                .then(response => {
                                    if (response.status === 200) {
                                        return response.json();
                                    } else throw Error(response.statusText);
                                })
                                .then(result => {
                                    thisState.setting.value = result;
                                    if (
                                        thisState.setting.array.availableCameras.indexOf(
                                            thisState.setting.value.cameraName
                                        ) === -1
                                    ) {
                                        thisState.setting.array.availableCameras.push(
                                            thisState.setting.value.cameraName
                                        );
                                    }
                                    if (
                                        thisState.setting.array.availablePrinters.indexOf(
                                            thisState.setting.value.printerName
                                        ) === -1
                                    ) {
                                        thisState.setting.array.availablePrinters.push(
                                            thisState.setting.value.printerName
                                        );
                                    }
                                    if (
                                        thisState.setting.array.availableCOMPorts.indexOf(
                                            thisState.setting.value.indicatorCOMPort
                                        ) === -1
                                    ) {
                                        thisState.setting.array.availableCOMPorts.push(
                                            thisState.setting.value.indicatorCOMPort
                                        );
                                    }
                                    if (
                                        thisState.setting.array.availableCOMPorts.indexOf(
                                            thisState.setting.value.displayCOMPort
                                        ) === -1
                                    ) {
                                        thisState.setting.array.availableCOMPorts.push(
                                            thisState.setting.value.displayCOMPort
                                        );
                                    }
                                    thisState.alerts.push({
                                        id: new Date().getTime(),
                                        type: "success",
                                        headline: "Setting Refresh",
                                        message: "Setting Refresh Successfully."
                                    });
                                    thisState.setMyState(thisState);
                                })
                                .catch(() => {
                                });
                        }}
                    >
                        <FontAwesomeIcon icon={faSync} spin className="mr-3" />
                        Refresh
                  </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                            // noinspection DuplicatedCode
                            clearInterval(thisState._WEIGHT);
                            thisState._WEIGHT = setInterval(() => {
                                fetch(thisState.INITIAL_URL + "/getNextWeight")
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    })
                                    .then(result => {
                                        thisState.setMyState({
                                            WEIGHT: result
                                        });
                                    })
                                    .catch(() => {
                                        thisState.setMyState({
                                            WEIGHT: "-1"
                                        });
                                    });
                            }, thisState.setting.value.REFRESH_TIME_WEIGHT);
                            thisState.cameraImage =
                                thisState.INITIAL_URL +
                                "/getCameraImage?rnd=" +
                                Math.random();
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "Local Setting Refresh",
                                message: "Local Setting Refresh Successfully."
                            });
                            thisState.setMyState(thisState);
                        }}
                    >
                        <FontAwesomeIcon icon={faRetweet} className="mr-3" />
                        Local Refresh
                  </Button>
                </footer>
            </div>
        </Tab.Container>
    );
};

export default Settings;
