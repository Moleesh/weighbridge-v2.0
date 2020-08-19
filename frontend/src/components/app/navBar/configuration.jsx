import React from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";

import Material from "./configuration/material";
import Customer from "./configuration/customer";
import TareWeight from "./configuration/tareWeight";

const Configuration = props => {
    let thisState = props.preState;
    return (
        <Tab.Container defaultActiveKey="material">
            <Row>
                <Col sm="2" className="pt-5">
                    <Nav variant="pills" className="flex-column">
                        <h5 className="font-weight-bold pb-3">Configuration</h5>
                        <Nav.Item>
                            <Nav.Link eventKey="material" onSelect={() => {
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
                            }}
                            >Materials</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="customers" onSelect={() => {
                                fetch(thisState.INITIAL_URL + "/customer/getAllCustomers")
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        } else throw Error(response.statusText);
                                    })
                                    .then(result => {
                                        thisState.configuration.customer.list = result;
                                        thisState.setMyState(thisState);
                                    })
                                    .catch(() => {
                                    });
                            }}>Customer's Details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tareWeight" onSelect={() => {
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
                            }}>Tare Weights</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm="10" className="pt-2">
                    <Tab.Content>
                        <Tab.Pane eventKey="material">
                            <Material preState={thisState} key="material"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="customers">
                            <Customer preState={thisState} key="customers"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="tareWeight">
                            <TareWeight preState={thisState} key="tareWeight"/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default Configuration;
