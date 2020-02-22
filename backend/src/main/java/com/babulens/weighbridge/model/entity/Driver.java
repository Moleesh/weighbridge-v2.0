package com.babulens.weighbridge.model.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Driver {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private int customerId;
	private String vehicleNo;
	private String customerName;
	private String transporterName;
	@ManyToOne
	private Profile profile;

	public Driver() {
	}

	public Driver(int customerId, String vehicleNo, String customerName, String transporterName, String profile) {
		this.customerId = customerId;
		this.vehicleNo = vehicleNo;
		this.customerName = customerName;
		this.transporterName = transporterName;
		this.profile = new Profile(profile);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
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

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
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
