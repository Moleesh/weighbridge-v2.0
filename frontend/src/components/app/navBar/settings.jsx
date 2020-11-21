import React from "react";
import {Button, Col, Nav, Row, Tab} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRetweet, faSync, faWrench} from "@fortawesome/free-solid-svg-icons";

import GeneralSettings from "./settings/generalSettings";
import InvoiceSettings from "./settings/invoiceSettings";
import WebCamSettings from "./settings/webCamSettings";
import PrinterSettings from "./settings/printerSettings";
import IndicatorSettings from "./settings/indicatorSettings";
import DisplaySettings from "./settings/displaySettings";
import AdminSettings from "./settings/adminSettings";

const Settings = props => {
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
                            <Nav.Link eventKey="invoiceSettings">Invoice Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="webCamSettings">WebCam Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="printerSettings">Printer Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="indicatorSettings">Indicator Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="displaySettings">Display Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item disabled={thisState.SETTING_DISABLED}>
                            <Nav.Link eventKey="adminSettings">Admin
                                Settings</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm="10" className="pt-2">
                    <Tab.Content>
                        <Tab.Pane eventKey="generalSettings">
                            <GeneralSettings preState={thisState} key="generalSettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="invoiceSettings">
                            <InvoiceSettings preState={thisState} key="invoiceSettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="webCamSettings">
                            <WebCamSettings preState={thisState} key="webCamSettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="printerSettings">
                            <PrinterSettings preState={thisState} key="printerSettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="indicatorSettings">
                            <IndicatorSettings preState={thisState} key="indicatorSettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="displaySettings">
                            <DisplaySettings preState={thisState} key="displaySettings"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="adminSettings">
                            <AdminSettings preState={thisState} key="adminSettings"/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            <Row/>
            <div className="footer-copyright text-center py-1">
                <footer>
                    <Button
                        variant="success"
                        size="lg"
                        className="mr-3"
                        onClick={() => {
                            fetch(thisState.INITIAL_URL + "/setting/saveAllSettingsByProfile?profile=" + thisState.PROFILE, {
                                method: "PUT",
                                body: JSON.stringify(thisState.settings.value),
                                headers: {"content-type": "application/json"}
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
                        disabled={thisState.SETTING_DISABLED}
                    >
                        <FontAwesomeIcon icon={faWrench} className="mr-3"/>
                        UPDATE
                    </Button>
                    <Button
                        variant="info"
                        size="lg"
                        className="mr-3"
                        onClick={() => {
                            fetch(thisState.INITIAL_URL + "/setting/getAllSettingsByProfile?profile=" + thisState.PROFILE)
                                .then(response => {
                                    if (response.status === 200) {
                                        return response.json();
                                    } else throw Error(response.statusText);
                                })
                                .then(settings => {
                                    settings.automation = settings.automation.toLowerCase().indexOf("true") !== -1;
                                    settings.invoice = settings.invoice.toLowerCase().indexOf("true") !== -1;
                                    settings.secondWeight = settings.secondWeight.toLowerCase().indexOf("true") !== -1;
                                    settings.hideCharges = settings.hideCharges.toLowerCase().indexOf("true") !== -1;
                                    settings.hideCustomerName = settings.hideCustomerName.toLowerCase().indexOf("true") !== -1;
                                    settings.hideTransporterName = settings.hideTransporterName.toLowerCase().indexOf("true") !== -1;
                                    settings.hideRemarks = settings.hideRemarks.toLowerCase().indexOf("true") !== -1;
                                    thisState.settings.value = settings;
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
                        <FontAwesomeIcon icon={faSync} spin className="mr-3"/>
                        Refresh
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                            clearInterval(thisState._WEIGHT);
                            thisState._WEIGHT = setInterval(() => {
                                fetch(thisState.INITIAL_URL + "/serialPort/getNextWeight")
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
                                            WEIGHT: -1
                                        });
                                    });
                            }, thisState.adminSettings.REFRESH_TIME_WEIGHT);
                            thisState.primaryWebCamImage = thisState.INITIAL_URL + "/webCam/getWebCamImage?webcam=" + thisState.webCam.details[0].name + "&rnd=" + Math.random();
                            thisState.alerts.push({
                                id: new Date().getTime(),
                                type: "success",
                                headline: "Local Setting Refresh",
                                message: "Local Setting Refresh Successfully."
                            });
                            thisState.setMyState(thisState);
                        }}
                    >
                        <FontAwesomeIcon icon={faRetweet} className="mr-3"/>
                        Local Refresh
                    </Button>
                </footer>
            </div>
        </Tab.Container>
    );
};

export default Settings;
