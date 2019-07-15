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
    private int weight = 0;
    private String indicatorDelimiter = null;
    private SerialPort comPort = null;

    @Autowired
    private SettingsService settingsService;

    @Override
    @PostConstruct
    public void settingUpIndicator() {

        Map<String, String> settings = settingsService.getAllSettings();
        String indicatorCOMPort = settings.get("indicatorCOMPort");
        String indicatorBaudRate = settings.get("indicatorBaudRate");
        String indicatorDataBits = settings.get("indicatorDataBits");
        String indicatorParity = settings.get("indicatorParity");
        String indicatorStopBits = settings.get("indicatorStopBits");
        String indicatorFlowControl = settings.get("indicatorFlowControl");
        indicatorDelimiter = settings.get("indicatorDelimiter");

        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            if (serialPort.getSystemPortName().equals(indicatorCOMPort)) {
                comPort = serialPort;
                break;
            }
        }

        if (comPort != null) {
            System.out.println("here" + indicatorCOMPort);
            comPort.setComPortParameters(Integer.parseInt(0 + indicatorBaudRate.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + indicatorDataBits.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + indicatorStopBits.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + indicatorParity.replaceAll("[^-0-9]", "")));
            comPort.openPort();
            comPort.addDataListener(new SerialPortMessageListener() {
                @Override
                public int getListeningEvents() {
                    return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
                }

                @Override
                public byte[] getMessageDelimiter() {
                    return new byte[]{(byte) (Integer.parseInt(0 + indicatorDelimiter.replaceAll("[^-0-9]", "")) % 128)};
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
    public List<String> getAllSerialPort() {
        List<String> serialPorts = new ArrayList<>();
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            serialPorts.add(serialPort.getSystemPortName());

        }
        return serialPorts;
    }
}
