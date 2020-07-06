package com.babulens.weighbridge.model;

import com.babulens.weighbridge.model.entity.Invoice;

import java.util.List;

public class PrintInvoiceReport {
	private List<Invoice> invoices;
	private String printerName;
	private String reportTitle;
	private String weighbridgeName;
	private String weighbridgeAddress;
	private int totalRecords;
	private int totalQuantity;
	private int totalAmount;
	private String footer;

	public List<Invoice> getInvoices() {
		return invoices;
	}

	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}

	public String getPrinterName() {
		return printerName;
	}

	public void setPrinterName(String printerName) {
		this.printerName = printerName;
	}

	public String getReportTitle() {
		return reportTitle;
	}

	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}

	public String getWeighbridgeName() {
		return weighbridgeName;
	}

	public void setWeighbridgeName(String weighbridgeName) {
		this.weighbridgeName = weighbridgeName;
	}

	public String getWeighbridgeAddress() {
		return weighbridgeAddress;
	}

	public void setWeighbridgeAddress(String weighbridgeAddress) {
		this.weighbridgeAddress = weighbridgeAddress;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(int totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	public int getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getFooter() {
		return footer;
	}

	public void setFooter(String footer) {
		this.footer = footer;
	}
}
