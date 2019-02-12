import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Weighing from "./navBar/weighing";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Tabs
        justify
        variant="tabs"
        defaultActiveKey="weighing"
        className="mt-2 h5 font-italic"
      >
        <Tab eventKey="weighing" title="Weighing">
          <Weighing />
        </Tab>
        <Tab eventKey="report" title="Report">
          <h1>2</h1>
        </Tab>
        <Tab eventKey="setting" title="Setting">
          <h1>3</h1>
        </Tab>
      </Tabs>
    );
  }
}

export default NavBar;
