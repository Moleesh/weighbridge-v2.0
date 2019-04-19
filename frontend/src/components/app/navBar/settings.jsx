import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";

import GeneralSettings from "./settings/generalSettings";

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
              <Nav.Link eventKey="drivers">Driver Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tareWeight">Tare Weights</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm="10" className="pt-2">
          <Tab.Content>
            <Tab.Pane eventKey="generalSettings">
              <GeneralSettings preState={thisState} key="material" />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Settings;
