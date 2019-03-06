import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";

import Material from "./configuration/material";

const Configuration = props => {
  let thisState = props.preState;
  return (
    <Tab.Container defaultActiveKey="material">
      <Row>
        <Col sm={3} className="pt-5">
          <Nav variant="pills" className="flex-column">
            <h5 className="font-weight-bold">Configuration</h5>
            <Nav.Item>
              <Nav.Link eventKey="material">Materials</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="driver">Driver Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tareWeights">Tare Weights</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} className="pt-2">
          <Tab.Content>
            <Tab.Pane eventKey="material">
              <Material preState={thisState} />
            </Tab.Pane>
            <Tab.Pane eventKey="driver">here</Tab.Pane>
            <Tab.Pane eventKey="tareWeights">here</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Configuration;
