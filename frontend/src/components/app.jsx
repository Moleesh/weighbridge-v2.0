import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./app/header";
import NavTabs from "./app/navBar";

class App extends Component {
  constructor() {
    super();
    this.setMyState = this.setMyState.bind(this);
  }

  setMyState(myState) {
    this.setState(myState);
  }

  state = {
    headingLineOne: "Babulens Enterprises",
    headingLineTwo: "Nagercoil",

    Weight: "00000000",

    slipNo: "1",
    vehicleNo: "AB12CB1234",
    material: "EMPTY",
    charges: "0",
    remarks: "Hello",

    toggleActive: false
  };

  render() {
    let thisState = { ...this.state, setMyState: this.setMyState };
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <Header preState={thisState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NavTabs preState={thisState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
