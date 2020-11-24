import React from "react";
import ReactDataGrid, {TextEditor} from 'react-data-grid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const ReportInvoiceTable = props => {

    let thisState = props.preState;
    return (
        <ReactDataGrid
            columns={[
                {
                    key: "invoiceNo",
                    name: "Invoice No",
                    formatter({row}) {
                        function callback() {
                            fetch(thisState.INITIAL_URL + "/invoice/updateInvoice", {
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
                                <span>{row.invoiceNo}</span>
                            </React.Fragment>
                        );

                    }
                },
                {
                    key: "referenceSlipNo",
                    name: "Reference Slip No",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.referenceSlipNo ? "" : 0,
                    maxWidth: thisState.report.filter.referenceSlipNo ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "invoiceTime",
                    name: "Invoice Time",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.invoiceTime ? "" : 0,
                    maxWidth: thisState.report.filter.invoiceTime ? "" : 0,
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
                    key: "gstin",
                    name: "GSTIN",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.gstin ? "" : 0,
                    maxWidth: thisState.report.filter.gstin ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "address1",
                    name: "Address Line 1",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.address1 ? "" : 0,
                    maxWidth: thisState.report.filter.address1 ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "address2",
                    name: "Address Line 2",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.address2 ? "" : 0,
                    maxWidth: thisState.report.filter.address2 ? "" : 0,
                    editor: TextEditor
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
                    key: "driverName",
                    name: "Driver Name",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.driverName ? "" : 0,
                    maxWidth: thisState.report.filter.driverName ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "timeOfArrival",
                    name: "Time Of Arrival",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.timeOfArrival ? "" : 0,
                    maxWidth: thisState.report.filter.timeOfArrival ? "" : 0,
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
                    key: "unitPrice",
                    name: "Unit Price",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.unitPrice ? "" : 0,
                    maxWidth: thisState.report.filter.unitPrice ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "quantity",
                    name: "Quantity",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.quantity ? "" : 0,
                    maxWidth: thisState.report.filter.quantity ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "amount",
                    name: "Amount",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.amount ? "" : 0,
                    maxWidth: thisState.report.filter.amount ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "modeOfPayment",
                    name: "Mode Of Payment",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.modeOfPayment ? "" : 0,
                    maxWidth: thisState.report.filter.modeOfPayment ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "_cgst",
                    name: "CGST %",
                    editable: thisState.report.edit,
                    width: thisState.report.filter._cgst ? "" : 0,
                    maxWidth: thisState.report.filter._cgst ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "cgst",
                    name: "CGST",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.cgst ? "" : 0,
                    maxWidth: thisState.report.filter.cgst ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "_sgst",
                    name: "SGST %",
                    editable: thisState.report.edit,
                    width: thisState.report.filter._sgst ? "" : 0,
                    maxWidth: thisState.report.filter._sgst ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "sgst",
                    name: "SGST",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.sgst ? "" : 0,
                    maxWidth: thisState.report.filter.sgst ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "_igst",
                    name: "IGST %",
                    editable: thisState.report.edit,
                    width: thisState.report.filter._igst ? "" : 0,
                    maxWidth: thisState.report.filter._igst ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "igst",
                    name: "IGST",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.igst ? "" : 0,
                    maxWidth: thisState.report.filter.igst ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "total",
                    name: "Total",
                    editable: thisState.report.edit,
                    width: thisState.report.filter.total ? "" : 0,
                    maxWidth: thisState.report.filter.total ? "" : 0,
                    editor: TextEditor
                },
                {
                    key: "dummy",
                    name: "Dummy",
                    width: thisState.report.filter.dummy ? "" : 0,
                    maxWidth: thisState.report.filter.dummy ? "" : 0
                },
                {
                    key: "profile",
                    name: "Profile",
                    width: 0,
                    maxWidth: 0
                }
            ]}
            onRowsChange={(newRows) => {
                thisState.report.list = newRows;
                thisState.setMyState(thisState);
            }}
            rows={thisState.report.list.filter((item) => thisState.report.edit || Object.values(item).toString().replaceAll(",", ".").indexOf(thisState.report.filterText) !== -1)}
        />
    );
};

export default ReportInvoiceTable;
