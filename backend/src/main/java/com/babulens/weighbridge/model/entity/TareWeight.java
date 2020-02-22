package com.babulens.weighbridge.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class TareWeight {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String vehicleNo;
	private long tareWeight;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date tareTime;
	@ManyToOne
	private Profile profile;

	public TareWeight() {
	}

	public TareWeight(String vehicleNo, long tareWeight, Date tareTime, String profile) {
		this.vehicleNo = vehicleNo;
		this.tareWeight = tareWeight;
		this.tareTime = tareTime;
		this.profile = new Profile(profile);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public long getTareWeight() {
		return tareWeight;
	}

	public void setTareWeight(long tareWeight) {
		this.tareWeight = tareWeight;
	}

	public Date getTareTime() {
		return tareTime;
	}

	public void setTareTime(Date tareTime) {
		this.tareTime = tareTime;
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
		if (!(o instanceof TareWeight)) {
			return false;
		}
		TareWeight that = (TareWeight) o;
		return getId() == that.getId();
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId());
	}

}
