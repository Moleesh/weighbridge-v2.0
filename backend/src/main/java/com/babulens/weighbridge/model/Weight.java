package com.babulens.weighbridge.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
import java.util.Objects;

@Entity
public class Weight {
    @Id
    private int slipNo;
    private String vehicleNo;
    private String material;
    private String customersName;
    private String transporterName;
    private long grossWeight;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private Date grossTime;
    private long tareWeight;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private Date tareTime;
    private long nettWeight;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private Date nettTime;
    private double charges;
    private String remarks;
    private boolean manual;

    public Weight() {
    }

    public Weight(int slipNo, String vehicleNo, String material, String customersName, String transporterName,
                  long grossWeight, Date grossTime, long tareWeight, Date tareTime, long nettWeight, Date nettTime,
                  double charges, String remarks, boolean manual) {
        this.slipNo = slipNo;
        this.vehicleNo = vehicleNo;
        this.material = material;
        this.customersName = customersName;
        this.transporterName = transporterName;
        this.grossWeight = grossWeight;
        this.grossTime = grossTime;
        this.tareWeight = tareWeight;
        this.tareTime = tareTime;
        this.nettWeight = nettWeight;
        this.nettTime = nettTime;
        this.charges = charges;
        this.remarks = remarks;
        this.manual = manual;
    }

    public int getSlipNo() {
        return slipNo;
    }

    public void setSlipNo(int slipNo) {
        this.slipNo = slipNo;
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

    public long getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(long grossWeight) {
        this.grossWeight = grossWeight;
    }

    public Date getGrossTime() {
        return grossTime;
    }

    public void setGrossTime(Date grossTime) {
        this.grossTime = grossTime;
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

    public long getNettWeight() {
        return nettWeight;
    }

    public void setNettWeight(long nettWeight) {
        this.nettWeight = nettWeight;
    }

    public Date getNettTime() {
        return nettTime;
    }

    public void setNettTime(Date nettTime) {
        this.nettTime = nettTime;
    }

    public double getCharges() {
        return charges;
    }

    public void setCharges(double charges) {
        this.charges = charges;
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
        return getSlipNo() == weight.getSlipNo();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSlipNo());
    }

    @Override
    public String toString() {
        return "Weight{" +
                "slipNo=" + slipNo +
                ", vehicleNo='" + vehicleNo + '\'' +
                ", material='" + material + '\'' +
                ", customersName='" + customersName + '\'' +
                ", transporterName='" + transporterName + '\'' +
                ", grossWeight=" + grossWeight +
                ", grossTime=" + grossTime +
                ", tareWeight=" + tareWeight +
                ", tareTime=" + tareTime +
                ", nettWeight=" + nettWeight +
                ", nettTime=" + nettTime +
                ", charges=" + charges +
                ", remarks='" + remarks + '\'' +
                ", manual=" + manual +
                '}';
    }
}
