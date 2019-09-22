import React from "react";
import { Form, Col, Row, Image, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
const CameraSettings = props => {
  let thisState = props.preState;
  return (
    <Form>
      <Row className="pb-5">
        <Col>
          <h4 className="text-center font-weight-bold">Camera Settings</h4>
        </Col>
      </Row>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Camera Name
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={thisState.setting.value.cameraName}
            onChange={event => {
              thisState.setting.value.cameraName = event.target.value;
              thisState.setMyState(thisState);
            }}
          >
            {thisState.setting.array.availableCameras.map((item, index) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Camera X-Axis
        </Form.Label>
        <Col sm="9">
          <div className="input-number">
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraXAxis - 5 < 0) return;
                thisState.setting.value.cameraXAxis =
                  thisState.setting.value.cameraXAxis - 5;
                thisState.setMyState(thisState);
              }}
            >
              -
            </button>
            <span>{thisState.setting.value.cameraXAxis}</span>
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraXAxis * 1 + 5 > 10000) return;
                thisState.setting.value.cameraXAxis =
                  thisState.setting.value.cameraXAxis * 1 + 5;
                thisState.setMyState(thisState);
              }}
            >
              +
            </button>
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Camera Y-Axis
        </Form.Label>
        <Col sm="9">
          <div className="input-number">
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraYAxis - 5 < 0) return;
                thisState.setting.value.cameraYAxis =
                  thisState.setting.value.cameraYAxis - 5;
                thisState.setMyState(thisState);
              }}
            >
              -
            </button>
            <span>{thisState.setting.value.cameraYAxis}</span>
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraYAxis * 1 + 5 > 10000) return;
                thisState.setting.value.cameraYAxis =
                  thisState.setting.value.cameraYAxis * 1 + 5;
                thisState.setMyState(thisState);
              }}
            >
              +
            </button>
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Camera Width
        </Form.Label>
        <Col sm="9">
          <div className="input-number">
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraWidth - 5 <= 0) return;
                thisState.setting.value.cameraWidth =
                  thisState.setting.value.cameraWidth - 5;
                thisState.setMyState(thisState);
              }}
            >
              -
            </button>
            <span>{thisState.setting.value.cameraWidth}</span>
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraWidth * 1 + 5 > 10000) return;
                thisState.setting.value.cameraWidth =
                  thisState.setting.value.cameraWidth * 1 + 5;
                thisState.setMyState(thisState);
              }}
            >
              +
            </button>
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Camera Height
        </Form.Label>
        <Col sm="9">
          <div className="input-number">
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraHeight - 5 <= 0) return;
                thisState.setting.value.cameraHeight =
                  thisState.setting.value.cameraHeight - 5;
                thisState.setMyState(thisState);
              }}
            >
              -
            </button>
            <span>{thisState.setting.value.cameraHeight}</span>
            <button
              type="button"
              onClick={() => {
                if (thisState.setting.value.cameraHeight * 1 + 5 > 10000)
                  return;
                thisState.setting.value.cameraHeight =
                  thisState.setting.value.cameraHeight * 1 + 5;
                thisState.setMyState(thisState);
              }}
            >
              +
            </button>
          </div>
        </Col>
      </Form.Group>
      <Row className="pb-3">
        {thisState.weighing.cameraImage ? (
          <Image
            src={thisState.weighing.cameraImage}
            style={{ width: 300 }}
            className="rounded mx-auto d-block"
            alt="No Camera Available"
            fluid
          />
        ) : (
          ""
        )}
      </Row>
      <Button
        variant="light"
        size="lg"
        onClick={() => {
          fetch(thisState.INITIAL_URL + "/settingUpCamera")
            .then(response => {
              if (response.status === 200) {
                thisState.alerts.push({
                  id: new Date().getTime(),
                  type: "success",
                  headline: "Camera Settings Refreshed",
                  message: "Camera Settings Refreshed Successfully."
                });
                thisState.setMyState(thisState);
              } else throw Error(response.statusText);
            })
            .catch(error => {});
        }}
      >
        <FontAwesomeIcon icon={faSync} spin className="mr-3" />
        Refresh Camera Settings
      </Button>
    </Form>
  );
};

export default CameraSettings;
