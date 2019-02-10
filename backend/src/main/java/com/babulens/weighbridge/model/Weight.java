package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
import java.util.Objects;

@Entity
public class Weight {
    @Id
    private int slNo;
    private int dcNo;
    private Date dcNoDate;
    private String customerName;
    private String driverName;
    private String vehicleNo;
    private String material;
    private double charges;
    private long grossWeight;
    private Date grossDateTime;
    private long tareWeight;
    private Date tareDateTime;
    private long netWeight;
    private Date netDateTime;
    private String remarks;
    private boolean manual;

    public Weight() {
    }

    private int getSlNo() {
        return slNo;
    }

    public void setSlNo(int slNo) {
        this.slNo = slNo;
    }

    public int getDcNo() {
        return dcNo;
    }

    public void setDcNo(int dcNo) {
        this.dcNo = dcNo;
    }

    public Date getDcNoDate() {
        return dcNoDate;
    }

    public void setDcNoDate(Date dcNoDate) {
        this.dcNoDate = dcNoDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
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

    public double getCharges() {
        return charges;
    }

    public void setCharges(double charges) {
        this.charges = charges;
    }

    public long getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(long grossWeight) {
        this.grossWeight = grossWeight;
    }

    public Date getGrossDateTime() {
        return grossDateTime;
    }

    public void setGrossDateTime(Date grossDateTime) {
        this.grossDateTime = grossDateTime;
    }

    public long getTareWeight() {
        return tareWeight;
    }

    public void setTareWeight(long tareWeight) {
        this.tareWeight = tareWeight;
    }

    public Date getTareDateTime() {
        return tareDateTime;
    }

    public void setTareDateTime(Date tareDateTime) {
        this.tareDateTime = tareDateTime;
    }

    public long getNetWeight() {
        return netWeight;
    }

    public void setNetWeight(long netWeight) {
        this.netWeight = netWeight;
    }

    public Date getNetDateTime() {
        return netDateTime;
    }

    public void setNetDateTime(Date netDateTime) {
        this.netDateTime = netDateTime;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public boolean isManual() {
        return manual;
    }

    public void setManual(boolean manual) {
        this.manual = manual;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Weight)) {
            return false;
        }
        Weight weight = (Weight) o;
        return getSlNo() == weight.getSlNo();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSlNo());
    }

    @Override
    public String toString() {
        return "Weight{" +
                "slNo=" + slNo +
                ", dcNo=" + dcNo +
                ", dcNoDate=" + dcNoDate +
                ", customerName='" + customerName + '\'' +
                ", driverName='" + driverName + '\'' +
                ", vehicleNo='" + vehicleNo + '\'' +
                ", material='" + material + '\'' +
                ", charges=" + charges +
                ", grossWeight=" + grossWeight +
                ", grossDateTime=" + grossDateTime +
                ", tareWeight=" + tareWeight +
                ", tareDateTime=" + tareDateTime +
                ", netWeight=" + netWeight +
                ", netDateTime=" + netDateTime +
                ", remarks='" + remarks + '\'' +
                ", manual=" + manual +
                '}';
    }
}
