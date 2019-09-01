package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.service.SerialPortService;
import com.babulens.weighbridge.service.SettingsService;
import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SerialPortServiceImpl implements SerialPortService {
    private int weight = -1;
    private SerialPort commPortIndicator = null;
    private SerialPort commPortDisplay = null;

    @Autowired
    private SettingsService settingsService;


    @Override
    public List<String> getAllSerialPort() {
        List<String> serialPorts = new ArrayList<>();
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            serialPorts.add(serialPort.getSystemPortName());

        }
        return serialPorts;
    }

    @Override
    @PostConstruct
    public synchronized void settingUpIndicator() {

        Map<String, String> settings = settingsService.getAllSettings();
        String port = settings.get("indicatorCOMPort");
        String baudRate = settings.get("indicatorBaudRate");
        String dataBits = settings.get("indicatorDataBits");
        String parity = settings.get("indicatorParity");
        String stopBits = settings.get("indicatorStopBits");
//            String flowControl = settings.get("indicatorFlowControl");
        String delimiter = settings.get("indicatorDelimiter");

        if (commPortIndicator != null) {
            commPortIndicator.removeDataListener();
            commPortIndicator.closePort();
            commPortIndicator = null;
        }
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            if (serialPort.getSystemPortName().equals(port)) {
                commPortIndicator = serialPort;
                break;
            }
        }

        if (commPortIndicator != null) {
            commPortIndicator.setComPortParameters(Integer.parseInt(0 + baudRate.replaceAll("[^-0-9]", "")),
                    Integer.parseInt(0 + dataBits.replaceAll("[^-0-9]", "")),
                    Integer.parseInt(0 + stopBits.replaceAll("[^-0-9]", "")),
                    Integer.parseInt(0 + parity.replaceAll("[^-0-9]", "")));
            commPortIndicator.openPort();
            commPortIndicator.addDataListener(new SerialPortMessageListener() {
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
                    weight = Integer.parseInt(0 + new String(event.getReceivedData()).replaceAll("[^-0-9]", ""));
                }
            });
        }
    }

    @Override
    public int getWeight() {
        return weight;
    }

    @Override
    @PostConstruct
    public synchronized void settingUpDisplay() {
        Map<String, String> settings = settingsService.getAllSettings();
        String port = settings.get("indicatorCOMPort");
        String baudRate = settings.get("indicatorBaudRate");
        String dataBits = settings.get("indicatorDataBits");
        String parity = settings.get("indicatorParity");
        String stopBits = settings.get("indicatorStopBits");

        if (commPortDisplay != null) {
            commPortDisplay.closePort();
            commPortDisplay = null;
        }
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            if (serialPort.getSystemPortName().equals(port)) {
                commPortDisplay = serialPort;
                break;
            }
        }

        if (commPortDisplay != null) {
            commPortDisplay.setComPortParameters(Integer.parseInt(0 + baudRate.replaceAll("[^-0-9]", "")),
                    Integer.parseInt(0 + dataBits.replaceAll("[^-0-9]", "")),
                    Integer.parseInt(0 + stopBits.replaceAll("[^-0-9]", "")),
                    Integer.parseInt(0 + parity.replaceAll("[^-0-9]", "")));
            commPortDisplay.openPort();
        }
    }

    @Override
    public void sendToDisplay(String message) {
        if (commPortDisplay == null) {
            settingUpDisplay();
        }
        byte[] sendData = message.getBytes();
        commPortDisplay.writeBytes(sendData, sendData.length);
    }
}
