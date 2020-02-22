package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.StaticVariable;
import com.babulens.weighbridge.model.entity.SerialPortDetail;
import com.babulens.weighbridge.repository.SerialPortSettingDAO;
import com.babulens.weighbridge.service.SerialPortService;
import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListenerWithExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class SerialPortServiceImpl implements SerialPortService {

	SerialPortSettingDAO serialPortSettingDAO;

	@Autowired
	public SerialPortServiceImpl(SerialPortSettingDAO serialPortSettingDAO) {
		this.serialPortSettingDAO = serialPortSettingDAO;
	}

	@EventListener(ContextRefreshedEvent.class)
	public void init() {
		getAllSerialPort();
		settingUpSerialPort("indicator", true);
		settingUpSerialPort("display", false);
	}

	@Override
	public SerialPortDetail getSerialPortDetailByName(String name) {
		return serialPortSettingDAO.findById(name).orElseGet(() -> new SerialPortDetail(name));
	}

	@Override
	@Cacheable(cacheNames = "SerialPorts")
	public List<String> getAllSerialPort() {
		List<String> serialPorts = new ArrayList<>();
		serialPorts.add("dummy");
		for (SerialPort serialPort : SerialPort.getCommPorts()) {
			serialPorts.add(serialPort.getSystemPortName());
		}
		return serialPorts;
	}

	@Override
	public void settingUpSerialPort(String name, boolean setDataListener) {

		SerialPortDetail serialPortDetail = getSerialPortDetailByName(name);
		SerialPort serialPort = StaticVariable.getSerialPorts(name);

		if (serialPortDetail == null) {
			return;
		}

		if (serialPort != null) {
			serialPort.removeDataListener();
			serialPort.closePort();
		}
		for (SerialPort _serialPort : SerialPort.getCommPorts()) {
			if (_serialPort.getSystemPortName().equals(serialPortDetail.getSerialPort())) {
				serialPort = _serialPort;
				break;
			}
		}

		if (serialPort != null) {
			serialPort.setComPortParameters(serialPortDetail.getBaudRate(),
					serialPortDetail.getDataBits(),
					serialPortDetail.getStopBits(),
					serialPortDetail.getParity());
			serialPort.openPort();
		}

		if (serialPort != null && setDataListener) {
			serialPort.addDataListener(new SerialPortMessageListenerWithExceptions() {
				@Override
				public void catchException(Exception ex) {
					Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
				}

				@Override
				public byte[] getMessageDelimiter() {
					return new byte[]{(byte) (serialPortDetail.getDelimiter() % 128)};
				}

				@Override
				public boolean delimiterIndicatesEndOfMessage() {
					return true;
				}

				@Override
				public int getListeningEvents() {
					return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
				}

				@Override
				public void serialEvent(SerialPortEvent serialPortEvent) {
					try {
						StaticVariable.setWeight(
								Integer.parseInt(0 + new String(serialPortEvent.getReceivedData()).replaceAll("[^0-9" + serialPortDetail.getLastCharacter() + "]", "").split(serialPortDetail.getLastCharacter())[0]));
					} catch (Exception ex) {
						Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
					}
				}
			});
		}
	}

	@Override
	public void updateSerialPortDetail(SerialPortDetail serialPortDetail) {

	}

	@Override
	public int getWeight() {
		return StaticVariable.getWeight();
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
