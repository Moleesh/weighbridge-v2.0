package com.babulens.weighbridge.service;

import java.util.List;

public interface SerialPortService {
	int getWeight ();

	void settingUpIndicator ();

	List<String> getAllSerialPort ();

	void settingUpDisplay ();

	void sendToDisplay (String message);
}
