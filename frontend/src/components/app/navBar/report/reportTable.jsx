import React from "react";
import ReactDataGrid from 'react-data-grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const ReportTable = props => {

    let thisState = props.preState;

    return (
        <React.Fragment>
            {thisState.report.list.length !== 0 ?
                <ReactDataGrid
                    columns={[
                        { key: "vehicleNo", name: "Vehicle No", editable: thisState.report.edit, width: thisState.report.filter.vehicleNo ? "" : -1 },
                        { key: "material", name: "Material", editable: thisState.report.edit, width: thisState.report.filter.material ? "" : -1 },
                        { key: "customersName", name: "Customer Name", editable: thisState.report.edit, width: thisState.report.filter.customersName ? "" : -1 },
                        { key: "transporterName", name: "Transporter Name", editable: thisState.report.edit, width: thisState.report.filter.transporterName ? "" : -1 },
                        { key: "grossWeight", name: "Gross Weight", editable: thisState.report.edit, width: thisState.report.filter.grossWeight ? "" : -1 },
                        { key: "grossTime", name: "Gross Time", editable: thisState.report.edit, width: thisState.report.filter.grossTime ? "" : -1 },
                        { key: "tareWeight", name: "Tare Weight", editable: thisState.report.edit, width: thisState.report.filter.tareWeight ? "" : -1 },
                        { key: "tareTime", name: "Tare Time", editable: thisState.report.edit, width: thisState.report.filter.tareTime ? "" : -1 },
                        { key: "nettWeight", name: "Nett Weight", editable: thisState.report.edit, width: thisState.report.filter.nettWeight ? "" : -1 },
                        { key: "nettTime", name: "Nett Time", editable: thisState.report.edit, width: thisState.report.filter.nettTime ? "" : -1 },
                        { key: "charges", name: "Charges", editable: thisState.report.edit, width: thisState.report.filter.charges ? "" : -1 },
                        { key: "remarks", name: "Remarks", editable: thisState.report.edit, width: thisState.report.filter.remarks ? "" : -1 },
                        { key: "manual", name: "Manual", width: thisState.report.filter.manual ? "" : -1 },
                        { key: "slipNo", name: "Slip No" },
                    ]}
                    rowGetter={row => thisState.report.list.filter((item) => Object.values(item)
                        .toString()
                        .replace(",", ".")
                        .indexOf(thisState.report.filterText) !== -1)[row]}
                    rowsCount={thisState.report.list.length}
                    enableCellSelect={true}
                    getCellActions={(column, row) => {
                        return thisState.report.edit ? {
                            slipNo: [
                                {
                                    icon: <FontAwesomeIcon icon={faSave} className="mt-2 hand" />,
                                    callback: () => {
                                        fetch(thisState.INITIAL_URL + "/updateWeight", {
                                            method: "POST",
                                            body: JSON.stringify(row),
                                            headers: { "content-type": "application/json" }
                                        })
                                            .then(response => {
                                                if (response.status === 200) {
                                                    thisState.alerts.push({
                                                        id: new Date().getTime(),
                                                        type: "success",
                                                        headline: "Record Update",
                                                        message: "Record Update Successful."
                                                    });
                                                }
                                                else throw Error(response.statusText);
                                            })
                                            .catch(() => {
                                                thisState.alerts.push({
                                                    id: new Date().getTime(),
                                                    type: "danger",
                                                    headline: "Record Update",
                                                    message: "Record Update Failed."
                                                });
                                                thisState.setMyState(thisState);
                                            });
                                    }
                                }
                            ]
                        }[column.key] : ""
                    }}
                    onGridRowsUpdated={({ fromRow, updated }) => {
                        let key = Object.keys(updated)[0];
                        thisState.report.list.filter((item) => Object.values(item)
                            .toString()
                            .replace(",", ".")
                            .indexOf(thisState.report.filterText) !== -1)[fromRow][key] = updated[key];
                        thisState.setMyState(thisState).then(() => {
                            thisState.report.edit = false;
                            thisState.setMyState(thisState).then(() => {
                                thisState.report.edit = true;
                                thisState.setMyState(thisState)
                            }
                            );
                        }
                        );
                    }}
                />
                : ""}
        </React.Fragment>
    );
};

export default ReportTable;

// columns={thisState.report.header}
// initialData={thisState.report.list}

