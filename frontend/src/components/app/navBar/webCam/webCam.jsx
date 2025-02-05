import React, { Component } from "react";
import { Col, Image } from "react-bootstrap";

class WebCam extends Component {

    constructor(props) {
        super(props);
        this.setMyState = this.setMyState.bind(this);
        this.state = {
            ...props,
            primaryWebCamImage: props.INITIAL_URL + "/webCam/getWebCamImage?fullSize=true&webcam=" + props.webcam + "&rnd=" + Math.random()
        };
    }

    async setMyState(myState) {
        this.setState(myState);
    }

    render() {
        let thisState = { ...this.state, setMyState: this.setMyState };
        return (
            <Col sm="6">
                <Image
                    src={thisState.primaryWebCamImage}
                    style={{
                        width: "100%"
                    }}
                    className="rounded mx-auto d-block"
                    alt=""
                    onLoad={() => {
                        thisState.setMyState({
                            primaryWebCamImage:
                                thisState.INITIAL_URL + "/webCam/getWebCamImage?fullSize=true&webcam=" + thisState.webcam + "&rnd=" + Math.random()
                        });
                    }}
                    onError={async () => {
                        setTimeout(function () {
                            thisState.setMyState({
                                primaryWebCamImage:
                                    thisState.INITIAL_URL + "/webCam/getWebCamImage?fullSize=true&webcam=" + thisState.webcam + "&rnd=" + Math.random()
                            });
                        }, 5000);
                    }}
                    fluid
                />
            </Col>
        );
    };
}

export default WebCam;