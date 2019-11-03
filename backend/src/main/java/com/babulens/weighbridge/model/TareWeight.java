package com.babulens.weighbridge.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    public TareWeight() {
    }

    public TareWeight(String vehicleNo, long tareWeight, Date tareTime) {
        this.vehicleNo = vehicleNo;
        this.tareWeight = tareWeight;
        this.tareTime = tareTime;
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

    @Override
    public String toString() {
        return "TareWeight{" +
                "id=" + id +
                ", vehicleNo='" + vehicleNo + '\'' +
                ", tareWeight=" + tareWeight +
                ", tareTime=" + tareTime +
                '}';
    }
}
