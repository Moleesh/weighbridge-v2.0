import React from "react";
import ReactDataGrid from 'react-data-grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const ReportTable = props => {

    let thisState = props.preState;

    return (
        <ReactDataGrid
            enableRowSelect={null}
            rowScrollTimeout={null}
            columns={[
                { key: "vehicleNo", name: "Vehicle No", editable: thisState.report.edit, width: thisState.report.filter.vehicleNo ? "" : 0.01 },
                { key: "material", name: "Material", editable: thisState.report.edit, width: thisState.report.filter.material ? "" : 0.01 },
                { key: "customersName", name: "Customer Name", editable: thisState.report.edit, width: thisState.report.filter.customersName ? "" : 0.01 },
                { key: "transporterName", name: "Transporter Name", editable: thisState.report.edit, width: thisState.report.filter.transporterName ? "" : 0.01 },
                { key: "grossWeight", name: "Gross Weight", editable: thisState.report.edit, width: thisState.report.filter.grossWeight ? "" : 0.01 },
                { key: "grossTime", name: "Gross Time", editable: thisState.report.edit, width: thisState.report.filter.grossTime ? 160 : 0.01 },
                { key: "tareWeight", name: "Tare Weight", editable: thisState.report.edit, width: thisState.report.filter.tareWeight ? "" : 0.01 },
                { key: "tareTime", name: "Tare Time", editable: thisState.report.edit, width: thisState.report.filter.tareTime ? 160 : 0.01 },
                { key: "nettWeight", name: "Nett Weight", editable: thisState.report.edit, width: thisState.report.filter.nettWeight ? "" : 0.01 },
                { key: "nettTime", name: "Nett Time", editable: thisState.report.edit, width: thisState.report.filter.nettTime ? 160 : 0.01 },
                { key: "charges", name: "Charges", editable: thisState.report.edit, width: thisState.report.filter.charges ? 100 : 0.01 },
                { key: "remarks", name: "Remarks", editable: thisState.report.edit, width: thisState.report.filter.remarks ? "" : 0.01 },
                { key: "manual", name: "Manual", width: thisState.report.filter.manual ? "" : 0.01 },
                { key: "slipNo", name: "Slip No", width: 100 }
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
    );
};

export default ReportTable;
