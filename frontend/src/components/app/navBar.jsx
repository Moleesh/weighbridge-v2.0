import React from "react";
import {Tab, Tabs} from "react-bootstrap";

import Weighing from "./navBar/weighing";
import Configuration from "./navBar/configuration";
import Report from "./navBar/report";
import Settings from "./navBar/settings";
import WebCams from "./navBar/webCams";


const NavBar = props => {
    let thisState = props.preState;
    return (
        <Tab.Container defaultActiveKey="first">
            <Tabs
                justify
                variant="tabs"
                defaultActiveKey="weighing"
                className="mt-1 h5 py-2 pb-1"
            >
                <Tab eventKey="weighing" title="Weighing"
                     onEntered={() => thisState.weighing.reference.vehicleNoReference.current.focus()}>
                    <Weighing preState={thisState}/>
                </Tab>
                <Tab eventKey="webcams" title="WebCams">
                    <WebCams preState={thisState}/>
                </Tab>
                <Tab eventKey="report" title="Report" onEntered={() => {
                }}>
                    <Report preState={thisState}/>
                </Tab>
                <Tab
                    eventKey="configuration"
                    title="Configuration"
                    onEntered={() => {
                        fetch(thisState.INITIAL_URL + "/material/getAllMaterials")
                            .then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            })
                            .then(result => {
                                thisState.configuration.material.list = result;
                                thisState.setMyState(thisState);
                            })
                            .catch(() => {
                            });
                        fetch(thisState.INITIAL_URL + "/driver/getAllDrivers")
                            .then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            })
                            .then(result => {
                                thisState.configuration.driver.list = result;
                                thisState.setMyState(thisState);
                            })
                            .catch(() => {
                            });
                        fetch(thisState.INITIAL_URL + "/tareWeight/getAllTareWeights")
                            .then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            })
                            .then(result => {
                                thisState.configuration.tareWeight.list = result;
                                thisState.setMyState(thisState);
                            })
                            .catch(() => {
                            });
                    }}
                >
                    <Configuration preState={thisState}/>
                </Tab>
                <Tab
                    eventKey="settings"
                    title="Settings"
                    onEntered={() => {
                        fetch(thisState.INITIAL_URL + "/setting/getAllSettingsByProfile?profile=" + thisState.PROFILE)
                            .then(response => {
                                if (response.status === 200) {
                                    return response.json();
                                } else throw Error(response.statusText);
                            })
                            .then(result => {
                                result.automation = result.automation.toLowerCase().indexOf("true") !== -1;
                                thisState.settings.value = result;
                                thisState.setMyState(thisState);
                            })
                            .catch(() => {
                            });
                    }}
                >
                    <Settings preState={thisState}/>
                </Tab>
            </Tabs>
        </Tab.Container>
    );
};

export default NavBar;
