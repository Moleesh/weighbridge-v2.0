import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import Weighing from "./navBar/weighing";
import Configuration from "./navBar/configuration";
import Report from "./navBar/report";
import Settings from "./navBar/settings";
import WebCams from "./navBar/webCams";
import Invoice from "./navBar/invoice";

const NavBar = props => {
    let thisState = props.preState;
    return (
        <Tab.Container>
            <Tabs
                justify
                variant="tabs"
                defaultActiveKey="weighing"
                className="mt-1 h5 py-2 pb-1">
                <Tab eventKey="weighing" title="Weighing"
                    onEntered={() => thisState.switchFocus(thisState, 'weighing', '', false)}>
                    <Weighing preState={thisState} />
                </Tab>
                {thisState.settings.value.invoice ?
                    <Tab eventKey="invoice" title="Invoice"
                        onEntered={() => thisState.switchFocus(thisState, 'invoices', '', false)}>
                        <Invoice preState={thisState} />
                    </Tab> : ""}
                {thisState.settings.value.webcams ?
                    < Tab eventKey="webcams" title="WebCams">
                        <WebCams preState={thisState} />
                    </Tab> : ""}
                <Tab eventKey="report" title="Report">
                    <Report preState={thisState} />
                </Tab>
                <Tab
                    eventKey="configuration"
                    title="Configuration"
                    onEntered={() => {
                        fetch(thisState.INITIAL_URL + "/material/getAllMaterials").then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            thisState.configuration.material.list = result;
                            thisState.setMyState(thisState);
                        });
                        fetch(thisState.INITIAL_URL + "/place/getAllPlaces").then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            thisState.configuration.place.list = result;
                            thisState.setMyState(thisState);
                        });
                        fetch(thisState.INITIAL_URL + "/customer/getAllCustomers").then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            thisState.configuration.customer.list = result;
                            thisState.setMyState(thisState);
                        });
                        fetch(thisState.INITIAL_URL + "/tareWeight/getAllTareWeights").then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else throw Error(response.statusText);
                        }).then(result => {
                            thisState.configuration.tareWeight.list = result;
                            thisState.setMyState(thisState);
                        });
                    }}
                >
                    <Configuration preState={thisState} />
                </Tab>
                <Tab eventKey="settings" title="Settings">
                    <Settings preState={thisState} />
                </Tab>
            </Tabs>
        </Tab.Container>
    );
};

export default NavBar;
