import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./app/header";
import NavBar from "./app/navBar";

class App extends Component {
  state = {};
  render() {
    return (
      <Container fluid={true}>
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
