package com.babulens.weighbridge.model;

import com.babulens.weighbridge.model.entity.Invoice;

public class PrintInvoice {
	private Invoice invoice;
	private String printerName;
	private int noOfCopies;
	private String printFormat;
	private String weighbridgeName;
	private String weighbridgeAddress;
	private String footer;

	public Invoice getWeight() {
		return invoice;
	}

	public void setWeight(Invoice invoice) {
		this.invoice = invoice;
	}

	public String getPrinterName() {
		return printerName;
	}

	public void setPrinterName(String printerName) {
		this.printerName = printerName;
	}

	public int getNoOfCopies() {
		return noOfCopies;
	}

	public void setNoOfCopies(int noOfCopies) {
		this.noOfCopies = noOfCopies;
	}

	public String getPrintFormat() {
		return printFormat;
	}

	public void setPrintFormat(String printFormat) {
		this.printFormat = printFormat;
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

	public String getFooter() {
		return footer;
	}

	public void setFooter(String footer) {
		this.footer = footer;
	}
}
