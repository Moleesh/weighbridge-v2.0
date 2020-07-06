package com.babulens.weighbridge.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
import java.util.Objects;

@Entity
public class Invoice {
	@Id
	private String id;
	private int invoiceNo;
	private String referenceSlipNo;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date invoiceTime;
	private String customersName;
	private String address1;
	private String address2;
	private String vehicleNo;
	private String material;
	private double unitPrice;
	private long quantity;
	private double amount;
	private double _cgst;
	private double _sgst;
	private double _igst;
	private double cgst;
	private double sgst;
	private double igst;
	private double total;
	private String profile;

	public Invoice() {
	}

	public Invoice(int invoiceNo, String referenceSlipNo, Date invoiceTime, String customersName, String address1, String address2, String vehicleNo, String material, double unitPrice, long quantity, double amount, double _cgst, double _sgst, double _igst, double cgst, double sgst, double igst, double total, String profile) {
		this.invoiceNo = invoiceNo;
		this.referenceSlipNo = referenceSlipNo;
		this.invoiceTime = invoiceTime;
		this.customersName = customersName;
		this.address1 = address1;
		this.address2 = address2;
		this.vehicleNo = vehicleNo;
		this.material = material;
		this.unitPrice = unitPrice;
		this.quantity = quantity;
		this.amount = amount;
		this._cgst = _cgst;
		this._sgst = _sgst;
		this._igst = _igst;
		this.cgst = cgst;
		this.sgst = sgst;
		this.igst = igst;
		this.total = total;
		this.profile = profile;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(int invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getReferenceSlipNo() {
		return referenceSlipNo;
	}

	public void setReferenceSlipNo(String referenceSlipNo) {
		this.referenceSlipNo = referenceSlipNo;
	}

	public Date getInvoiceTime() {
		return invoiceTime;
	}

	public void setInvoiceTime(Date invoiceTime) {
		this.invoiceTime = invoiceTime;
	}

	public String getCustomersName() {
		return customersName;
	}

	public void setCustomersName(String customersName) {
		this.customersName = customersName;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double get_cgst() {
		return _cgst;
	}

	public void set_cgst(double _cgst) {
		this._cgst = _cgst;
	}

	public double get_sgst() {
		return _sgst;
	}

	public void set_sgst(double _sgst) {
		this._sgst = _sgst;
	}

	public double getCgst() {
		return cgst;
	}

	public void setCgst(double cgst) {
		this.cgst = cgst;
	}

	public double getSgst() {
		return sgst;
	}

	public void setSgst(double sgst) {
		this.sgst = sgst;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public double get_igst() {
		return _igst;
	}

	public void set_igst(double _igst) {
		this._igst = _igst;
	}

	public double getIgst() {
		return igst;
	}

	public void setIgst(double igst) {
		this.igst = igst;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Invoice invoice = (Invoice) o;
		return Objects.equals(id, invoice.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
