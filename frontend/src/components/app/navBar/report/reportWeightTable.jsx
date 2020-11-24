import React from "react";
import ReactDataGrid, {TextEditor} from 'react-data-grid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const ReportWeightTable = props => {

    let thisState = props.preState;

    return (
        <ReactDataGrid
            columns={[
                {
                    key: "slipNo",
                    name: "Slip No",
                    formatter({row}) {
                        function callback() {
                            fetch(thisState.INITIAL_URL + "/weight/updateWeight", {
                                method: "POST",
                                body: JSON.stringify(row),
                                headers: {"content-type": "application/json"}
                            }).then(response => {
                                if (response.status === 200) {
                                    thisState.alerts.push({
                                        id: new Date().getTime(),
                                        type: "success",
                                        headline: "Record Update",
                                        message: "Record Update Successful."
                                    });
                                } else throw Error(response.statusText);
                            }).catch(() => {
                                thisState.alerts.push({
                                    id: new Date().getTime(),
                                    type: "danger",
                                    headline: "Record Update",
                                    message: "Record Update Failed, Please check the value entered."
                                });
                                thisState.setMyState(thisState);
                            });
                        }

                        return (
                            <React.Fragment>
                                {thisState.report.edit ?
                                    <FontAwesomeIcon onClick={callback} icon={faSave} className="mr-2 hand"/> : ""}
                                <span>{row.slipNo}</span>
                            </React.Fragment>
                        );

                    }
                },
                {
                    key: "vehicleNo",
                    name: "Vehicle No",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.vehicleNo ? "" : 0,
                    maxWidth: thisState.report.filter.vehicleNo ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "material",
                    name: "Material",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.material ? "" : 0,
                    maxWidth: thisState.report.filter.material ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "customersName",
                    name: "Customer Name",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.customersName ? "" : 0,
                    maxWidth: thisState.report.filter.customersName ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "transporterName",
                    name: "Transporter Name",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.transporterName ? "" : 0,
                    maxWidth: thisState.report.filter.transporterName ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "grossWeight",
                    name: "Gross Weight",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.grossWeight ? "" : 0,
                    maxWidth: thisState.report.filter.grossWeight ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "grossTime",
                    name: "Gross Time",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.grossTime ? "" : 0,
                    maxWidth: thisState.report.filter.grossTime ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "tareWeight",
                    name: "Tare Weight",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.tareWeight ? "" : 0,
                    maxWidth: thisState.report.filter.tareWeight ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "tareTime",
                    name: "Tare Time",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.tareTime ? "" : 0,
                    maxWidth: thisState.report.filter.tareTime ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "nettWeight",
                    name: "Nett Weight",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.nettWeight ? "" : 0,
                    maxWidth: thisState.report.filter.nettWeight ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "nettTime",
                    name: "Nett Time",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.nettTime ? "" : 0,
                    maxWidth: thisState.report.filter.nettTime ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "charges",
                    name: "Charges",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.charges ? "" : 0,
                    maxWidth: thisState.report.filter.charges ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "remarks",
                    name: "Remarks",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.remarks ? "" : 0,
                    maxWidth: thisState.report.filter.remarks ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "manual",
                    name: "Manual",
                    width: thisState.report.filter.manual ? "" : 0,
                    maxWidth: thisState.report.filter.manual ? "" : 0
                },
                {
                    key: "profile",
                    name: "Profile",
                    width: 0,
                    maxWidth: 0,
                },
            ]}
            onRowsChange={(newRows) => {
                thisState.report.list = newRows;
                thisState.setMyState(thisState);
            }}
            rows={thisState.report.list.filter((item) => thisState.report.edit || Object.values(item).toString().replaceAll(",", ".").indexOf(thisState.report.filterText) !== -1)}
        />
    );
};

export default ReportWeightTable;
