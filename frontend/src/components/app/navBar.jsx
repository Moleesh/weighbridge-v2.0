import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import Weighing from "./navBar/weighing";
import Configuration from "./navBar/configuration";
import Report from "./navBar/report";
import Settings from "./navBar/settings";

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
        <Tab eventKey="weighing" title="Weighing">
          <Weighing preState={thisState} />
        </Tab>
        <Tab eventKey="report" title="Report" onEntered={() => {}}>
          <Report preState={thisState} />
        </Tab>
        <Tab
          eventKey="configuration"
          title="Configuration"
          onEntered={() => {
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
              .catch(error => {});
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
              .catch(error => {});
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
              .catch(error => {});
          }}
        >
          <Configuration preState={thisState} />
        </Tab>
        <Tab
          eventKey="settings"
          title="Settings"
          onEntered={() => {
            fetch(thisState.INITIAL_URL + "/getAllSettings")
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else throw Error(response.statusText);
              })
              .then(result => {
                thisState.setting.value = result;
                thisState.setMyState(thisState);
              })
              .catch(error => {});
          }}
        >
          <Settings preState={thisState} />
        </Tab>
      </Tabs>
    </Tab.Container>
  );
};

export default NavBar;
