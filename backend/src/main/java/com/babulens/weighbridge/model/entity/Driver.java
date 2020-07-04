package com.babulens.weighbridge.model.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Driver {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String customerId;
	private String vehicleNo;
	private String customerName;
	private String transporterName;
	private String address1;
	private String address2;

	public Driver() {
	}

	public Driver(String customerId, String vehicleNo, String customerName, String transporterName, String address1, String address2) {
		this.customerId = customerId;
		this.vehicleNo = vehicleNo;
		this.customerName = customerName;
		this.transporterName = transporterName;
		this.address1 = address1;
		this.address2 = address2;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getTransporterName() {
		return transporterName;
	}

	public void setTransporterName(String transporterName) {
		this.transporterName = transporterName;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Driver)) {
			return false;
		}
		Driver that = (Driver) o;
		return getId() == that.getId();
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId());
	}

}
