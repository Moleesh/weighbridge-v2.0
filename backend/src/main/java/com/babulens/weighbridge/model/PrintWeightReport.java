package com.babulens.weighbridge.model;

import com.babulens.weighbridge.model.entity.Weight;

import java.util.List;

public class PrintWeightReport {
	private List<Weight> weights;
	private String printerName;
	private String reportTitle;
	private String weighbridgeName;
	private String weighbridgeAddress;
	private int totalRecords;
	private int totalWeight;
	private int totalCharge;
	private String footer;

	public List<Weight> getWeights() {
		return weights;
	}

	public void setWeights(List<Weight> weights) {
		this.weights = weights;
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

	public int getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(int totalWeight) {
		this.totalWeight = totalWeight;
	}

	public int getTotalCharge() {
		return totalCharge;
	}

	public void setTotalCharge(int totalCharge) {
		this.totalCharge = totalCharge;
	}

	public String getFooter() {
		return footer;
	}

	public void setFooter(String footer) {
		this.footer = footer;
	}
}
