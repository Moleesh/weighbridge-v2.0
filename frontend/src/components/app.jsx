import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AlertList } from "react-bs-notifier";
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
        list: [],
        editable: true,
        unlock: false
      },
      drivers: {
        header: ["Vehicle No", "Customer's Name", "Transporter's Name"],
        filterText: "",
        template: { vehicleNo: "", customerName: "", transporterName: "" },
        list: [],
        editable: true,
        unlock: false
      },
      tareWeight: {
        header: ["Vehicle No", "Tare Weight", "Tare Time"],
        filterText: "",
        template: { vehicleNo: "", tareWeight: "", tareTime: "" },
        list: [],
        editable: false,
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
    alerts: [],
    toggleActive: false
  };

  componentDidMount() {
    fetch(INITIAL_URL + "/getNextSlipNo")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.weight.slipNo = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.weight.slipNo = "-1";
        thisState.setMyState(thisState);
      });
    fetch(INITIAL_URL + "/getAllMaterial")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.configuration.material.list = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.weight.slipNo = "-1";
        thisState.setMyState(thisState);
      });
    this.weight = setInterval(() => {
      fetch(INITIAL_URL + "/getNextWeight")
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else throw Error(response.statusText);
        })
        .then(result => {
          let thisState = { ...this.state, setMyState: this.setMyState };
          thisState.weighing.weight = result;
          thisState.setMyState(thisState);
        })
        .catch(error => {
          let thisState = { ...this.state, setMyState: this.setMyState };
          thisState.weighing.weight = "-1";
          thisState.setMyState(thisState);
        });
    }, 1000);
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
        <AlertList
          position={"top-right"}
          alerts={thisState.alerts}
          timeout={2000}
          onDismiss={alert => {
            thisState.alerts.splice(thisState.alerts.indexOf(alert), 1);
            thisState.setMyState(thisState);
          }}
        />
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
