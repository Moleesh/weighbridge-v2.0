import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Weighing from "./navBar/weighing";
import Toggle from "react-bootstrap-toggle";

const NavBar = props => {
  let thisState = props.preState;
  return (
    <Tabs
      justify
      variant="tabs"
      defaultActiveKey="weighing"
      className="mt-1 h5 font-italic"
    >
      <Tab eventKey="weighing" title="Weighing">
        <Weighing preState={thisState} />
      </Tab>
      <Tab eventKey="report" title="Report">
        <h1>2</h1>
      </Tab>
      <Tab eventKey="setting" title="Setting">
        <Toggle
          onClick={() =>
            thisState.setMyState({
              toggleActive: !thisState.toggleActive
            })
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
  );
};

export default NavBar;
