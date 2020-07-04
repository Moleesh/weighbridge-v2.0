import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import DatetimeRangePicker from "react-datetime-range-picker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileDownload, faFilter, faPrint} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import FileSaver from "file-saver";

import Filter from "./report/filter";
import ReportTable from "./report/reportTable";


const Report = props => {
  let thisState = props.preState;
  return (
      <React.Fragment>
        <iframe src={thisState.report.pdfURL}
                disabled={true}
                name="Report Print"
                type="application/pdf"
                onLoad={() => {
                  if (thisState.report.pdfURL !== "") {
                    window.frames["Report Print"].print();
                  }
                }}
                title="Report Print"
                style={{display: "none"}}
                className="none"/>
        <Form className="justify-content-center ">
          <Row className="pb-1">
            <Col className="pl-3">
              <h4 className="text-center font-weight-bold">{thisState.report.type} Report</h4>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <Form.Group as={Row}>
                <Form.Label column sm="4">Report Type</Form.Label>
                <Col sm="8">
                  <Form.Control
                      as="select"
                      value={thisState.report.reportSelect}
                      onChange={event => {
                        thisState.report.reportSelect = event.target.value;
                        switch (event.target.value) {
                          case "Weighing - Full Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Daily Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Weekly Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Monthly Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Custom Date Report":
                            thisState.report.type = "Weighing";
                            thisState.report.dateDisabled = false;
                            thisState.report.inputLabel = "";
                            thisState.report.input = "";
                            thisState.report.inputDisabled = true;
                            break;
                          case "Weighing - Slip No Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Customer Name Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Transporter Name Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Vehicle No Report":
                            thisState.report.type = "Weighing";
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
                          case "Weighing - Material Report":
                            thisState.report.type = "Weighing";
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
                          case "Invoice - Full Report":
                            thisState.report.type = "Invoice";
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
                          case "Invoice - Daily Report":
                            thisState.report.type = "Invoice";
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
                          case "Invoice - Weekly Report":
                            thisState.report.type = "Invoice";
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
                          case "Invoice - Monthly Report":
                            thisState.report.type = "Invoice";
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
                          case "Invoice - Custom Date Report":
                            thisState.report.type = "Invoice";
                            thisState.report.dateDisabled = false;
                            thisState.report.inputLabel = "";
                            thisState.report.input = "";
                            thisState.report.inputDisabled = true;
                            break;
                          case "Invoice - Invoice No Report":
                            thisState.report.type = "Invoice";
                            thisState.report.date = {
                              start: moment([2019, 1, 1]).toDate(),
                              end: moment()
                                  .endOf("year")
                                  .toDate()
                            };
                            thisState.report.dateDisabled = false;
                            thisState.report.inputLabel = "Invoice No";
                            thisState.report.input = "";
                            thisState.report.inputDisabled = false;
                            break;
                          case "Invoice - Reference Slip No Report":
                            thisState.report.type = "Invoice";
                            thisState.report.date = {
                              start: moment([2019, 1, 1]).toDate(),
                              end: moment()
                                  .endOf("year")
                                  .toDate()
                            };
                            thisState.report.dateDisabled = false;
                            thisState.report.inputLabel = "Reference Slip No";
                            thisState.report.input = "";
                            thisState.report.inputDisabled = false;
                            break;
                          case "Invoice - Customer Name Report":
                            thisState.report.type = "Invoice";
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
                          case "Invoice - Vehicle No Report":
                            thisState.report.type = "Invoice";
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
                          case "Invoice - Material Report":
                            thisState.report.type = "Invoice";
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
                    <optgroup label="Weighing">
                      <option value="Weighing - Full Report">Full Report</option>
                      <option value="Weighing - Daily Report">Daily Report</option>
                      <option value="Weighing - Weekly Report">Weekly Report</option>
                      <option value="Weighing - Monthly Report">Monthly Report</option>
                      <option value="Weighing - Custom Date Report">Custom Date Report</option>
                      <option value="Weighing - Slip No Report">Slip No Report</option>
                      <option value="Weighing - Customer Name Report">Customer Name Report</option>
                      <option value="Weighing - Transporter Name Report">Transporter Name Report</option>
                      <option value="Weighing - Vehicle No Report">Vehicle No Report</option>
                      <option value="Weighing - Material Report">Material Report</option>
                    </optgroup>
                    <optgroup label="Invoice">
                      <option value="Invoice - Full Report">Full Report</option>
                      <option value="Invoice - Daily Report">Daily Report</option>
                      <option value="Invoice - Weekly Report">Weekly Report</option>
                      <option value="Invoice - Monthly Report">Monthly Report</option>
                      <option value="Invoice - Custom Date Report">Custom Date Report</option>
                      <option value="Invoice - Invoice No Report">Invoice No Report</option>
                      <option value="Invoice - Reference Slip No Report">Reference Slip No Report</option>
                      <option value="Invoice - Customer Name Report">Customer Name Report</option>
                      <option value="Invoice - Vehicle No Report">Vehicle No Report</option>
                      <option value="Invoice - Material Report">Material Report</option>
                    </optgroup>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col sm="5">
              <Form.Group as={Row}>
                <Form.Label column sm="3">Choose Date</Form.Label>
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
                        switch (thisState.report.type) {
                          case "Weighing":
                            fetch(thisState.INITIAL_URL + "/weight/getWeightReportByProfile", {
                              method: "POST",
                              body: JSON.stringify({
                                startDate: moment(thisState.report.date.start).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                ),
                                endDate: moment(thisState.report.date.end).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                ),
                                inputLabel: thisState.report.inputLabel,
                                input: thisState.report.input,
                                profile: thisState.PROFILE
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
                                  thisState.report.totalWeight = result.totalWeight;
                                  thisState.report.totalTotalCharges =
                                      result.totalTotalCharges;
                                  thisState.setMyState(thisState);
                                })
                                .catch(() => {
                                });
                            break;
                          case "Invoice":
                            fetch(thisState.INITIAL_URL + "/invoice/getInvoiceReportByProfile", {
                              method: "POST",
                              body: JSON.stringify({
                                startDate: moment(thisState.report.date.start).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                ),
                                endDate: moment(thisState.report.date.end).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                ),
                                inputLabel: thisState.report.inputLabel,
                                input: thisState.report.input,
                                profile: thisState.PROFILE
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
                                  thisState.report.totalWeight = result.totalWeight;
                                  thisState.report.totalTotalCharges =
                                      result.totalTotalCharges;
                                  thisState.setMyState(thisState);
                                })
                                .catch(() => {
                                });
                            break;
                          default:
                        }
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
                      placeholder="Search in Records..."
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
                      variant="info"
                      onClick={() => {
                        thisState.report.filterPopUp = true;
                        thisState.setMyState(thisState);
                      }}
                  >
                    <FontAwesomeIcon icon={faFilter} className="mr-3"/>
                    Filter Records
                  </Button>
                  <Filter preState={thisState}/>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className="pb-1">
            <Col sm="8">
              <Row>
                <Col sm="3">
                  <Form.Group as={Row}>
                    <Form.Label column sm="6">Total Records</Form.Label>
                    <Col sm="6">
                      <Form.Control
                          autoComplete="none"
                          className="text-center form-control"
                          disabled
                          value={thisState.report.totalRecords}
                          type="text"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm="5">
                  <Form.Group as={Row}>
                    <Form.Label column
                                sm="6">{thisState.report.type === "Weighing" ? "Total Nett Weight" : "Quatity Sold"}</Form.Label>
                    <Col sm="6">
                      <Form.Control
                          autoComplete="none"
                          className="text-center form-control"
                          disabled
                          value={thisState.report.totalWeight}
                          type="text"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group as={Row}>
                    <Form.Label column
                                sm="6">{thisState.report.type === "Weighing" ? "Total Charges" : "Total Amount"}</Form.Label>
                    <Col sm="6">
                      <Form.Control
                          autoComplete="none"
                          className="text-center form-control"
                          disabled
                          value={thisState.report.totalTotalCharges}
                          type="text"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col sm="4">
              <Row>
                <Col sm="4">
                  <Button variant={thisState.report.edit ? "danger" : "warning"} block onClick={() => {
                    thisState.report.edit = !thisState.report.edit;
                    thisState.setMyState(thisState);
                  }}
                          disabled={!thisState.settings.editEnable}
                          className="none">
                    <FontAwesomeIcon icon={faEdit} className="mr-3"/>
                    Edit {thisState.report.edit ? "ON" : "OFF"}
                  </Button>
                </Col>
                <Col sm="5">
                  <Button variant="secondary" block onClick={() => {
                  }}
                          disabled
                          className="none">
                    <FontAwesomeIcon icon={faFileDownload} className="mr-3"/>Export to Excel</Button>
                </Col>
                <Col sm="3">
                  <Button
                      variant="success"
                      block
                      onClick={() => {
                        let reportTitle = "";
                        switch (thisState.report.reportSelect) {
                          case "Full Report":
                            reportTitle = "Full Report";
                            break;
                          case "Daily Report":
                            reportTitle =
                                "Daily Report : " +
                                moment(thisState.report.date.start).format(
                                    "DD-MM-YYYY"
                                );
                            break;
                          case "Weekly Report":
                            reportTitle =
                                "Weekly Report : " +
                                moment(thisState.report.date.start).format(
                                    "DD-MM-YYYY"
                                ) +
                                " - " +
                                moment(thisState.report.date.end).format("DD-MM-YYYY");
                            break;
                          case "Monthly Report":
                            reportTitle =
                                "Monthly Report : " +
                                moment(thisState.report.date.start).format("MM-YYYY");
                            break;
                          case "Custom Date Report":
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
                          case "Slip No Report":
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
                          case "Customer Name Report":
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
                          case "Transporter Name Report":
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
                          case "Vehicle No Report":
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
                          case "Material Report":
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
                        if (thisState.settings.value.printerNameForWeighing === "get as .pdf File") {
                          fetch(thisState.INITIAL_URL + "/printer/getReportPDF", {
                            method: "POST",
                            body: JSON.stringify({
                              weights: thisState.report.list,
                              printerName: thisState.settings.value.printerNameForWeighing,
                              reportTitle: reportTitle,
                              weighbridgeName:
                              thisState.settings.value.weighbridgeName,
                              weighbridgeAddress:
                              thisState.settings.value.weighbridgeAddress,
                              totalRecords: thisState.report.totalRecords,
                              totalWeight: thisState.report.totalWeight,
                              totalTotalCharges: thisState.report.totalTotalCharges,
                              footer: thisState.settings.value.footer
                            }),
                            headers: {"content-type": "application/json"}
                          }).then(response => {
                            if (response.status !== 200)
                              throw Error(response.statusText);
                            return response.blob();
                          }).then(blob => {
                            if (thisState.settings.value.printerNameForWeighing === "get as .pdf File") {
                              FileSaver.saveAs(blob, "report.pdf");
                            } else {
                              thisState.report.pdfURL = window.URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}));
                              thisState.setMyState(thisState);
                            }
                          }).catch(error => {
                            console.log(error);
                          });
                        } else {
                          fetch(thisState.INITIAL_URL + "/printer/printWeightReport", {
                            method: "POST",
                            body: JSON.stringify({
                              weights: thisState.report.list,
                              printerName: thisState.settings.value.printerNameForWeighing,
                              reportTitle: reportTitle,
                              weighbridgeName:
                              thisState.settings.value.weighbridgeName,
                              weighbridgeAddress:
                              thisState.settings.value.weighbridgeAddress,
                              totalRecords: thisState.report.totalRecords,
                              totalWeight: thisState.report.totalWeight,
                              totalTotalCharges: thisState.report.totalTotalCharges,
                              footer: thisState.settings.value.footer
                            }),
                            headers: {"content-type": "application/json"}
                          }).then(response => {
                            if (response.status !== 200)
                              throw Error(response.statusText);
                          }).catch(error => {
                            console.log(error);
                          });
                        }
                      }}
                  >
                    <FontAwesomeIcon icon={faPrint} className="mr-3"/>Print</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        {
          thisState.report.list.length !== 0 ?
              <ReportTable preState={thisState} className="flex-column"/> : ""
        }
      </React.Fragment>
  );
};

export default Report;
