import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./app/header";
import NavBar from "./app/navBar";

class App extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <NavBar />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
