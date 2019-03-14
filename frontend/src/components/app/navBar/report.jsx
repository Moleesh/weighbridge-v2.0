import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
// import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import DatetimeRangePicker from "react-datetime-range-picker";
// import moment from "moment";
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
              <Form.Control as="select">
                <option>Full</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Slip No</option>
                <option>Customer Name</option>
                <option>Transporter Name</option>
                <option>Vehicle No</option>
                <option>Material</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
        <Col sm="5">
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <DatetimeRangePicker
                startDate={thisState.report.startDate}
                endDate={thisState.report.endDate}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm:ss"
                pickerClassName="col-sm-6 float-left"
                onChange={() => {}}
                isValidEndDate={() => true}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm="4">
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Slip No
            </Form.Label>
            <Col sm="6">
              <Form.Control
                className="text-center"
                // value={thisState.weight.slipNo}
                onChange={event => {
                  thisState.weight.slipNo = event.target.value;
                  thisState.setMyState(thisState);
                }}
              />
            </Col>
            <Col sm="3">
              <Button block variant="primary" onClick={() => {}}>
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
        <Col />
      </Row>
    </Form>
  );
};

export default Report;
