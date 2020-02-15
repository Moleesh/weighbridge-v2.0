package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.SerialPortDetails;
import com.babulens.weighbridge.repository.SerialPortSettingsDAO;
import com.babulens.weighbridge.service.SerialPortSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SerialPortSettingsServiceImpl implements SerialPortSettingsService {

	private final
	SerialPortSettingsDAO serialPortSettingsDAO;

	@Autowired
	public SerialPortSettingsServiceImpl(SerialPortSettingsDAO serialPortSettingsDAO) {
		this.serialPortSettingsDAO = serialPortSettingsDAO;
	}

	@Override
	public SerialPortDetails getSerialPortDetails(String name) {
		return serialPortSettingsDAO.findById(name).orElse(null);
	}

	@Override
	public SerialPortDetails addUpdateSerialPortDetails(SerialPortDetails serialPortDetails) {
		return serialPortSettingsDAO.save(serialPortDetails);
	}

	@Override
	public void deleteSerialPortDetails(String name) {
		serialPortSettingsDAO.deleteById(name);
	}
}
