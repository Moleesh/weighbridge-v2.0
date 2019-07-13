package com.babulens.weighbridge.service;

import java.util.List;

public interface SerialPortService {
    int getWeight();

    List<String> getAllSerialPort();
}
