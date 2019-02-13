import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./app/header";
import NavBar from "./app/navBar";

class App extends Component {
  state = {
    headingLineOne: "Babulens Enterprises",
    headingLineTwo: "Nagercoil",
    slNo: "1",
    Weight: "00000000",
  };
  render() {
    let thisState = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <Header preState={thisState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NavBar preState={thisState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
