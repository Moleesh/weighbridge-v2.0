import React from "react";
import { Form, Col, Button, Table, Row } from "react-bootstrap";

import Toggle from "react-bootstrap-toggle";

const TareWeight = props => {
  let thisState = props.preState;
  return (
    <Form className="justify-content-center ">
      <Row className="pb-2">
        <Col sm="2" />
        <Col sm="8" className="pl-3">
          <h4 className="text-center font-weight-bold">Tare Weights</h4>
        </Col>
        <Col sm="2">
          <Row className="justify-content-center">
            <Toggle
              onClick={() => {
                thisState.configuration.tareWeight.unlock = !thisState
                  .configuration.tareWeight.unlock;
                thisState.setMyState(thisState);
              }}
              on="ON"
              off="OFF"
              size="lg"
              offstyle="danger"
              active={thisState.configuration.tareWeight.unlock}
              recalculateOnResize={true}
            />
          </Row>
        </Col>
      </Row>
      <Form.Group>
        <Form.Control
          className="text-center form-control"
          type="text"
          placeholder="Search..."
          value={thisState.configuration.tareWeight.filterText}
          onChange={event => {
            thisState.configuration.tareWeight.filterText = event.target.value;
            thisState.setMyState(thisState);
          }}
        />
      </Form.Group>
      {thisState.configuration.tareWeight.unlock ? (
        <Form.Row>
          {Object.keys(thisState.configuration.tareWeight.template).map(key => (
            <Col className="pb-2" key={key}>
              <Form.Control
                className="text-center form-control"
                type="text"
                name={key}
                autoComplete="off"
                value={thisState.configuration.tareWeight.template[key]}
                onChange={event => {
                  thisState.configuration.tareWeight.template[key] =
                    event.target.value;
                  thisState.setMyState(thisState);
                }}
              />
            </Col>
          ))}
          <Col sm={1}>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                let send = true;
                Object.values(thisState.configuration.tareWeight.template).map(
                  value => {
                    if (value === "") send = false;
                    return null;
                  }
                );
                if (send)
                  fetch(thisState.INITIAL_URL + "/addUpdateTareWeight", {
                    method: "PUT",
                    body: JSON.stringify(
                      thisState.configuration.tareWeight.template
                    ),
                    headers: { "content-type": "application/json" }
                  })
                    .then(response => {
                      if (response.status === 200) {
                        return response.json();
                      } else throw Error(response.statusText);
                    })
                    .then(result => {
                      Object.keys(
                        thisState.configuration.tareWeight.template
                      ).map(
                        key =>
                          (thisState.configuration.tareWeight.template[key] =
                            "")
                      );
                      thisState.setMyState(thisState).then(() => {
                        thisState.configuration.tareWeight.list.push(result);
                        thisState.setMyState(thisState);
                      });
                    })
                    .catch(error => {});
                else {
                  thisState.alerts.push({
                    id: new Date().getTime(),
                    type: "danger",
                    headline: "Empty fields",
                    message: "Found empty fileds while adding Tare Weight"
                  });
                  thisState.setMyState(thisState);
                }
              }}
              className="btn btn-success pull-right"
            >
              Add
            </Button>
          </Col>
        </Form.Row>
      ) : (
        ""
      )}
      <Table hover size="sm">
        <thead>
          <tr>
            {thisState.configuration.tareWeight.header.map(item => (
              <th key={item}>{item}</th>
            ))}
            {thisState.configuration.tareWeight.unlock ? <th /> : null}
          </tr>
        </thead>
        <tbody>
          {thisState.configuration.tareWeight.list.map((item, index) => (
            <tr key={index} className="eachRow">
              {Object.values(item)
                .toString()
                .replace(",", ".")
                .indexOf(thisState.configuration.tareWeight.filterText) ===
              -1 ? null : (
                <React.Fragment>
                  {Object.keys(item)
                    .filter(key => key !== "id")
                    .map(key => (
                      <td key={key + "" + item[key]}>
                        <Col>
                          <Form.Control
                            autoComplete="off"
                            className="text-center form-control"
                            disabled={
                              !(
                                thisState.configuration.tareWeight.unlock &
                                thisState.configuration.tareWeight.editable
                              )
                            }
                            type="text"
                            name={key}
                            id={item["id"]}
                            value={item[key] !== null ? item[key] : ""}
                            onChange={event => {
                              thisState.configuration.tareWeight.list[index][
                                key
                              ] = event.target.value;
                              thisState.setMyState(thisState);
                            }}
                          />
                        </Col>
                      </td>
                    ))}
                  {thisState.configuration.tareWeight.unlock ? (
                    <td>
                      <Row>
                        {thisState.configuration.tareWeight.editable ? (
                          <Col>
                            <Button
                              block
                              variant="warning"
                              onClick={() => {
                                fetch(
                                  thisState.INITIAL_URL +
                                    "/addUpdateTareWeight",
                                  {
                                    method: "PUT",
                                    body: JSON.stringify(
                                      thisState.configuration.tareWeight.list[
                                        index
                                      ]
                                    ),
                                    headers: {
                                      "content-type": "application/json"
                                    }
                                  }
                                )
                                  .then(response => {
                                    if (response.status === 200) {
                                      return response.json();
                                    } else throw Error(response.statusText);
                                  })
                                  .then(result => {})
                                  .catch(error => {});
                              }}
                            >
                              Update
                            </Button>
                          </Col>
                        ) : (
                          ""
                        )}
                        <Col>
                          <Button
                            block
                            variant="danger"
                            onClick={() => {
                              fetch(
                                thisState.INITIAL_URL +
                                  "/deleteTareWeight?id=" +
                                  thisState.configuration.tareWeight.list[index]
                                    .id,
                                {
                                  method: "DELETE"
                                }
                              )
                                .then(response => {
                                  if (response.status === 200) {
                                    thisState.configuration.tareWeight.list.splice(
                                      index,
                                      1
                                    );
                                    thisState.setMyState(thisState);
                                  } else throw Error(response.statusText);
                                })
                                .catch(error => {});
                            }}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  ) : null}
                </React.Fragment>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Form>
  );
};

export default TareWeight;