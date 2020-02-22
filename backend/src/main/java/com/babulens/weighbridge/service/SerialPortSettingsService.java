package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.SerialPortDetails;

public interface SerialPortSettingsService {
	SerialPortDetails getSerialPortDetails(String name);

	SerialPortDetails addUpdateSerialPortDetails(SerialPortDetails serialPortDetails);

	void deleteSerialPortDetails(String name);
}
