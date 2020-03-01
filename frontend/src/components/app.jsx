import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {AlertList} from "react-bs-notifier";
import Header from "./app/header";
import NavTabs from "./app/navBar";
import moment from "moment";

import {css} from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";


const INITIAL_URL = "http://localhost:9000";

class App extends Component {
    state = {
        loading: true,
        SETTING_DISABLED: true,
        INITIAL_URL: INITIAL_URL,
        _WEIGHT: "",
        WEIGHT: -1,
        primaryWebCamImage: "",
        weight: {
            slipNo: -1,
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
            manual: false,
            profile: "Standard"
        },
        webcams: [],
        adminSettings: {
            REFRESH_TIME_WEIGHT: "",
            RESET_SLIP_PASSWORD: "",
            MANUAL_ENTRY_PASSWORD: "",
            EDIT_ENABLE_PASSWORD: ""
        },
        PROFILE: "Standard",
        profiles: [
            "Standard"
        ],
        settings: {
            value: {
                slipNo: -1,
                weighbridgeName: "",
                weighbridgeAddress: "",
                footer: "",
                printerName: "",
                noOfCopies: "",
                printFormat: "",
                automation: false
            },
            indicator: {
                name: "indicator",
                serialPort: "dummy",
                baudRate: 1200,
                dataBits: 8,
                parity: 0,
                stopBits: 1,
                flowControl: 0,
                delimiter: 10,
                lastCharacter: "~~~"
            },
            display: {
                name: "display",
                serialPort: "dummy",
                baudRate: 1200,
                dataBits: 8,
                parity: 0,
                stopBits: 1,
                flowControl: 0,
                delimiter: 10,
                lastCharacter: "~~~"
            },
            array: {
                availablePrinters: [],
                availablePrintFormats: [],
                availableWebCams: [],
                availableSerialPorts: [],
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
                availableParity: [0],
                availableStopBits: [1, 1.5, 2],
                availableFlowControl: [0]
            },
            webCamSelect: "",
            resetSlipNoDialog: false,
            manualEntryDialog: false,
            manualEntryPassword: "",
            editEnableDialog: false,
            editEnablePassword: "",
            resetSlipNo: 1,
            resetSlipNoPassword: "",
            manualEntryPasswordReference: React.createRef(),
            manualEntryReference: React.createRef(),
            editEnablePasswordReference: React.createRef(),
            editEnableReference: React.createRef(),
            resetSlipNoReference: React.createRef(),
            resetSlipNoPasswordReference: React.createRef(),
            resetSlipNoButtonReference: React.createRef(),
            manualEntry: false,
            editEnable: false
        },
        configuration: {
            material: {
                header: ["Material Id", "Material Name"],
                filterText: "",
                template: { materialId: "", material: "" },
                list: [],
                editable: true,
                unlock: false
            },
            driver: {
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
        webCam: {
            details: [
                {
                    name: "dummy",
                    myPrimary: true,
                    x_Axis: 5,
                    y_Axis: 5,
                    width: 5,
                    height: 5
                }]
        },
        weighing: {
            previousWeightSelector: false,
            previousWeight: "",
            previousWeightResult: "",
            preventVehicleNoFocus: false,
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
                previousWeightReference: React.createRef(),
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
                grossDetailsDisabled: true,
                tareDetailsWeightDisabled: true,
                getWeightDisabled: false,
                saveDisabled: true,
                printDisabled: true,
                customersIdDisabled: true,
                materialIdDisabled: true
            }
        },
        report: {
            pdfURL: "",
            filterText: "",
            header: {
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
                remarks: "Remarks",
                manual: "Manual"
            },
            filterPopUp: false,
            filter: {
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
            reportSelect: "Daily Report",
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
            totalTotalCharges: 0,
            edit: false
        },
        alerts: []
    };

    constructor(props) {
        super(props);
        this.setMyState = this.setMyState.bind(this);
    }

    async setMyState(myState) {
        this.setState(myState);
    }

    UNSAFE_componentWillMount() {
        let thisState = { ...this.state, setMyState: this.setMyState };
        Promise.all(
            [
                fetch(thisState.INITIAL_URL + "/adminSetting/getAllAdminSettings").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/profile/getMyPrimaryProfile").then(resp => resp.text()),
                fetch(thisState.INITIAL_URL + "/profile/getAllProfiles").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/printer/getAllPrinters").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/printer/getAllPrintFormats").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/webCam/getAllWebCamDetails").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/webCam/getAllWebCams").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/serialPort/getAllSerialPorts").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/serialPort/getSerialPortDetailByName?name=indicator").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/serialPort/getSerialPortDetailByName?name=display").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/material/getAllMaterials").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/driver/getAllDrivers").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/tareWeight/getAllTareWeights").then(resp => resp.json())
            ]
        ).then(([adminSettings, profile, profiles, printers, printFormats, webCamDetails, webCams, serialPorts, indicator, display, materials, drivers, tareWeights]) => {
            thisState.adminSettings = adminSettings;
            thisState.PROFILE = profile;
            thisState.profiles = profiles;
            thisState.settings.array.availablePrinters = printers;
            thisState.settings.array.availablePrintFormats = printFormats;
            thisState.webCam.details = webCamDetails;
            thisState.settings.array.availableWebCams = webCams;
            let webCamSelect = webCams.filter(webCam => webCam.startsWith(webCamDetails[0].name + " ["));
            thisState.settings.webCamSelect = webCamSelect.length === 0 ? webCams[0].name : webCamSelect[0];
            thisState.settings.array.availableSerialPorts = serialPorts;
            thisState.settings.indicator = indicator;
            thisState.settings.display = display;
            thisState.configuration.material.list = materials;
            thisState.configuration.driver.list = drivers;
            thisState.configuration.tareWeight.list = tareWeights;
            Promise.all(
                [
                    fetch(thisState.INITIAL_URL + "/setting/getAllSettingsByProfile?profile=" + thisState.PROFILE).then(resp => resp.json()),
                    fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(resp => resp.text())
                ]
            ).then(([settings, slipNo]) => {
                settings.automation = settings.automation.toLowerCase().indexOf("true") !== -1;
                thisState.settings.value = settings;
                thisState.weight.slipNo = slipNo;
                if (slipNo === -1) {
                    thisState.SETTING_DISABLED = true;
                    thisState.weighing.disable.getWeightDisabled = true;
                }
                if (thisState.settings.array.availablePrinters.indexOf(thisState.settings.value.printerName) === -1) {
                    thisState.settings.array.availablePrinters.push(thisState.settings.value.printerName);
                }
                thisState._WEIGHT = setInterval(() => {
                    fetch(thisState.INITIAL_URL + "/serialPort/getNextWeight")
                        .then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                throw Error();
                            }
                        })
                        .then(result => {
                            thisState.setMyState({
                                WEIGHT: result,
                                SETTING_DISABLED: false
                            });
                        }).catch(() => {
                        clearInterval(thisState._WEIGHT);
                        thisState.setMyState({
                            WEIGHT: -1,
                            SETTING_DISABLED: true
                        });
                    })
                }, thisState.adminSettings.REFRESH_TIME_WEIGHT);
                thisState.primaryWebCamImage = thisState.INITIAL_URL + "/webCam/getWebCamImage?fullSize=false&webcam=" + thisState.webCam.details[0].name + "&rnd=" + Math.random();
                thisState.loading = false;
                thisState.setMyState(thisState)
            }).catch(() => {
                thisState.weight.slipNo = -1;
                thisState.SETTING_DISABLED = true;
                thisState.weighing.disable.getWeightDisabled = true;
                thisState.loading = false;
                thisState.setMyState(thisState);
            })
        }).catch(() => {
            thisState.weight.slipNo = -1;
            thisState.SETTING_DISABLED = true;
            thisState.weighing.disable.getWeightDisabled = true;
            thisState.loading = false;
            thisState.setMyState(thisState);
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.WEIGHT);
    }

    render() {
        let thisState = { ...this.state, setMyState: this.setMyState };
        if (thisState.loading) {
            return (
                <Container>
                    <Row className="mt-5 pt-5" />
                    <Row className="mt-5 pt-5 justify-content-md-center">
                        <Col lg="auto">
                            Software is Loading...
                        </Col>
                    </Row>
                    <Row className="mt-3 pr-4 justify-content-md-center">
                        <Col lg="auto">
                            <PropagateLoader
                                css={css`
                    display: block;
                    margin: 0 auto;
                    border-color: red;
                  `}
                                size={15}
                                color={"#123abc"}
                                loading={true}
                            />
                        </Col>
                    </Row>
                </Container>
            )
        } else {
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
                            <Header preState={thisState}/>
                        </Col>
                    </Row>
                    <Row className="min-height">
                        <Col>
                            <NavTabs preState={thisState}/>
                        </Col>
                    </Row>
                    <div className="footer-copyright text-center py-3 ">
                        <footer className="">
                            &copy; {new Date().getFullYear()} Copyright:
                            <a href="https://www.Babulens.com"> Babulens.com </a>
                        </footer>
                    </div>
                </Container>
            )
        }
    }
}

export default App;
