package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.SerialPortDetail;
import com.babulens.weighbridge.repository.SerialPortSettingDAO;
import com.babulens.weighbridge.service.SerialPortSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SerialPortSettingsServiceImpl implements SerialPortSettingsService {

	private final
	SerialPortSettingDAO serialPortSettingDAO;

	@Autowired
	public SerialPortSettingsServiceImpl(SerialPortSettingDAO serialPortSettingDAO) {
		this.serialPortSettingDAO = serialPortSettingDAO;
	}

	@Override
	public SerialPortDetail getSerialPortDetails(String name) {
		return serialPortSettingDAO.findById(name).orElse(null);
	}

	@Override
	public SerialPortDetail addUpdateSerialPortDetails(SerialPortDetail serialPortDetail) {
		return serialPortSettingDAO.save(serialPortDetail);
	}

	@Override
	public void deleteSerialPortDetails(String name) {
		serialPortSettingDAO.deleteById(name);
	}
}
