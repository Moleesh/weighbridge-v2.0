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
    configuration: {
      material: {
        header: ["Material Id", "Material Name"],
        filterText: "",
        template: { materialId: "", material: "" },
        list: [
          { materialId: "1", material: "John" },
          { materialId: "2", material: "Miles" },
          { materialId: "3", material: "Charles" },
          { materialId: "4", material: "Herbie" }
        ],
        unlock: false
      }
    },
    weighing: {
      headingLineOne: "Babulens Enterprises",
      headingLineTwo: "Nagercoil",
      weight: "1000000",
      grossSelector: true,
      tareSelector: false,
      reprint: false,
      reprintSlipNo: "",
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
        printReference: React.createRef(),
        rePrintReference: React.createRef(),
        rePrintFieldReference: React.createRef(),
        rePrintButtonReference: React.createRef()
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
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        thisState.weight.slipNo = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {
        thisState.weight.slipNo = "-1";
        thisState.setMyState(thisState);
      });
    this.weight = setInterval(() => {
      fetch(thisState.INITIAL_URL + "/getNextWeight")
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else throw Error(response.statusText);
        })
        .then(result => {
          thisState.weighing.weight = result;
          thisState.setMyState(thisState);
        })
        .catch(error => {
          thisState.weighing.weight = "-1";
          thisState.setMyState(thisState);
        });
    }, 10000000);
  }
  componentWillUnmount() {
    clearInterval(this.weight);
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
