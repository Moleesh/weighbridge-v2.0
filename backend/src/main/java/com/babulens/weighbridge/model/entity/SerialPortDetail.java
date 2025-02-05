package com.babulens.weighbridge.model.entity;

import com.fazecast.jSerialComm.SerialPort;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class SerialPortDetail {
    @Id
    private String name;
    private String serialPort = "Dummy";
    private int baudRate = 1200;
    private int dataBits = 8;
    private int parity = SerialPort.NO_PARITY;
    private int stopBits = SerialPort.ONE_STOP_BIT;
    private int flowControl = SerialPort.FLOW_CONTROL_DISABLED;
    private int delimiter = 10;
    private String lastCharacter = "";

    public SerialPortDetail() {
    }

    public SerialPortDetail(String name) {
        this.name = name;
    }

    public SerialPortDetail(String name, String serialPort, int baudRate, int dataBits, int parity, int stopBits, int flowControl, int delimiter, String lastCharacter) {
        this.name = name;
        this.serialPort = serialPort;
        this.baudRate = baudRate;
        this.dataBits = dataBits;
        this.parity = parity;
        this.stopBits = stopBits;
        this.flowControl = flowControl;
        this.delimiter = delimiter;
        this.lastCharacter = lastCharacter;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerialPort() {
        return serialPort;
    }

    public void setSerialPort(String serialPort) {
        this.serialPort = serialPort;
    }

    public int getBaudRate() {
        return baudRate;
    }


    public void setBaudRate(int baudRate) {
        this.baudRate = baudRate;
    }

    public int getDataBits() {
        return dataBits;
    }

    public void setDataBits(int dataBits) {
        this.dataBits = dataBits;
    }

    public int getParity() {
        return parity;
    }

    public void setParity(int parity) {
        this.parity = parity;
    }

    public int getStopBits() {
        return stopBits;
    }

    public void setStopBits(int stopBits) {
        this.stopBits = stopBits;
    }

    public int getFlowControl() {
        return flowControl;
    }

    public void setFlowControl(int flowControl) {
        this.flowControl = flowControl;
    }

    public int getDelimiter() {
        return delimiter;
    }

    public void setDelimiter(int delimiter) {
        this.delimiter = delimiter;
    }

    public String getLastCharacter() {
        return lastCharacter;
    }

    public void setLastCharacter(String lastCharacter) {
        this.lastCharacter = lastCharacter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SerialPortDetail that = (SerialPortDetail) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
