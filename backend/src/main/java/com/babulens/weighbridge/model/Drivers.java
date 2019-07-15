package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Drivers {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private int customerId;
    private String vehicleNo;
    private String customerName;
    private String transporterName;

    public Drivers() {
    }

    public Drivers(int customerId, String vehicleNo, String customerName, String transporterName) {
        this.customerId = customerId;
        this.vehicleNo = vehicleNo;
        this.customerName = customerName;
        this.transporterName = transporterName;
    }

    private int getId() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Drivers)) {
            return false;
        }
        Drivers that = (Drivers) o;
        return getId() == that.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Drivers{" +
                "id=" + id +
                ", customerId=" + customerId +
                ", vehicleNo='" + vehicleNo + '\'' +
                ", customerName='" + customerName + '\'' +
                ", transporterName='" + transporterName + '\'' +
                '}';
    }
}
