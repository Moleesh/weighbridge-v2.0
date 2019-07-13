package com.babulens.weighbridge.service;

import java.util.List;

public interface SerialPortService {
    int getWeight();

    void initializeSettings();

    void setCommPort();

    List<String> getAllSerialPort();
}
