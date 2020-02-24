import React from "react";
import logo from "../../assets/images/logo.svg";
import {Card, Col, Row} from "react-bootstrap";

const Header = props => {
    let thisState = props.preState;
    return (
        <Card
            className="text-center w-100"
            style={{
                backgroundColor: "black",
                color: "white"
            }}
        >
            <Card.Header>
                <Row>
                    <Col sm="1">
                        <img
                            src={logo}
                            alt=""
                            width="60"
                            height="60"
                            className="d-inline-block align-top logo"
                        />
                    </Col>
                    <Col sm="10">
                        <Row className="justify-content-center font-weight-bold  h3">
                            {thisState.settings.value.weighbridgeName}
                        </Row>
                        <Row className="justify-content-center h5">
                            {thisState.settings.value.weighbridgeAddress}
                        </Row>
                    </Col>
                </Row>
            </Card.Header>
        </Card>
    );
};

export default Header;
