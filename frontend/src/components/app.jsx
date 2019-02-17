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
    customersName: "",
    transporterName: "",
    material: "EMPTY",
    charges: "0",
    remarks: "Hello",
    grossWeight: "",
    grossTime: "",
    tareWeight: "",
    tareTime: "",
    nettWeight: "",
    nettTIme: "",

    vehicleNoDisabled: false,
    customersNameDisabled: false,
    transporterNameDisabled: false,
    materialDisabled: false,
    chargesDisabled: false,
    remarksDisabled: false,
    grossWeightDisabled: true,
    grossTimeDisabled: true,
    tareWeightDisabled: true,
    tareTimeDisabled: true,
    nettWeightDisabled: true,
    nettTImeDisabled: true,

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
