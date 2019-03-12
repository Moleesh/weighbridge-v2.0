import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

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
            <Form.Label column sm="6">
              Report Type
            </Form.Label>
            <Col sm="6">
              <Form.Control as="select" column sm="6">
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
        <Col>
          <Form.Group>
            <Form.Label>Label</Form.Label>
            <DateTimeRangePicker
            // onChange={this.onChange}
            // value={this.state.date}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              className="text-center form-control"
              type="text"
              placeholder="Search..."
              value={thisState.report.filterText}
              onChange={event => {
                thisState.report.filterText = event.target.value;
                thisState.setMyState(thisState);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button block variant="danger" onClick={() => {}}>
            Filter
          </Button>
        </Col>
      </Row>
      <Row>
        <Col />
      </Row>
    </Form>
  );
};

export default Report;
