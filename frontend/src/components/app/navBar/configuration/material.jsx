import React from "react";

import Toggle from "react-bootstrap-toggle";

const Material = props => {
  let thisState = props.preState;
  return (
    <React.Fragment className="justify-content-center ">
      <h4 className="text-center font-weight-bold">Material</h4>
      <input
        type="text"
        placeholder="Search..."
        value={thisState.configuration.material.filterText}
        onChange={event => {
          thisState.configuration.material.filterText = event.target.value;
          thisState.setMyState(thisState);
        }}
      />

      <Toggle
        onClick={() => {
          thisState.configuration.material.unlock = !thisState.configuration
            .material.unlock;
          thisState.setMyState(thisState);
        }}
        on="ON"
        off="OFF"
        size="lg"
        offstyle="danger"
        active={thisState.configuration.material.unlock}
        recalculateOnResize={true}
      />
      {thisState.configuration.material.unlock ? (
        <React.Fragment>
          {Object.keys(thisState.configuration.material.template).map(key => (
            <input
              type="text"
              name={key}
              id={thisState.configuration.material.template["materialId"]}
              value={thisState.configuration.material.template[key]}
              onChange={event => {
                thisState.configuration.material.template[key] =
                  event.target.value;
                thisState.setMyState(thisState);
              }}
            />
          ))}
          <button
            type="button"
            onClick={() => {
              thisState.configuration.material.list.push(
                thisState.configuration.material.template
              );
              thisState.setMyState(thisState);
            }}
            className="btn btn-success pull-right"
          >
            Add
          </button>{" "}
        </React.Fragment>
      ) : (
        ""
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            {thisState.configuration.material.header.map(item => (
              <th>{item}</th>
            ))}
            {thisState.configuration.material.unlock ? <th /> : ""}
          </tr>
        </thead>
        <tbody>
          {thisState.configuration.material.list.map((item, index) => (
            <tr className="eachRow">
              {Object.values(item)
                .toString()
                .replace(",", ".")
                .indexOf(thisState.configuration.material.filterText) === -1 ? (
                ""
              ) : (
                <React.Fragment>
                  {" "}
                  {Object.keys(item).map(key => (
                    <td>
                      <input
                        disabled={!thisState.configuration.material.unlock}
                        type="text"
                        name={key}
                        id={item["materialId"]}
                        value={item[key]}
                        onChange={event => {
                          thisState.configuration.material.list[index][key] =
                            event.target.value;
                          thisState.setMyState(thisState);
                        }}
                      />
                    </td>
                  ))}
                  {thisState.configuration.material.unlock ? (
                    <td className="del-cell">
                      <input
                        type="button"
                        onClick={() => {}}
                        value="update"
                        className=""
                      />
                      <input
                        type="button"
                        onClick={() => {
                          thisState.configuration.material.list.splice(
                            index,
                            1
                          );
                          thisState.setMyState(thisState);
                        }}
                        value="remove"
                        className=""
                      />
                    </td>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Material;
