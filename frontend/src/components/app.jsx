import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./app/header";
import NavTabs from "./app/navBar";

const INITIAL_URL = "http://localhost:8080";
class App extends Component {
  constructor() {
    super();
    this.setMyState = this.setMyState.bind(this);
  }

  async setMyState(myState) {
    this.setState(myState);
  }

  state = {
    INITIAL_URL: INITIAL_URL,
    weighing: {
      headingLineOne: "Babulens Enterprises",
      headingLineTwo: "Nagercoil",
      weight: "1000000",
      grossSelector: true,
      tareSelector: false,

      reference: {
        vehicleNoReference: React.createRef(),
        materialReference: {
          reference: React.createRef(),
          value: [{ material: "" }],
          open: undefined
        },
        customersNameReference: React.createRef(),
        transporterNameReference: React.createRef(),
        chargesReference: React.createRef(),
        remarksReference: React.createRef(),
        getWeightReference: React.createRef(),
        saveReference: React.createRef(),
        printReference: React.createRef()
      },
      disable: {
        grossSelectorDisabled: false,
        tareSelectorDisabled: false,
        vehicleNoDisabled: false,
        materialDisabled: false,
        customersNameDisabled: false,
        transporterNameDisabled: false,
        chargesDisabled: false,
        remarksDisabled: false,
        getWeightDisabled: false,
        saveDisabled: true,
        printDisabled: true
      }
    },
    weight: {
      slipNo: "",
      vehicleNo: "",
      material: "",
      customersName: "",
      transporterName: "",
      grossWeight: "",
      grossTime: "",
      tareWeight: "",
      tareTime: "",
      nettWeight: "",
      nettTIme: "",
      charges: "",
      remarks: "",
      manual: false
    },

    toggleActive: false
  };

  componentDidMount() {
    let thisState = { ...this.state, setMyState: this.setMyState };
    fetch(thisState.INITIAL_URL + "/getNextSlipNo")
      .then(res => res.json())
      .then(
        result => {
          thisState.weight.slipNo = result;
          thisState.setMyState(thisState);
        },
        error => {
          thisState.weight.slipNo = "-1";
          thisState.setMyState(thisState);
        }
      );
  }

  render() {
    let thisState = { ...this.state, setMyState: this.setMyState };
    return (
      <Container
        fluid
        onKeyDown={event => {
          if (event.keyCode === 9) {
            event.preventDefault();
          }
        }}
      >
        {/* <h1
          onClick={event => {
            console.log(thisState.materialRef.getInstance().getInput());
            thisState.materialRef.getInstance().getInput().value = "";
          }}
        >
          tets
        </h1> */}
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
