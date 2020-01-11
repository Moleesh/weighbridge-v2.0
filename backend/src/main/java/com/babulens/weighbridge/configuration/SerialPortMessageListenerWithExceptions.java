package com.babulens.weighbridge.configuration;

import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortDataListenerWithExceptions;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListener;

import java.util.logging.Level;
import java.util.logging.Logger;

public final class SerialPortMessageListenerWithExceptions implements SerialPortDataListenerWithExceptions, SerialPortMessageListener {

	private String delimiter;
	private String lastCharacter;
	private static int weight = -1;

	public SerialPortMessageListenerWithExceptions(String delimiter, String lastCharacter) {
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
		return new byte[]{(byte) (Integer.parseInt(0 + delimiter.replaceAll("[^-0-9]", "")) % 128)};
	}

	@Override
	public boolean delimiterIndicatesEndOfMessage() {
		return true;
	}

	public static int getWeight() {
		return weight;
	}

	@Override
	public void serialEvent(SerialPortEvent event) {
		SerialPortMessageListenerWithExceptions.weight =
				Integer.parseInt(0 + new String(event.getReceivedData()).replaceAll("[^-0-9" + lastCharacter + "]", "").split(lastCharacter)[0]);
	}
}