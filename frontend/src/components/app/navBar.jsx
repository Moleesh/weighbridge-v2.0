import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Toggle from "react-bootstrap-toggle";

import Weighing from "./navBar/weighing";
import Configuration from "./navBar/configuration";

const NavBar = props => {
  let thisState = props.preState;
  return (
    <Tab.Container defaultActiveKey="first">
      <Tabs
        justify
        variant="tabs"
        defaultActiveKey="configuration"
        // defaultActiveKey="weighing"
        className="mt-1 h5 py-2 pb-1"
      >
        <Tab eventKey="weighing" title="Weighing">
          <Weighing preState={thisState} />
        </Tab>
        <Tab eventKey="report" title="Report">
          <h1>2</h1>
        </Tab>
        <Tab eventKey="configuration" title="Configuration">
          <Configuration preState={thisState} />
        </Tab>
        <Tab eventKey="setting" title="Setting">
          <Toggle
            onClick={
              () => ""
              // thisState.setMyState({
              //   toggleActive: !thisState.toggleActive
              // })
            }
            on="ON"
            off="OFF"
            size="lg"
            offstyle="danger"
            active={thisState.toggleActive}
            recalculateOnResize={true}
          />
        </Tab>
      </Tabs>
    </Tab.Container>
  );
};

export default NavBar;
