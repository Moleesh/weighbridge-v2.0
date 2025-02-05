package com.babulens.weighbridge.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.Objects;

@Entity
public class TareWeight {
    @Id
    private String vehicleNo;
    private long tareWeight;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private Date tareTime;

    public TareWeight() {
    }

    public TareWeight(String vehicleNo, long tareWeight, Date tareTime) {
        this.vehicleNo = vehicleNo;
        this.tareWeight = tareWeight;
        this.tareTime = tareTime;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TareWeight that = (TareWeight) o;
        return vehicleNo.equals(that.vehicleNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vehicleNo);
    }
}
