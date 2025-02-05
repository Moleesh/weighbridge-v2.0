package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.SerialPortDetail;

import java.util.List;

public interface SerialPortService {

    SerialPortDetail getSerialPortDetailByName(String name);

    List<String> getAllSerialPort();

    void settingUpSerialPort(String name, boolean setDataListener);

    void updateSerialPortDetail(SerialPortDetail serialPortDetail);

    int getWeight();

    void sendToDisplay(String message);

}
