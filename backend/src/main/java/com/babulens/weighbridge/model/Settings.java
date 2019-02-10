package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Settings {
    @Id
    private int key;
    private int baudRate;
    private int portNo;
    private String headerRow1;
    private String headerRow2;
    private String footer;
    private String printer;
    private boolean customer;
    private boolean charges;
    private boolean driver;
    private int copy;
    private String printSetting;

    public Settings() {
    }

    private int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public int getBaudRate() {
        return baudRate;
    }

    public void setBaudRate(int baudRate) {
        this.baudRate = baudRate;
    }

    public int getPortNo() {
        return portNo;
    }

    public void setPortNo(int portNo) {
        this.portNo = portNo;
    }

    public String getHeaderRow1() {
        return headerRow1;
    }

    public void setHeaderRow1(String headerRow1) {
        this.headerRow1 = headerRow1;
    }

    public String getHeaderRow2() {
        return headerRow2;
    }

    public void setHeaderRow2(String headerRow2) {
        this.headerRow2 = headerRow2;
    }

    public String getFooter() {
        return footer;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }

    public String getPrinter() {
        return printer;
    }

    public void setPrinter(String printer) {
        this.printer = printer;
    }

    public boolean isCustomer() {
        return customer;
    }

    public void setCustomer(boolean customer) {
        this.customer = customer;
    }

    public boolean isCharges() {
        return charges;
    }

    public void setCharges(boolean charges) {
        this.charges = charges;
    }

    public boolean isDriver() {
        return driver;
    }

    public void setDriver(boolean driver) {
        this.driver = driver;
    }

    public int getCopy() {
        return copy;
    }

    public void setCopy(int copy) {
        this.copy = copy;
    }

    public String getPrintSetting() {
        return printSetting;
    }

    public void setPrintSetting(String printSetting) {
        this.printSetting = printSetting;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Settings)) {
            return false;
        }
        Settings settings = (Settings) o;
        return getKey() == settings.getKey();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getKey());
    }

    @Override
    public String toString() {
        return "Settings{" +
                "key=" + key +
                ", baudRate=" + baudRate +
                ", portNo=" + portNo +
                ", headerRow1='" + headerRow1 + '\'' +
                ", headerRow2='" + headerRow2 + '\'' +
                ", footer='" + footer + '\'' +
                ", printer='" + printer + '\'' +
                ", customer=" + customer +
                ", charges=" + charges +
                ", driver=" + driver +
                ", copy=" + copy +
                ", printSetting='" + printSetting + '\'' +
                '}';
    }
}
