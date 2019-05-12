import React from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import DatetimeRangePicker from "react-datetime-range-picker";
import moment from "moment";
import Filter from "./report/filter";

const Report = props => {
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
                inputProps={{ disabled: thisState.report.dateDisabled }}
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
                  fetch(thisState.INITIAL_URL + "/getAllWeight", {
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
                    headers: { "content-type": "application/json" }
                  })
                    .then(response => {
                      if (response.status === 200) {
                        return response.json();
                      } else throw Error(response.statusText);
                    })
                    .then(result => {
                      thisState.report.list = result;
                      thisState.setMyState(thisState);
                    })
                    .catch(error => { });
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
              <Filter preState={thisState} />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover size="sm">
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
                            <Col>
                              {/* {item[key] !== null ? item[key] : ""} */}
                              <Form.Control
                                autoComplete="off"
                                className="text-center form-control reportInputs"
                                disabled
                                type="text"
                                name={key}
                                id={item["id"]}
                                value={item[key] !== null ? item[key] : ""}
                                onChange={event => { }}
                              />
                            </Col>
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
