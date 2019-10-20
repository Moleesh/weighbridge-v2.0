import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
// noinspection ES6CheckImport
import { AlertList } from "react-bs-notifier";
import Header from "./app/header";
import NavTabs from "./app/navBar";
import moment from "moment";

const INITIAL_URL = "";

class App extends Component {
  state = {
    WEIGHT: "",
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
      weight: "-1",
      cameraImage: "",
      grossSelector: true,
      tareSelector: false,
      reprint: false,
      tareDetails: false,
      tareDetailsDate: moment().format("DD-MM-YYYY HH:mm:ss"),
      grossDetails: false,
      grossDetailsDate: moment().format("DD-MM-YYYY HH:mm:ss"),
      reprintSlipNo: "",
      tareDetailsWeight: "",
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
        tareDetailsWeightReference: React.createRef(),
        grossDetailsWeightReference: React.createRef(),
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
      slipNo: "-1",
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
      list: [],
      totalRecords: 0,
      totalNettWeight: 0,
      totalTotalCharges: 0
    },
    setting: {
      value: {
        REFRESH_TIME_WEIGHT: "",
        RESET_SLIP_PASSWORD: "",
        weighbridgeName: "",
        weighbridgeAddress: "",
        footer: "",
        cameraName: "",
        cameraXAxis: 0,
        cameraYAxis: 0,
        cameraWidth: 0,
        cameraHeight: 0,
        printerName: "",
        noOfCopies: 0,
        printFormat: "",
        indicatorCOMPort: "",
        indicatorBaudRate: "",
        indicatorDataBits: "",
        indicatorParity: "",
        indicatorStopBits: "",
        indicatorFlowControl: "",
        indicatorDelimiter: "",
        indicatorLastCharacter: "",
        displayCOMPort: "",
        displayBaudRate: "",
        displayDataBits: "",
        displayParity: "",
        displayStopBits: "",
        displayFlowControl: "",
        slipNo: -1
      },
      array: {
        availableCameras: [],
        availablePrinters: [],
        availablePrintFormat: [],
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
      },
      resetSlipNoDialog: false,
      resetSlipNo: 1,
      resetSlipNoPassword: "",
      resetSlipNoReference: React.createRef(),
      resetSlipNoPasswordReference: React.createRef(),
      resetSlipNoButtonReference: React.createRef()
    },
    alerts: [],
    automation: false
  };

  constructor(props) {
    super(props);
    this.setMyState = this.setMyState.bind(this);
  }

  async setMyState(myState) {
    this.setState(myState);
  }

  async componentDidMount() {
    fetch(INITIAL_URL + "/getNextSlipNo")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.weight.slipNo = result;
        // noinspection JSIncompatibleTypesComparison
        if (result === -1) {
          thisState.weighing.disable.getWeightDisabled = true;
        }
        thisState.setMyState(thisState);
      })
      .catch(() => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.weight.slipNo = "-1";
        thisState.weighing.disable.getWeightDisabled = true;
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
      .catch(() => { });
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
      .catch(() => { });
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
      .catch(() => { });
    const wait = () => {
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
        .catch(() => {
        });
      fetch(INITIAL_URL + "/getAllPrintFormat")
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else throw Error(response.statusText);
        })
        .then(result => {
          let thisState = { ...this.state, setMyState: this.setMyState };
          thisState.setting.array.availablePrintFormat = result;
          thisState.setMyState(thisState);
        })
        .catch(() => {
        });
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
        .catch(() => {
        });
      fetch(INITIAL_URL + "/getAllCameras")
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else throw Error(response.statusText);
        })
        .then(result => {
          let thisState = { ...this.state, setMyState: this.setMyState };
          thisState.setting.array.availableCameras = result;
          thisState.setMyState(thisState);
        })
        .then(() => {
        })
        .catch(() => {
        });
    };
    await wait();

    fetch(INITIAL_URL + "/getAllSettings")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.statusText);
      })
      .then(result => {
        let thisState = { ...this.state, setMyState: this.setMyState };
        thisState.setting.value = result;
        if (
          thisState.setting.array.availableCameras.indexOf(
            thisState.setting.value.cameraName
          ) === -1
        ) {
          thisState.setting.array.availableCameras.push(
            thisState.setting.value.cameraName
          );
        }
        if (
          thisState.setting.array.availablePrinters.indexOf(
            thisState.setting.value.printerName
          ) === -1
        ) {
          thisState.setting.array.availablePrinters.push(
            thisState.setting.value.printerName
          );
        }
        if (
          thisState.setting.array.availableCOMPorts.indexOf(
            thisState.setting.value.indicatorCOMPort
          ) === -1
        ) {
          thisState.setting.array.availableCOMPorts.push(
            thisState.setting.value.indicatorCOMPort
          );
        }
        if (
          thisState.setting.array.availableCOMPorts.indexOf(
            thisState.setting.value.displayCOMPort
          ) === -1
        ) {
          thisState.setting.array.availableCOMPorts.push(
            thisState.setting.value.displayCOMPort
          );
        }
        thisState.setMyState(thisState).then(() => {
          thisState.WEIGHT = setInterval(() => {
            fetch(INITIAL_URL + "/getNextWeight")
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else throw Error(response.statusText);
              })
              .then(result => {
                thisState.weighing.weight = result;
                thisState.setMyState(thisState);
              })
              .catch(() => {
                thisState.weighing.weight = "-1";
                thisState.setMyState(thisState);
              });
          }, thisState.setting.value.REFRESH_TIME_WEIGHT);
          thisState.weighing.cameraImage =
            INITIAL_URL + "/getCameraImage?rnd=" + Math.random();
          thisState.setMyState(thisState);
        });
      })
      .catch(() => {
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.WEIGHT);
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
