import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AlertList } from "react-bs-notifier";
import Header from "./app/header";
import NavTabs from "./app/navBar";
import moment from "moment";

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
        header: [
          "Customer Id",
          "Vehicle No",
          "Customer's Name",
          "Transporter's Name"
        ],
        filterText: "",
        template: {
          customerId: "",
          vehicleNo: "",
          customerName: "",
          transporterName: ""
        },
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
      weight: "1000000",
      grossSelector: true,
      tareSelector: false,
      reprint: false,
      reprintSlipNo: "",
      customersId: "",
      materialId: "",
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
        rePrintButtonReference: React.createRef(),
        customersIdReference: React.createRef(),
        materialIdReference: React.createRef()
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
        printDisabled: true,
        customersIdDisabled: true,
        materialIdDisabled: true
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
      nettTime: "",
      charges: "",
      remarks: "",
      manual: false
    },
    report: {
      filterText: "",
      header: {
        slipNo: "Slip No",
        vehicleNo: "Vehicle No",
        material: "Material",
        customersName: "Customer Name",
        transporterName: "Transporter Name",
        grossWeight: "Gross Weight",
        grossTime: "Gross Time",
        tareWeight: "Tare Weight",
        tareTime: "Tare Time",
        nettWeight: "Nett Weight",
        nettTime: "Nett Time",
        charges: "Charges",
        remarks: "Remarks"
      },
      filterPopUp: false,
      filter: {
        slipNo: true,
        vehicleNo: true,
        material: true,
        customersName: false,
        transporterName: false,
        grossWeight: true,
        grossTime: false,
        tareWeight: true,
        tareTime: false,
        nettWeight: true,
        nettTime: true,
        charges: true,
        remarks: false,
        manual: false
      },
      reportSelect: "Daily",
      date: {
        start: moment()
          .startOf("day")
          .toDate(),
        end: moment()
          .endOf("day")
          .toDate()
      },
      dateDisabled: true,
      inputLabel: "",
      input: "",
      inputDisabled: true,
      list: []
    },
    setting: {
      value: {
        weightbridgeName: "",
        weighbridgeAddress: "",
        footer: "",
        printerName: "",
        noOfCopies: "",
        printFormat: "",
        indicatorCOMPort: "",
        indicatorBaudRate: "",
        indicatorDataBits: "",
        indicatorParity: "",
        indicatorStopBits: "",
        indicatorFlowControl: "",
        indicatorDelimiter: "",
        displayCOMPort: "",
        displayBaudRate: "",
        displayDataBits: "",
        displayParity: "",
        displayStopBits: "",
        displayFlowControl: "",
        slipNo: ""
      },
      array: {
        availablePrinters: [],
        availablePrintFormat: ["A", "B"],
        availableCOMPorts: [],
        availableBaudRate: [
          110,
          300,
          1200,
          2400,
          4800,
          9600,
          19200,
          38400,
          57600,
          115200,
          230400,
          460800,
          921600
        ],
        availableDataBits: [5, 6, 7, 8],
        avaiableParity: ["Even", "Odd", "None", "Mark", "Space"],
        avaiableStopBits: [1, 1.5, 2],
        availableFlowControl: ["Xon/Xoff", "Hardware", "None"]
      }
    },
    alerts: [],
    automation: false
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
      .catch(error => {});
    fetch(INITIAL_URL + "/getAllDrivers")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.configuration.drivers.list = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {});
    fetch(INITIAL_URL + "/getAllTareWeight")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.configuration.tareWeight.list = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {});
    fetch(INITIAL_URL + "/getAllPrinters")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.setting.array.availablePrinters = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {});
    fetch(INITIAL_URL + "/getAllSerialPort")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.setting.array.availableCOMPorts = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {});
    fetch(INITIAL_URL + "/getAllSettings")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.setting.value = result;
        thisState.setMyState(thisState);
      })
      .catch(error => {});
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
    }, 1000000);
  }

  componentWillUnmount() {
    clearInterval(this.weight);
  }

  render() {
    let thisState = { ...this.state, setMyState: this.setMyState };
    return (
      <Container fluid>
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
        <Row className="minheight">
          <Col>
            <NavTabs preState={thisState} />
          </Col>
        </Row>
        <div className="footer-copyright text-center py-3 ">
          <footer className="">
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.Babulens.com"> Babulens.com </a>
          </footer>
        </div>
      </Container>
    );
  }
}

export default App;
