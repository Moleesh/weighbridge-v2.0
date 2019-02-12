import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class Header extends Component {
  state = {};
  render() {
    return (
      <Alert variant="success">
        <Alert.Heading className="text-center">
          Hey, nice to see you
        </Alert.Heading>
        <p className="mb-0 text-center">Company Address</p>
      </Alert>
    );
  }
}

export default Header;
