import React from "react";
import ReactDataGrid from 'react-data-grid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const ReportInvoiceTable = props => {

    let thisState = props.preState;

    return (
        <ReactDataGrid
            enableRowSelect={null}
            rowScrollTimeout={null}
            columns={[
                {
                    key: "referenceSlipNo",
                    name: "Reference Slip No",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.referenceSlipNo ? "" : 0.01
                },
                {
                    key: "invoiceTime",
                    name: "Invoice Time",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.invoiceTime ? "" : 0.01
                },
                {
                    key: "customersName",
                    name: "Customer Name",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.customersName ? "" : 0.01
                },
                {
                    key: "gstin",
                    name: "GSTIN",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.gstin ? "" : 0.01
                },
                {
                    key: "address1",
                    name: "Address Line 1",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.address1 ? "" : 0.01
                },
                {
                    key: "address2",
                    name: "Address Line 2",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.address2 ? "" : 0.01
                },
                {
                    key: "vehicleNo",
                    name: "Vehicle No",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.vehicleNo ? "" : 0.01
                },
                {
                    key: "timeOfArrival",
                    name: "Time Of Arrival",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.timeOfArrival ? "" : 0.01
                },
                {
                    key: "material",
                    name: "Material",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.material ? "" : 0.01
                },

                {
                    key: "unitPrice",
                    name: "Unit Price",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.unitPrice ? "" : 0.01
                },
                {
                    key: "quantity",
                    name: "Quantity",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.quantity ? "" : 0.01
                },
                {
                    key: "amount",
                    name: "Amount",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.amount ? "" : 0.01
                },
                {
                    key: "_cgst",
                    name: "CGST %",
                    editable: thisState.report.edit,
                    width: thisState.report.filter._cgst ? "" : 0.01
                },
                {
                    key: "cgst",
                    name: "CGST",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.cgst ? "" : 0.01
                },
                {
                    key: "_sgst",
                    name: "SGST %",
                    editable: thisState.report.edit,
                    width: thisState.report.filter._sgst ? "" : 0.01
                },
                {
                    key: "sgst",
                    name: "SGST",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.sgst ? "" : 0.01
                },
                {
                    key: "_igst",
                    name: "IGST %",
                    editable: thisState.report.edit,
                    width: thisState.report.filter._igst ? "" : 0.01
                },
                {
                    key: "igst",
                    name: "IGST",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.igst ? "" : 0.01
                },
                {
                    key: "total",
                    name: "Total",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.total ? "" : 0.01
                },
                {key: "profile", name: "Profile", width: 0.01},
                {key: "invoiceNo", name: "Invoice No", width: 100}
            ]}
            rowGetter={row => thisState.report.list.filter((item) => Object.values(item)
                .toString()
                .replace(",", ".")
                .indexOf(thisState.report.filterText) !== -1)[row]}
            rowsCount={thisState.report.list.length}
            enableCellSelect={true}
            getCellActions={(column, row) => {
                return thisState.report.edit ? {
                    invoiceNo: [
                        {
                            icon: <FontAwesomeIcon icon={faSave} className="mt-2 hand"/>,
                            callback: () => {
                                fetch(thisState.INITIAL_URL + "/invoice/updateInvoice", {
                                    method: "POST",
                                    body: JSON.stringify(row),
                                    headers: {"content-type": "application/json"}
                                })
                                    .then(response => {
                                        if (response.status === 200) {
                                            thisState.alerts.push({
                                                id: new Date().getTime(),
                                                type: "success",
                                                headline: "Record Update",
                                                message: "Record Update Successful."
                                            });
                                        } else throw Error(response.statusText);
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
            onGridRowsUpdated={({fromRow, updated}) => {
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

export default ReportInvoiceTable;
