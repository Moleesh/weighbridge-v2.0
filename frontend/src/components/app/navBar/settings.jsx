import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";

import GeneralSettings from "./settings/generalSettings";
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
    </Tab.Container>
  );
};

export default Settings;
