package com.babulens.weighbridge.model;

import java.util.List;

public class PrintReport {
    private List<Weight> weights;
    private String printerName;
    private String reportTitle;
    private String weighbridgeName;
    private String weighbridgeAddress;
    private int totalRecords;
    private int totalNettWeight;
    private int totalTotalCharges;
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

    public int getTotalNettWeight() {
        return totalNettWeight;
    }

    public void setTotalNettWeight(int totalNettWeight) {
        this.totalNettWeight = totalNettWeight;
    }

    public int getTotalTotalCharges() {
        return totalTotalCharges;
    }

    public void setTotalTotalCharges(int totalTotalCharges) {
        this.totalTotalCharges = totalTotalCharges;
    }

    public String getFooter() {
        return footer;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }
}
