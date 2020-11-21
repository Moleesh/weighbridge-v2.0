import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {AlertList} from "react-bs-notifier";
import Header from "./app/header";
import NavTabs from "./app/navBar";
import moment from "moment";

import {css} from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";


const INITIAL_URL = "";

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
        invoice: {
            invoiceNo: -1,
            referenceSlipNo: "",
            invoiceTime: "",
            customersName: "",
            gstin: "",
            address1: "",
            address2: "",
            timeOfArrival: "",
            vehicleNo: "",
            driverName: "",
            material: "",
            unitPrice: 0,
            quantity: 0,
            amount: 0,
            _cgst: 0,
            _sgst: 0,
            _igst: 0,
            cgst: 0,
            sgst: 0,
            igst: 0,
            total: 0,
            modeOfPayment: "CASH",
            dummy: false,
            profile: "Standard"
        },
        webcams: [],
        adminSettings: {
            REFRESH_TIME_WEIGHT: "",
            RESET_INVOICE_PASSWORD: "",
            RESET_SLIP_PASSWORD: "",
            MANUAL_ENTRY_PASSWORD: "",
            EDIT_ENABLE_PASSWORD: "",
            INVOICE_PASSWORD: ""
        },
        PROFILE: "Standard",
        profiles: [
            "Standard"
        ],
        settings: {
            value: {
                slipNo: -1,
                invoiceNo: 1,
                dummyInvoiceNo: 1,
                weighbridgeName: "",
                weighbridgeAddress: "",
                contacts: "",
                phone: "",
                footer: "",
                printerNameForWeighing: "",
                noOfCopiesForWeighing: "",
                printFormatForWeighing: "",
                printerNameForInvoice: "",
                noOfCopiesForInvoice: "",
                printFormatForInvoice: "",
                invoiceHeader: "",
                invoiceIdentifier: "",
                invoiceFooter: "",
                gstin: "",
                additionalInformation: "",
                cgst: 0,
                sgst: 0,
                igst: 0,
                automation: false,
                invoice: false,
                hideCharges: false,
                hideCustomerName: false,
                hideTransporterName: false,
                hideRemarks: false,
                hideVehicleNo: false,
                hideDriverName: false,
                hideTimeOfArrival: false,
                hideModeOfPayment: false,
                secondWeight: false
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
                availableWeightPrintFormats: [],
                availableInvoicetPrintFormats: [],
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
            hideFields: false,
            webCamSelect: "",
            resetSlipNoDialog: false,
            resetSlipNo: 1,
            resetSlipNoPassword: "",
            resetInvoiceNoDialog: false,
            resetInvoiceNo: 1,
            resetInvoiceNoPassword: "",
            manualEntryDialog: false,
            manualEntryPassword: "",
            editEnableDialog: false,
            editEnablePassword: "",
            invoiceDialog: false,
            invoicePassword: "",
            addNewProfileDialog: false,
            newProfile: "",
            manualEntryPasswordReference: React.createRef(),
            manualEntryReference: React.createRef(),
            editEnablePasswordReference: React.createRef(),
            editEnableReference: React.createRef(),
            invoicePasswordReference: React.createRef(),
            invoiceReference: React.createRef(),
            newProfileReference: React.createRef(),
            addNewProfileReference: React.createRef(),
            resetSlipNoReference: React.createRef(),
            resetSlipNoPasswordReference: React.createRef(),
            resetSlipNoButtonReference: React.createRef(),
            resetInvoiceNoReference: React.createRef(),
            resetInvoiceNoPasswordReference: React.createRef(),
            resetInvoiceNoButtonReference: React.createRef(),
            manualEntry: false,
            editEnable: false,
            settings: false
        },
        configuration: {
            modeOfPayment: {
                list: ["CASH", "CREDIT"]
            },
            material: {
                header: ["Material Id", "Material Name", "Unit Price"],
                filterText: "",
                template: {materialId: "", material: "", unitPrice: ""},
                list: [],
                editable: true,
                unlock: false
            },
            customer: {
                header: [
                    "Customer Id",
                    "Vehicle No",
                    "Customer's Name",
                    "GSTIN",
                    "Transporter's Name",
                    "Adreess line 1",
                    "Adreess line 2"
                ],
                filterText: "",
                template: {
                    customerId: "",
                    vehicleNo: "",
                    customerName: "",
                    gstin: "",
                    transporterName: "",
                    address1: "",
                    address2: ""
                },
                list: [],
                editable: true,
                unlock: false
            },
            tareWeight: {
                header: ["Vehicle No", "Tare Weight", "Tare Time"],
                filterText: "",
                template: {vehicleNo: "", tareWeight: "", tareTime: ""},
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
            grossSelector: true,
            tareSelector: false,
            reprint: false,
            secondWeight: false,
            print: false,
            tareDetails: false,
            tareDetailsDate: moment().format("DD-MM-YYYY HH:mm:ss"),
            grossDetails: false,
            grossDetailsDate: moment().format("DD-MM-YYYY HH:mm:ss"),
            reprintSlipNo: "",
            secondWeightSlipNo: "",
            tareDetailsWeight: "",
            customersId: "",
            materialId: "",
            reference: {
                vehicleNoReference: React.createRef(),
                materialReference: {
                    reference: React.createRef(),
                    value: [{material: ""}],
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
                tareDetailsWeightReference: React.createRef(),
                grossDetailsWeightReference: React.createRef(),
                rePrintFieldReference: React.createRef(),
                rePrintButtonReference: React.createRef(),
                secondWeightFieldReference: React.createRef(),
                secondWeightButtonReference: React.createRef(),
                customersIdReference: React.createRef(),
                materialIdReference: React.createRef(),
                printDialogReference: React.createRef()
            },
            disable: {
                grossSelectorDisabled: false,
                tareSelectorDisabled: false,
                secondWeightDisabled: false,
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
        invoices: {
            dummy: false,
            disablecalculation: false,
            previousWeightSelector: false,
            preventFocus: false,
            igstSelector: false,
            dummySelectorDialog: false,
            dummyInvoiceNo: "",
            previousWeightResult: {},
            print: false,
            reprint: false,
            reprintInvoiceNo: "",
            reference: {
                referenceSlipNoReference: React.createRef(),
                customersNameReference: {
                    reference: React.createRef(),
                    value: [{customerName: ""}],
                    open: undefined
                },
                gstinReference: React.createRef(),
                vehicleNoReference: React.createRef(),
                driverNameReference: React.createRef(),
                materialReference: {
                    reference: React.createRef(),
                    value: [{material: ""}],
                    open: undefined
                },
                dummySelectorReference: React.createRef(),
                dummyInvoiceNoReference: React.createRef(),
                unitPriceReference: React.createRef(),
                quantityReference: React.createRef(),
                address1Reference: React.createRef(),
                address2Reference: React.createRef(),
                timeOfArrivalReference: React.createRef(),
                modeOfPaymentReference: {
                    reference: React.createRef(),
                    value: ["CASH"],
                    open: undefined
                },
                saveReference: React.createRef(),
                printReference: React.createRef(),
                previousWeightReference: React.createRef(),
                rePrintFieldReference: React.createRef(),
                rePrintButtonReference: React.createRef(),
                printDialogReference: React.createRef()
            },
            disable: {
                selector: false,
                referenceSlipNoDisabled: false,
                customersNameDisabled: false,
                gstinDisabled: false,
                vehicleNoDisabled: false,
                driverNameDisabled: false,
                materialDisabled: false,
                unitPriceDisabled: false,
                quantityDisabled: false,
                address1Disabled: false,
                address2Disabled: false,
                timeOfArrivalDisabled: false,
                modeOfPaymentDisabled: false,
                saveDisabled: false,
                printDisabled: true
            }
        },
        report: {
            type: "weight",
            isType: "weight",
            currentHeader: "weight",
            reportTitle: "",
            pdfURL: "",
            filterText: "",
            headers: {
                weight: {
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
                invoice: {
                    referenceSlipNo: "Reference Slip No",
                    invoiceTime: "Invoice Time",
                    customersName: "Customer Name",
                    gstin: "GSTIN",
                    address1: "Address Line 1",
                    address2: "Address Line 2",
                    vehicleNo: "Vehicle No",
                    timeOfArrival: "Time Of Arrival",
                    material: "Material",
                    unitPrice: "Unit Price",
                    quantity: "Quantity",
                    amount: "Amount",
                    _cgst: "CGST %",
                    cgst: "CGST",
                    _sgst: "SGST %",
                    sgst: "SGST",
                    _igst: "IGST %",
                    igst: "IGST",
                    total: "Total",
                    dummy: "Dummy"
                }
            },
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
            filters: {
                weight: {
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
                invoice: {
                    referenceSlipNo: false,
                    invoiceTime: true,
                    customersName: true,
                    gstin: false,
                    address1: false,
                    address2: false,
                    timeOfArrival: false,
                    vehicleNo: false,
                    material: true,
                    unitPrice: true,
                    quantity: true,
                    amount: true,
                    _cgst: false,
                    cgst: true,
                    _sgst: false,
                    sgst: true,
                    _igst: false,
                    igst: true,
                    total: true,
                    dummy: false
                }
            },
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
            reportSelect: "Weighing - Daily Report",
            date: {
                start: moment().startOf("day").toDate(),
                end: moment().endOf("day").toDate()
            },
            dateDisabled: true,
            inputLabel: "",
            input: "",
            inputDisabled: true,
            list: [],
            totalRecords: 0,
            totalWeight: 0,
            totalCharge: 0,
            edit: false,
            dummy: "all",
            invoiceSelect: false,
            getReport: React.createRef()
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

    switchFocus(thisState, screen, field, reverse) {
        switch (screen) {
            case 'weighing':
                switch (field) {
                    case 'getWeight':
                        thisState.weighing.reference.getWeightReference.current.focus();
                        break;
                    case 'secondWeightField':
                        thisState.weighing.reference.secondWeightFieldReference.current.focus();
                        break;
                    case 'save':
                        thisState.weighing.reference.saveReference.current.focus();
                        break;
                    case 'print':
                        thisState.weighing.reference.printReference.current.focus();
                        break;
                    case 'rePrintButton':
                        thisState.weighing.reference.rePrintButtonReference.current.focus();
                        break;
                    case 'secondWeightButton':
                        thisState.weighing.reference.secondWeightButtonReference.current.focus();
                        break;
                    case 'materialId':
                        thisState.weighing.reference.materialIdReference.current.focus();
                        break;
                    case 'customersId':
                        thisState.weighing.reference.customersIdReference.current.focus();
                        break;
                    case 'grossDetails':
                        thisState.weighing.reference.grossDetailsWeightReference.current.focus();
                        break;
                    case 'tareDetails':
                        thisState.weighing.reference.tareDetailsWeightReference.current.focus();
                        break;
                    case 'previousWeight':
                        thisState.weighing.reference.previousWeightReference.current.focus();
                        break;
                    case 'printDialog':
                        thisState.weighing.reference.printDialogReference.current.focus();
                        break;
                    default:
                        if (!reverse) {
                            switch (field) {
                                default:
                                    if (!thisState.weighing.disable.vehicleNoDisabled) {
                                        thisState.weighing.reference.vehicleNoReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'material':
                                    if (!thisState.weighing.disable.materialDisabled) {
                                        thisState.weighing.reference.materialReference.reference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'customersName':
                                    if (!thisState.settings.value.hideCustomerName) {
                                        thisState.weighing.reference.customersNameReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'transporterName':
                                    if (!thisState.settings.value.hideTransporterName) {
                                        thisState.weighing.reference.transporterNameReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'charges':
                                    if (!thisState.settings.value.hideCharges) {
                                        thisState.weighing.reference.chargesReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'remarks':
                                    if (!thisState.settings.value.hideRemarks) {
                                        thisState.weighing.reference.remarksReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'getWeight':
                                    thisState.weighing.reference.getWeightReference.current.focus();
                            }
                        } else {
                            switch (field) {
                                case 'remarks':
                                    if (!thisState.settings.value.hideRemarks) {
                                        thisState.weighing.reference.remarksReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'charges':
                                    if (!thisState.settings.value.hideCharges) {
                                        thisState.weighing.reference.chargesReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'transporterName':
                                    if (!thisState.settings.value.hideTransporterName) {
                                        thisState.weighing.reference.transporterNameReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'customersName':
                                    if (!thisState.settings.value.hideCustomerName) {
                                        thisState.weighing.reference.customersNameReference.current.focus();
                                        break;
                                    }
                                // falls through
                                case 'material':
                                    if (!thisState.weighing.disable.materialDisabled) {
                                        thisState.weighing.reference.materialReference.reference.current.focus();
                                        break;
                                    }
                                // falls through
                                default:
                                    if (!thisState.weighing.disable.vehicleNoDisabled) {
                                        thisState.weighing.reference.vehicleNoReference.current.focus();
                                    }
                            }
                        }
                }
                break;
            case 'invoices':
                switch (field) {
                    case 'save':
                        thisState.invoices.reference.saveReference.current.focus();
                        break;
                    case 'print':
                        thisState.invoices.reference.printReference.current.focus();
                        break;
                    case 'rePrint':
                        thisState.invoices.reference.rePrintFieldReference.current.focus();
                        break;
                    case 'rePrintButton':
                        thisState.invoices.reference.rePrintButtonReference.current.focus();
                        break;
                    case 'printDialog':
                        thisState.invoices.reference.printDialogReference.current.focus();
                        break;
                    case 'previousWeight':
                        thisState.invoices.reference.previousWeightReference.current.focus();
                        break;
                    case 'dummySelector':
                        thisState.invoices.reference.dummySelectorReference.current.focus();
                        break;
                    case 'dummyInvoiceNo':
                        thisState.invoices.reference.dummyInvoiceNoReference.current.focus();
                        break;
                    default:
                        if (!reverse) {
                            switch (field) {
                                default:
                                    thisState.invoices.reference.referenceSlipNoReference.current.focus()
                                    break;
                                // falls through
                                case 'customersName':
                                    if (!thisState.invoices.disable.customersNameDisabled) {
                                        thisState.invoices.reference.customersNameReference.reference.current.focus();
                                        break;
                                    }
                                // falls through    
                                case 'gstin':
                                    thisState.invoices.reference.gstinReference.current.focus();
                                    break;
                                case 'vehicleNo':
                                    if (!thisState.invoices.disable.vehicleNoDisabled) {
                                        thisState.invoices.reference.vehicleNoReference.current.focus();
                                        break;
                                    }
                                // falls through  
                                case 'material':
                                    thisState.invoices.reference.materialReference.reference.current.focus();
                                    break;
                                case 'unitPrice':
                                    if (!thisState.invoices.disable.unitPriceDisabled) {
                                        thisState.invoices.reference.unitPriceReference.current.focus();
                                        break;
                                    }
                                // falls through 
                                case 'quantity':
                                    if (!thisState.invoices.disable.quantityDisabled) {
                                        thisState.invoices.reference.quantityReference.current.focus();
                                        break;
                                    }
                                // falls through      
                                case 'address1':
                                    thisState.invoices.reference.address1Reference.current.focus();
                                    break;
                                case 'address2':
                                    thisState.invoices.reference.address2Reference.current.focus();
                                    break;
                                case 'timeOfArrival':
                                    thisState.invoices.reference.timeOfArrivalReference.current.focus();
                                    break;
                                case 'save':
                                    thisState.invoices.reference.saveReference.current.focus();
                            }
                        } else {
                            switch (field) {
                                case 'save':
                                    thisState.invoices.reference.saveReference.current.focus();
                                    break;
                                case 'timeOfArrival':
                                    thisState.invoices.reference.timeOfArrivalReference.current.focus();
                                    break;
                                case 'address2':
                                    thisState.invoices.reference.address2Reference.current.focus();
                                    break;
                                case 'address1':
                                    thisState.invoices.reference.address1Reference.current.focus();
                                    break;
                                case 'quantity':
                                    if (!thisState.invoices.disable.quantityDisabled) {
                                        thisState.invoices.reference.quantityReference.current.focus();
                                        break;
                                    }
                                // falls through 
                                case 'unitPrice':
                                    if (!thisState.invoices.disable.unitPriceDisabled) {
                                        thisState.invoices.reference.unitPriceReference.current.focus();
                                        break;
                                    }
                                // falls through 
                                case 'material':
                                    thisState.invoices.reference.materialReference.reference.current.focus();
                                    break;

                                case 'vehicleNo':
                                    if (!thisState.invoices.disable.vehicleNoDisabled) {
                                        thisState.invoices.reference.vehicleNoReference.current.focus();
                                        break;
                                    }
                                // falls through  
                                case 'gstin':
                                    thisState.invoices.reference.gstinReference.current.focus();
                                    break;
                                case 'customersName':
                                    if (!thisState.invoices.disable.customersNameDisabled) {
                                        thisState.invoices.reference.customersNameReference.reference.current.focus();
                                        break;
                                    }
                                // falls through  
                                default:
                                    thisState.invoices.reference.referenceSlipNoReference.current.focus()
                            }
                        }
                }
                break;
            default:
        }
    }

    calculateInvoiceAmount(thisState) {
        if (thisState.invoice.quantity > 0 && thisState.invoice.unitPrice > 0 && !thisState.invoices.disablecalculation) {
            thisState.invoice.amount = (thisState.invoice.quantity * thisState.invoice.unitPrice).toFixed(2) * 1;
            if (thisState.invoices.igstSelector) {
                thisState.invoice.cgst = 0;
                thisState.invoice.sgst = 0;
                thisState.invoice.igst = (thisState.invoice.amount * thisState.invoice._igst / 100).toFixed(2) * 1;
            } else {
                thisState.invoice.cgst = (thisState.invoice.amount * thisState.invoice._cgst / 100).toFixed(2) * 1;
                thisState.invoice.sgst = (thisState.invoice.amount * thisState.invoice._sgst / 100).toFixed(2) * 1;
                thisState.invoice.igst = 0;
            }
            thisState.invoice.total = (thisState.invoice.amount + thisState.invoice.cgst + thisState.invoice.sgst + thisState.invoice.igst).toFixed(0) * 1;
            thisState.setMyState(thisState);
        }
    }

    componentDidMount() {
        let thisState = {...this.state, setMyState: this.setMyState, switchFocus: this.switchFocus};
        Promise.all(
            [
                fetch(thisState.INITIAL_URL + "/adminSetting/getAllAdminSettings").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/profile/getMyPrimaryProfile").then(resp => resp.text()),
                fetch(thisState.INITIAL_URL + "/profile/getAllProfiles").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/printer/getAllPrinters").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/printer/getAllWeightPrintFormats").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/printer/getAllInvoicePrintFormats").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/webCam/getAllWebCamDetails").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/webCam/getAllWebCams").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/serialPort/getAllSerialPorts").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/serialPort/getSerialPortDetailByName?name=indicator").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/serialPort/getSerialPortDetailByName?name=display").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/material/getAllMaterials").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/customer/getAllCustomers").then(resp => resp.json()),
                fetch(thisState.INITIAL_URL + "/tareWeight/getAllTareWeights").then(resp => resp.json())
            ]
        ).then(([adminSettings, profile, profiles, printers, weightPrintFormats, invoicePrintFormats, webCamDetails, webCams, serialPorts, indicator, display, materials, customers, tareWeights]) => {
            thisState.adminSettings = adminSettings;
            thisState.PROFILE = profile;
            thisState.profiles = profiles;
            thisState.settings.array.availablePrinters = printers;
            thisState.settings.array.availableWeightPrintFormats = weightPrintFormats;
            thisState.settings.array.availableInvoicetPrintFormats = invoicePrintFormats;
            thisState.webCam.details = webCamDetails;
            webCams = webCams.length === 0 ? ["dummy [0*0]"] : webCams;
            thisState.settings.array.availableWebCams = webCams;
            let webCamSelect = webCamDetails.length === 0 ? [] : webCams.filter(webCam => webCam.startsWith(webCamDetails[0].name + " ["));
            thisState.settings.webCamSelect = webCamSelect.length === 0 ? webCams[0].name : webCamSelect[0];
            thisState.settings.array.availableSerialPorts = serialPorts;
            thisState.settings.indicator = indicator;
            thisState.settings.display = display;
            thisState.configuration.material.list = materials;
            thisState.configuration.customer.list = customers;
            thisState.configuration.tareWeight.list = tareWeights;
            Promise.all(
                [
                    fetch(thisState.INITIAL_URL + "/setting/getAllSettingsByProfile?profile=" + thisState.PROFILE).then(resp => resp.json()),
                    fetch(thisState.INITIAL_URL + "/setting/getNextSlipNoByProfile?profile=" + thisState.PROFILE).then(resp => resp.text()),
                    fetch(thisState.INITIAL_URL + "/setting/getNextInvoiceNoByProfile?profile=" + thisState.PROFILE).then(resp => resp.text())
                ]
            ).then(([settings, slipNo, invoiceNo]) => {
                settings.automation = settings.automation.toLowerCase().indexOf("true") !== -1;
                settings.invoice = settings.invoice.toLowerCase().indexOf("true") !== -1;
                settings.secondWeight = settings.secondWeight.toLowerCase().indexOf("true") !== -1;
                settings.hideCharges = settings.hideCharges.toLowerCase().indexOf("true") !== -1;
                settings.hideCustomerName = settings.hideCustomerName.toLowerCase().indexOf("true") !== -1;
                settings.hideTransporterName = settings.hideTransporterName.toLowerCase().indexOf("true") !== -1;
                settings.hideRemarks = settings.hideRemarks.toLowerCase().indexOf("true") !== -1;
                settings.hideVehicleNo = settings.hideVehicleNo.toLowerCase().indexOf("true") !== -1;
                settings.hideDriverName = settings.hideDriverName.toLowerCase().indexOf("true") !== -1;
                settings.hideTimeOfArrival = settings.hideTimeOfArrival.toLowerCase().indexOf("true") !== -1;
                settings.hideModeOfPayment = settings.hideModeOfPayment.toLowerCase().indexOf("true") !== -1;
                thisState.settings.value = settings;
                thisState.weight.slipNo = slipNo;
                thisState.invoice.invoiceNo = invoiceNo;
                thisState.invoice._sgst = settings.sgst;
                thisState.invoice._cgst = settings.cgst;
                thisState.invoice._igst = settings.igst;
                if (slipNo === -1) {
                    thisState.SETTING_DISABLED = true;
                    thisState.weighing.disable.getWeightDisabled = true;
                }
                if (invoiceNo === -1) {
                    thisState.SETTING_DISABLED = true;
                    thisState.invoices.disable.saveDisabled = true;
                }
                if (thisState.settings.array.availablePrinters.indexOf(thisState.settings.value.printerNameForWeighing) === -1) {
                    thisState.settings.array.availablePrinters.push(thisState.settings.value.printerNameForWeighing);
                }
                if (thisState.settings.array.availablePrinters.indexOf(thisState.settings.value.printerNameForInvoice) === -1) {
                    thisState.settings.array.availablePrinters.push(thisState.settings.value.printerNameForInvoice);
                }
                thisState._WEIGHT = setInterval(() => {
                    fetch(thisState.INITIAL_URL + "/serialPort/getNextWeight").then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw Error();
                        }
                    }).then(result => {
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
                    });
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
            });
        }).catch(() => {
            thisState.weight.slipNo = -1;
            thisState.SETTING_DISABLED = true;
            thisState.weighing.disable.getWeightDisabled = true;
            thisState.loading = false;
            thisState.setMyState(thisState);
        });
    }

    render() {
        let thisState = {
            ...this.state,
            setMyState: this.setMyState,
            calculateInvoiceAmount: this.calculateInvoiceAmount
        };
        if (thisState.loading) {
            return (
                <Container>
                    <Row className="mt-5 pt-5"/>
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
                    <div className="footer-copyright text-center py-1">
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
