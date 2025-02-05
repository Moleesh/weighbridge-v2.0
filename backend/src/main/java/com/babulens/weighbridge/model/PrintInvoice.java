package com.babulens.weighbridge.model;

import com.babulens.weighbridge.model.entity.Invoice;

public class PrintInvoice {
    private Invoice invoice;
    private String printerName;
    private int noOfCopies;
    private String printFormat;
    private String weighbridgeName;
    private String weighbridgeAddress;
    private String contacts;
    private String phone;
    private String footer;
    private String invoiceHeader;
    private String invoiceIdentifier;
    private String invoiceFooter;
    private String gstin;
    private String additionalInformation;

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
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

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFooter() {
        return footer;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }

    public String getInvoiceHeader() {
        return invoiceHeader;
    }

    public void setInvoiceHeader(String invoiceHeader) {
        this.invoiceHeader = invoiceHeader;
    }

    public String getInvoiceIdentifier() {
        return invoiceIdentifier;
    }

    public void setInvoiceIdentifier(String invoiceIdentifier) {
        this.invoiceIdentifier = invoiceIdentifier;
    }

    public String getInvoiceFooter() {
        return invoiceFooter;
    }

    public void setInvoiceFooter(String invoiceFooter) {
        this.invoiceFooter = invoiceFooter;
    }

    public String getGstin() {
        return gstin;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }
}
