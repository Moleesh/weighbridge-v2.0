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
        defaultActiveKey="settings"
        // defaultActiveKey="weighing"
        className="mt-1 h5 py-2 pb-1"
      >
        <Tab eventKey="weighing" title="Weighing">
          <Weighing preState={thisState} />
        </Tab>
        <Tab eventKey="report" title="Report" onEntered={() => { }}>
          <Report preState={thisState} />
        </Tab>
        <Tab eventKey="configuration" title="Configuration">
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
