import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";

import Material from "./configuration/material";
import Customer from "./configuration/customer";
import TareWeight from "./configuration/tareWeight";
import Place from "./configuration/place";

const Configuration = props => {
    let thisState = props.preState;
    return (
        <Tab.Container defaultActiveKey="material">
            <Row>
                <Col sm="2" className="pt-5">
                    <Nav variant="pills" className="flex-column">
                        <h5 className="font-weight-bold pb-3">Configuration</h5>
                        <Nav.Item>
                            <Nav.Link eventKey="material">Materials</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="place">Places</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="customers">Customer's Details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tareWeight">Tare Weights</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm="10" className="pt-2">
                    <Tab.Content>
                        <Tab.Pane eventKey="material">
                            <Material preState={thisState} key="material" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="place">
                            <Place preState={thisState} key="place" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="customers">
                            <Customer preState={thisState} key="customers" />
                        </Tab.Pane>
                        <Tab.Pane eventKey="tareWeight">
                            <TareWeight preState={thisState} key="tareWeight" />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default Configuration;
