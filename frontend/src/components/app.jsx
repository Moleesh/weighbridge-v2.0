import React, { Component } from "react";
import FluidContainer from "react-fluid-container";
import { Row, Col } from "react-bootstrap";
import Header from "./app/header";
import NavTabs from "./app/navBar";

class App extends Component {
  constructor() {
    super();
    this.setMyState = this.setMyState.bind(this);
  }

  setMyState(myState) {
    this.setState(
      Object.assign(this.state, {
        myState
      })
    );
  }

  state = {
    weighing: {
      headingLineOne: "Babulens Enterprises",
      headingLineTwo: "Nagercoil",
      weight: "00000000",
      grossSelector: true,
      tareSelector: false,
      disable: {
        vehicleNoDisabled: false,
        customersNameDisabled: false,
        transporterNameDisabled: false,
        materialDisabled: false,
        grossWeightDisabled: true,
        grossTimeDisabled: true,
        tareWeightDisabled: true,
        tareTimeDisabled: true,
        nettWeightDisabled: true,
        nettTImeDisabled: true,
        chargesDisabled: false,
        remarksDisabled: false
      }
    },
    weight: {
      slipNo: "slipNo",
      vehicleNo: "vehicleNo",
      customersName: "customersName",
      transporterName: "transporterName",
      material: [{ id: 1, name: "EMPTY" }],
      grossWeight: "grossWeight",
      grossTime: "grossTime",
      tareWeight: "tareWeight",
      tareTime: "tareTime",
      nettWeight: "nettWeight",
      nettTIme: "nettTIme",
      charges: "charges",
      remarks: "remarks"
    },

    materialRef: "",

    toggleActive: false
  };

  render() {
    let thisState = { ...this.state, setMyState: this.setMyState };
    return (
      <FluidContainer>
        <h1
          onClick={event => {
            console.log(thisState.materialRef.getInstance().getInput());
            thisState.materialRef.getInstance().getInput().value = "";
          }}
        >
          tets
        </h1>
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
      </FluidContainer>
    );
  }
}

export default App;
