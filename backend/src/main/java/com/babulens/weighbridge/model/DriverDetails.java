package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class DriverDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String vehicleNo;
    private String customersName;
    private String transporterName;

    public DriverDetails() {
    }

    public DriverDetails(String vehicleNo, String customersName, String transporterName) {
        this.vehicleNo = vehicleNo;
        this.customersName = customersName;
        this.transporterName = transporterName;
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

    public String getCustomersName() {
        return customersName;
    }

    public void setCustomersName(String customersName) {
        this.customersName = customersName;
    }

    public String getTransporterName() {
        return transporterName;
    }

    public void setTransporterName(String transporterName) {
        this.transporterName = transporterName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DriverDetails)) return false;
        DriverDetails that = (DriverDetails) o;
        return getId() == that.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "DriverDetails{" +
                "id=" + id +
                ", vehicleNo='" + vehicleNo + '\'' +
                ", customersName='" + customersName + '\'' +
                ", transporterName='" + transporterName + '\'' +
                '}';
    }
}
