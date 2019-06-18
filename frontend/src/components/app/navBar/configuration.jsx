import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";

import Material from "./configuration/material";
import Drivers from "./configuration/drivers";
import TareWeight from "./configuration/tareWeight";

const Configuration = props => {
  let thisState = props.preState;
  return (
    <Tab.Container defaultActiveKey="material" >
      <Row>
        <Col sm="2" className="pt-5">
          <Nav variant="pills" className="flex-column">
            <h5 className="font-weight-bold pb-3">Configuration</h5>
            <Nav.Item>
              <Nav.Link eventKey="material" onSelect={() => {
                fetch(thisState.INITIAL_URL + "/getAllMaterial")
                  .then(response => {
                    if (response.status === 200) {
                      return response.json();
                    } else throw Error(response.statusText);
                  })
                  .then(result => {
                    thisState.configuration.material.list = result;
                    thisState.setMyState(thisState);
                  })
                  .catch(error => { });
              }}
              >Materials</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="drivers" onSelect={() => {
                fetch(thisState.INITIAL_URL + "/getAllDrivers")
                  .then(response => {
                    if (response.status === 200) {
                      return response.json();
                    } else throw Error(response.statusText);
                  })
                  .then(result => {
                    thisState.configuration.drivers.list = result;
                    thisState.setMyState(thisState);
                  })
                  .catch(error => { });
              }}>Driver Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tareWeight" onSelect={() => {
                fetch(thisState.INITIAL_URL + "/getAllTareWeight")
                  .then(response => {
                    if (response.status === 200) {
                      return response.json();
                    } else throw Error(response.statusText);
                  })
                  .then(result => {
                    thisState.configuration.tareWeight.list = result;
                    thisState.setMyState(thisState);
                  })
                  .catch(error => { });
              }}>Tare Weights</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm="10" className="pt-2">
          <Tab.Content>
            <Tab.Pane eventKey="material">
              <Material preState={thisState} key="material" />
            </Tab.Pane>
            <Tab.Pane eventKey="drivers">
              <Drivers preState={thisState} key="drivers" />
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
