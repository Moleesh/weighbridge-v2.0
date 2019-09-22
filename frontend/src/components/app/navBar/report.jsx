import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import DatetimeRangePicker from "react-datetime-range-picker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faPrint} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import FileSaver from "file-saver";

import Filter from "./report/filter";

const Report = props => {
    // noinspection JSUnresolvedVariable
    let thisState = props.preState;
    return (
        <Form className="justify-content-center ">
            <Row className="pb-1">
                <Col className="pl-3">
                    <h4 className="text-center font-weight-bold">Report</h4>
                </Col>
            </Row>
            <Row>
                <Col sm="3">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Report Type
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                as="select"
                                value={thisState.report.reportSelect}
                                onChange={event => {
                                    thisState.report.reportSelect = event.target.value;
                                    switch (event.target.value) {
                                        case "Full":
                                            thisState.report.date = {
                                                start: moment([2019, 1, 1]).toDate(),
                                                end: moment()
                                                    .endOf("year")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = true;
                                            thisState.report.inputLabel = "";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = true;
                                            break;
                                        case "Daily":
                                            thisState.report.date = {
                                                start: moment()
                                                    .startOf("day")
                                                    .toDate(),
                                                end: moment()
                                                    .endOf("day")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = true;
                                            thisState.report.inputLabel = "";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = true;
                                            break;
                                        case "Weekly":
                                            thisState.report.date = {
                                                start: moment()
                                                    .startOf("week")
                                                    .toDate(),
                                                end: moment()
                                                    .endOf("week")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = true;
                                            thisState.report.inputLabel = "";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = true;
                                            break;
                                        case "Monthly":
                                            thisState.report.date = {
                                                start: moment()
                                                    .startOf("month")
                                                    .toDate(),
                                                end: moment()
                                                    .endOf("month")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = true;
                                            thisState.report.inputLabel = "";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = true;
                                            break;
                                        case "Custom Date":
                                            thisState.report.dateDisabled = false;
                                            thisState.report.inputLabel = "";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = true;
                                            break;
                                        case "Slip No":
                                            thisState.report.date = {
                                                start: moment([2019, 1, 1]).toDate(),
                                                end: moment()
                                                    .endOf("year")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = false;
                                            thisState.report.inputLabel = "Slip No";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = false;
                                            break;
                                        case "Customer Name":
                                            thisState.report.date = {
                                                start: moment([2019, 1, 1]).toDate(),
                                                end: moment()
                                                    .endOf("year")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = false;
                                            thisState.report.inputLabel = "Customer Name";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = false;
                                            break;
                                        case "Transporter Name":
                                            thisState.report.date = {
                                                start: moment([2019, 1, 1]).toDate(),
                                                end: moment()
                                                    .endOf("year")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = false;
                                            thisState.report.inputLabel = "Transporter Name";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = false;
                                            break;
                                        case "Vehicle No":
                                            thisState.report.date = {
                                                start: moment([2019, 1, 1]).toDate(),
                                                end: moment()
                                                    .endOf("year")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = false;
                                            thisState.report.inputLabel = "Vehicle No";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = false;
                                            break;
                                        case "Material":
                                            thisState.report.date = {
                                                start: moment([2019, 1, 1]).toDate(),
                                                end: moment()
                                                    .endOf("year")
                                                    .toDate()
                                            };
                                            thisState.report.dateDisabled = false;
                                            thisState.report.inputLabel = "Material";
                                            thisState.report.input = "";
                                            thisState.report.inputDisabled = false;
                                            break;
                                        default:
                                    }
                                    thisState.setMyState(thisState);
                                }}
                            >
                                <option value="Full">Full</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Custom Date">Custom Date</option>
                                <option value="Slip No">Slip No</option>
                                <option value="Customer Name">Customer Name</option>
                                <option value="Transporter Name">Transporter Name</option>
                                <option value="Vehicle No">Vehicle No</option>
                                <option value="Material">Material</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="5">
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                            Choose Date
                        </Form.Label>
                        <Col sm="9">
                            <DatetimeRangePicker
                                startDate={thisState.report.date.start}
                                endDate={thisState.report.date.end}
                                dateFormat="DD-MM-YYYY"
                                timeFormat="HH:mm:ss"
                                pickerClassName="col-sm-6 float-left"
                                onChange={date => {
                                    thisState.report.date = date;
                                    thisState.setMyState(thisState);
                                }}
                                isValidEndDate={() => true}
                                inputProps={{disabled: thisState.report.dateDisabled}}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            {thisState.report.inputLabel}
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                className="text-center reportInputs"
                                value={thisState.report.input}
                                onChange={event => {
                                    thisState.report.input = event.target.value;
                                    thisState.setMyState(thisState);
                                }}
                                disabled={thisState.report.inputDisabled}
                            />
                        </Col>
                        <Col sm="2">
                            <Button
                                block
                                variant="primary"
                                onClick={() => {
                                    fetch(thisState.INITIAL_URL + "/getReport", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            startDate: moment(thisState.report.date.start).format(
                                                "DD-MM-YYYY HH:mm:ss"
                                            ),
                                            endDate: moment(thisState.report.date.end).format(
                                                "DD-MM-YYYY HH:mm:ss"
                                            ),
                                            inputLabel: thisState.report.inputLabel,
                                            input: thisState.report.input
                                        }),
                                        headers: {"content-type": "application/json"}
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                return response.json();
                                            } else throw Error(response.statusText);
                                        })
                                        .then(result => {
                                            thisState.report.list = result.weights;
                                            thisState.report.totalRecords = result.totalRecords;
                                            thisState.report.totalNettWeight = result.totalNettWeight;
                                            thisState.report.totalTotalCharges =
                                                result.totalTotalCharges;
                                            thisState.setMyState(thisState);
                                        })
                                        .catch(() => {
                                        });
                                }}
                            >
                                Go
                            </Button>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Col sm="9">
                            <Form.Control
                                className="text-center form-control"
                                type="text"
                                placeholder="Search Records..."
                                value={thisState.report.filterText}
                                onChange={event => {
                                    thisState.report.filterText = event.target.value;
                                    thisState.setMyState(thisState);
                                }}
                            />
                        </Col>
                        <Col sm="3">
                            <Button
                                block
                                variant="danger"
                                onClick={() => {
                                    thisState.report.filterPopUp = true;
                                    thisState.setMyState(thisState);
                                }}
                            >
                                Filter
                            </Button>
                            <Filter preState={thisState}/>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="pb-1">
                <Col sm="3">
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">
                            Total Records
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                autoComplete="off"
                                className="text-center form-control"
                                disabled
                                value={thisState.report.totalRecords}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="3">
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">
                            Total Nett Weight
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                autoComplete="off"
                                className="text-center form-control"
                                disabled
                                value={thisState.report.totalNettWeight}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="3">
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">
                            Total Charges
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                autoComplete="off"
                                className="text-center form-control"
                                disabled
                                value={thisState.report.totalTotalCharges}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="3">
                    <Row>
                        <Col sm="7">
                            <Button variant="primary" block onClick={() => {
                            }} disabled>
                                <FontAwesomeIcon icon={faFileDownload} className="mr-3"/>
                                Export as Excel
                            </Button>
                        </Col>
                        <Col sm="5">
                            <Button
                                variant="warning"
                                block
                                onClick={() => {
                                    let reportTitle = "";
                                    switch (thisState.report.reportSelect) {
                                        case "Full":
                                            reportTitle = "Full Report";
                                            break;
                                        case "Daily":
                                            reportTitle =
                                                "Daily Report : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY"
                                                );
                                            break;
                                        case "Weekly":
                                            reportTitle =
                                                "Weekly Report : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format("DD-MM-YYYY");
                                            break;
                                        case "Monthly":
                                            reportTitle =
                                                "Monthly Report : " +
                                                moment(thisState.report.date.start).format("MM-YYYY");
                                            break;
                                        case "Custom Date":
                                            reportTitle =
                                                "Custom Report : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                );
                                            break;
                                        case "Slip No":
                                            reportTitle =
                                                "Slip No Report (" +
                                                thisState.report.input +
                                                ") : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                );
                                            break;
                                        case "Customer Name":
                                            reportTitle =
                                                "Customer Report (" +
                                                thisState.report.input +
                                                ") : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                );
                                            break;
                                        case "Transporter Name":
                                            reportTitle =
                                                "Transporter Report (" +
                                                thisState.report.input +
                                                ") : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                );
                                            break;
                                        case "Vehicle No":
                                            reportTitle =
                                                "Vehicle No Report (" +
                                                thisState.report.input +
                                                ") : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                );
                                            break;
                                        case "Material":
                                            reportTitle =
                                                "Material Report (" +
                                                thisState.report.input +
                                                ") : " +
                                                moment(thisState.report.date.start).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                ) +
                                                " - " +
                                                moment(thisState.report.date.end).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                );
                                            break;
                                        default:
                                    }
                                    if (
                                        thisState.setting.value.printerName === "get as .pdf File"
                                    ) {
                                        fetch(thisState.INITIAL_URL + "/getReportPDF", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                weights: thisState.report.list,
                                                printerName: thisState.setting.value.printerName,
                                                reportTitle: reportTitle,
                                                weighbridgeName:
                                                thisState.setting.value.weighbridgeName,
                                                weighbridgeAddress:
                                                thisState.setting.value.weighbridgeAddress,
                                                totalRecords: thisState.report.totalRecords,
                                                totalNettWeight: thisState.report.totalNettWeight,
                                                totalTotalCharges: thisState.report.totalTotalCharges,
                                                footer: thisState.setting.value.footer
                                            }),
                                            headers: {"content-type": "application/json"}
                                        })
                                            .then(response => {
                                                if (response.status !== 200)
                                                    throw Error(response.statusText);
                                                return response.blob();
                                            })
                                            .then(blob => {
                                                console.log(blob);
                                                FileSaver.saveAs(blob, "report.pdf");
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            });
                                    } else {
                                        fetch(thisState.INITIAL_URL + "/printReport", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                weights: thisState.report.list,
                                                printerName: thisState.setting.value.printerName,
                                                reportTitle: reportTitle,
                                                weighbridgeName:
                                                thisState.setting.value.weighbridgeName,
                                                weighbridgeAddress:
                                                thisState.setting.value.weighbridgeAddress,
                                                totalRecords: thisState.report.totalRecords,
                                                totalNettWeight: thisState.report.totalNettWeight,
                                                totalTotalCharges: thisState.report.totalTotalCharges,
                                                footer: thisState.setting.value.footer
                                            }),
                                            headers: {"content-type": "application/json"}
                                        })
                                            .then(response => {
                                                if (response.status !== 200)
                                                    throw Error(response.statusText);
                                            })
                                            .catch(() => {
                                            });
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faPrint} className="mr-3"/>
                                Print
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table hover responsive size="sm">
                        <thead>
                        <tr className="contentCenter">
                            {Object.keys(thisState.report.header)
                                .filter(key => thisState.report.filter[key])
                                .map(key => (
                                    <th key={key}>{thisState.report.header[key]}</th>
                                ))}
                        </tr>
                        </thead>
                        <tbody>
                        {thisState.report.list.map((item, index) =>
                            Object.values(item)
                                .toString()
                                .replace(",", ".")
                                .indexOf(thisState.report.filterText) === -1 ? null : (
                                <tr key={index} className="eachRow">
                                    {Object.keys(item)
                                        .filter(key => thisState.report.filter[key])
                                        .map(key => (
                                            <td
                                                key={key + "" + item[key]}
                                                className="contentCenter"
                                            >
                                                {item[key] !== null ? item[key] : ""}
                                                {/* <Form.Control
                            autoComplete="off"
                            className="text-center form-control reportInputs"
                            disabled
                            type="text"
                            name={key}
                            id={item["id"]}
                            value={item[key] !== null ? item[key] : ""}
                            onChange={event => {}}
                          /> */}
                                            </td>
                                        ))}
                                </tr>
                            )
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Form>
    );
};

export default Report;
