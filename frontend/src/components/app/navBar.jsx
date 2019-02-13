import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Weighing from "./navBar/weighing";

const NavBar = props => {
  let thisState = props.preState;
  return (
    <Tabs
      justify
      variant="tabs"
      defaultActiveKey="weighing"
      className="mt-2 h5 font-italic"
    >
      <Tab eventKey="weighing" title="Weighing">
        <Weighing preState={thisState} />
      </Tab>
      <Tab eventKey="autoWeighing" title="Auto Weighing">
        <h1>1</h1>
      </Tab>
      <Tab eventKey="report" title="Report">
        <h1>2</h1>
      </Tab>
      <Tab eventKey="setting" title="Setting">
        <h1>3</h1>
      </Tab>
    </Tabs>
  );
};

export default NavBar;
