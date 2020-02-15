package com.babulens.weighbridge.configuration;

import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortDataListenerWithExceptions;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListener;

import java.util.logging.Level;
import java.util.logging.Logger;

public final class SerialPortMessageListenerWithExceptions implements SerialPortDataListenerWithExceptions, SerialPortMessageListener {

	private static int weight = -1;
	private final String delimiter;
	private final String lastCharacter;

	public SerialPortMessageListenerWithExceptions(String delimiter, String lastCharacter) {
		this.delimiter = delimiter;
		this.lastCharacter = lastCharacter;
	}

	public static int getWeight() {
		return weight;
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
		return new byte[]{(byte) (Integer.parseInt(0 + delimiter.replaceAll("[^-0-9]", "")) % 128)};
	}

	@Override
	public boolean delimiterIndicatesEndOfMessage() {
		return true;
	}

	@Override
	public void serialEvent(SerialPortEvent event) {
		try {
			SerialPortMessageListenerWithExceptions.weight =
					Integer.parseInt(0 + new String(event.getReceivedData()).replaceAll("[^-0-9" + lastCharacter + "]", "").split(lastCharacter)[0]);
		} catch (Exception ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
		}
	}
}