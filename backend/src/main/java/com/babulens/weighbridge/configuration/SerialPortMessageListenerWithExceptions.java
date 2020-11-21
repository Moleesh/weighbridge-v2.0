package com.babulens.weighbridge.configuration;

import com.babulens.weighbridge.model.StaticVariable;
import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortDataListenerWithExceptions;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListener;

import java.util.logging.Level;
import java.util.logging.Logger;

public final class SerialPortMessageListenerWithExceptions implements SerialPortDataListenerWithExceptions, SerialPortMessageListener {

	private final int delimiter;
	private final String lastCharacter;

	public SerialPortMessageListenerWithExceptions(int delimiter, String lastCharacter) {
		this.delimiter = delimiter;
		this.lastCharacter = lastCharacter;
	}

	@Override
	public void catchException(Exception ex) {
		Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
	}

	@Override
	public int getListeningEvents() {
		return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
	}

	@Override
	public byte[] getMessageDelimiter() {
		return new byte[]{(byte) (delimiter % 128)};
	}

	@Override
	public boolean delimiterIndicatesEndOfMessage() {
		return true;
	}

	@Override
	public void serialEvent(SerialPortEvent event) {
		try {
			StaticVariable.setWeight(Integer.parseInt(0 + new String(event.getReceivedData()).replaceAll("[^0-9" + lastCharacter + "]", "").split(lastCharacter)[0]));
		} catch (Exception ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
		}
	}
}