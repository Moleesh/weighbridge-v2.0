package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.configuration.SerialPortMessageListenerWithExceptions;
import com.babulens.weighbridge.model.StaticVariable;
import com.babulens.weighbridge.model.entity.SerialPortDetails;
import com.babulens.weighbridge.service.SerialPortService;
import com.babulens.weighbridge.service.SerialPortSettingsService;
import com.fazecast.jSerialComm.SerialPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SerialPortServiceImpl implements SerialPortService {

	final
	SerialPortSettingsService serialPortSettingsService;

	@Autowired
	public SerialPortServiceImpl(SerialPortSettingsService serialPortSettingsService) {
		this.serialPortSettingsService = serialPortSettingsService;
		settingUpSerialPort("indicator", true);
		settingUpSerialPort("display", false);
	}

	@Override
	public List<String> getAllSerialPort() {
		List<String> serialPorts = new ArrayList<>();
		serialPorts.add("Dummy");
		for (SerialPort serialPort : SerialPort.getCommPorts()) {
			serialPorts.add(serialPort.getSystemPortName());
		}
		return serialPorts;
	}

	@Override
	public void settingUpSerialPort(String serialPort, boolean setDataListener) {

		SerialPortDetails serialPortDetails = serialPortSettingsService.getSerialPortDetails(serialPort);
		SerialPort __serialPort = StaticVariable.getSerialPorts(serialPort);

		if (serialPortDetails == null) {
			return;
		}

		if (__serialPort != null) {
			__serialPort.removeDataListener();
			__serialPort.closePort();
		}
		for (SerialPort _serialPort : SerialPort.getCommPorts()) {
			if (_serialPort.getSystemPortName().equals(serialPortDetails.getSerialPort())) {
				__serialPort = _serialPort;
				break;
			}
		}

		if (__serialPort != null) {
			__serialPort.setComPortParameters(serialPortDetails.getBaudRate(),
					serialPortDetails.getDataBits(),
					serialPortDetails.getStopBits(),
					serialPortDetails.getParity());
			__serialPort.openPort();
		}

		if (setDataListener) {
			Objects.requireNonNull(__serialPort).addDataListener(new SerialPortMessageListenerWithExceptions(serialPortDetails.getDelimiter(), serialPortDetails.getLastCharacter()));
		}

	}

	@Override
	public int getWeight() {
		return SerialPortMessageListenerWithExceptions.getWeight();
	}

	@Override
	public void sendToDisplay(String message) {
		SerialPort display = StaticVariable.getSerialPorts("display");
		if (display == null) {
			settingUpSerialPort("display", false);
		}

		if (display == null) {
			return;
		}

		byte[] sendData = message.getBytes();
		display.writeBytes(sendData, sendData.length);
	}
}
