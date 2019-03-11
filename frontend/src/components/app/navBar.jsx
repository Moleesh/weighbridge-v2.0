import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Toggle from "react-bootstrap-toggle";

import Weighing from "./navBar/weighing";
import Configuration from "./navBar/configuration";
import Report from "./navBar/report";

const NavBar = props => {
  let thisState = props.preState;
  return (
    <Tab.Container defaultActiveKey="first">
      <Tabs
        justify
        variant="tabs"
        defaultActiveKey="report"
        // defaultActiveKey="weighing"
        className="mt-1 h5 py-2 pb-1"
      >
        <Tab eventKey="weighing" title="Weighing">
          <Weighing preState={thisState} />
        </Tab>
        <Tab
          eventKey="report"
          title="Report"
          onEntered={() => {
            fetch(thisState.INITIAL_URL + "/getAllWeight")
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else throw Error(response.statusText);
              })
              .then(result => {
                console.log(result);
              })
              .catch(error => {});
          }}
        >
          <Report preState={thisState} />
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
