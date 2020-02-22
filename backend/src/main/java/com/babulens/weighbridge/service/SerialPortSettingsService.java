package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.SerialPortDetail;

public interface SerialPortSettingsService {
	SerialPortDetail getSerialPortDetails(String name);

	SerialPortDetail addUpdateSerialPortDetails(SerialPortDetail serialPortDetail);

	void deleteSerialPortDetails(String name);
}
