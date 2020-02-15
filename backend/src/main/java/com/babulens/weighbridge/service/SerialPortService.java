package com.babulens.weighbridge.service;

import java.util.List;

public interface SerialPortService {
	int getWeight();

	void settingUpSerialPort(String serialPort, boolean setDataListener);

	List<String> getAllSerialPort();

	void sendToDisplay(String message);
}
