import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from '../../logo.svg';

class Header extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">
    <img src={logo} 
        alt=""
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      {' Babulens Enterprises'}
    </Navbar.Brand>
  </Navbar>
    );
  }
}
export default Header;
