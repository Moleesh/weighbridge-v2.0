import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class GrossTareSelector extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Form.Check
          type="radio"
          name="Gross-Tare-Selector"
          label="Gross"
          defaultChecked
        />
        <Form.Check type="radio" name="Gross-Tare-Selector" label="Tare" />
      </React.Fragment>
    );
  }
}

export default GrossTareSelector;
