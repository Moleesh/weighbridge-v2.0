import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Weighing from "./navBar/weighing";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Tabs defaultActiveKey="Weighing">
        <Tab eventKey="Weighing" title="Weighing">
          <Weighing />
        </Tab>
        <Tab eventKey="Report" title="Report">
          <h1>2</h1>
        </Tab>
        <Tab eventKey="Setting" title="Setting">
          <h1>3</h1>
        </Tab>
      </Tabs>
    );
  }
}

export default NavBar;
