package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.service.SerialPortService;
import com.babulens.weighbridge.service.SettingsService;
import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SerialPortServiceImpl implements SerialPortService {
    private static String indicatorCOMPort = null;
    private static String indicatorFlowControl = null;
    private static String indicatorBaudRate = null;
    private static String indicatorDataBits = null;
    private static String indicatorParity = null;
    private static String indicatorStopBits = null;
    private static String indicatorDelimiter = null;
    private static int weight = 0;
    private static SerialPort comPort = null;

    @Autowired
    private static SettingsService settingsService;

    private static void initializeSettings() {
        Map<String, String> settings = SerialPortServiceImpl.settingsService.getAllSettings();
        SerialPortServiceImpl.indicatorCOMPort = settings.get("indicatorCOMPort");
        SerialPortServiceImpl.indicatorBaudRate = settings.get("indicatorBaudRate");
        SerialPortServiceImpl.indicatorDataBits = settings.get("indicatorDataBits");
        SerialPortServiceImpl.indicatorParity = settings.get("indicatorParity");
        SerialPortServiceImpl.indicatorStopBits = settings.get("indicatorStopBits");
        SerialPortServiceImpl.indicatorFlowControl = settings.get("indicatorFlowControl");
        SerialPortServiceImpl.indicatorDelimiter = settings.get("indicatorDelimiter");
    }

    public static void setCommPort() {
        if (SerialPortServiceImpl.indicatorCOMPort == null) {
            SerialPortServiceImpl.initializeSettings();
            System.out.println("here");
        }
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            if (serialPort.getSystemPortName().equals(SerialPortServiceImpl.indicatorCOMPort)) {
                SerialPortServiceImpl.comPort = serialPort;
                break;
            }
        }
        if (SerialPortServiceImpl.comPort != null) {
            SerialPortServiceImpl.comPort.setComPortParameters(Integer.parseInt(0 + SerialPortServiceImpl.indicatorBaudRate.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + SerialPortServiceImpl.indicatorDataBits.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + SerialPortServiceImpl.indicatorStopBits.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + SerialPortServiceImpl.indicatorParity.replaceAll("[^-0-9]", "")));
            SerialPortServiceImpl.comPort.openPort();
            SerialPortServiceImpl.comPort.addDataListener(new SerialPortMessageListener() {
                @Override
                public int getListeningEvents() {
                    return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
                }

                @Override
                public byte[] getMessageDelimiter() {
                    return new byte[]{(byte) (Integer.parseInt(0 + SerialPortServiceImpl.indicatorBaudRate.replaceAll("[^-0-9]", "")) % 128)};
                }

                @Override
                public boolean delimiterIndicatesEndOfMessage() {
                    return true;
                }

                @Override
                public void serialEvent(SerialPortEvent event) {
                    SerialPortServiceImpl.weight = Integer.parseInt(0 + new String(event.getReceivedData()).replaceAll("[^-0-9]", ""));
                }
            });
        }
    }

    @Override
    public int getWeight() {
        return SerialPortServiceImpl.weight;
    }

    @Override
    public List<String> getAllSerialPort() {
        List<String> serialPorts = new ArrayList<>();
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            serialPorts.add(serialPort.getSystemPortName());

        }
        return serialPorts;
    }
}
