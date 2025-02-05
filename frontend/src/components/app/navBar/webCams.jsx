import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import WebCam from "./webCam/webCam";

const WebCams = props => {
    let thisState = props.preState;
    return (

        <Form className="pt-3 px-3">
            <Form.Group as={Row} onChange={event => {
                let index = thisState.webcams.indexOf(event.target.value);
                if (event.target.checked && index === -1) {
                    thisState.webcams.push(event.target.value)
                } else if (index !== -1) {
                    thisState.webcams.splice(index, 1)
                }
                thisState.setMyState(thisState);
            }}>
                <Form.Label column sm="2">
                    Select the WebCams :
                </Form.Label>
                {
                    thisState.settings.array.availableWebCams.map(webcam =>
                    (
                        <Col sm="2" key={webcam.split(" [")[0]}>
                            <Form.Check
                                type="checkbox"
                                label={webcam.split(" [")[0]}
                                value={webcam.split(" [")[0]}
                            />
                        </Col>
                    )
                    )
                }
            </Form.Group>
            <Row>
                {thisState.webcams.map(webcam => (<WebCam webcam={webcam} INITIAL_URL={thisState.INITIAL_URL} />))}
            </Row>
        </Form>

    );
};

export default WebCams;
