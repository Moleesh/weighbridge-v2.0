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
    private String indicatorCOMPort = null;
    private String indicatorFlowControl = null;
    private String indicatorBaudRate = null;
    private String indicatorDataBits = null;
    private String indicatorParity = null;
    private String indicatorStopBits = null;
    private String indicatorDelimiter = null;
    private int weight = 0;
    private SerialPort comPort = null;

    @Autowired
    private SettingsService settingsService;

    @PostConstruct
    public void PostConstruct() {
        initializeSettings();
        setCommPort();
    }

    @Override
    public void initializeSettings() {

        Map<String, String> settings = this.settingsService.getAllSettings();
        this.indicatorCOMPort = settings.get("indicatorCOMPort");
        this.indicatorBaudRate = settings.get("indicatorBaudRate");
        this.indicatorDataBits = settings.get("indicatorDataBits");
        this.indicatorParity = settings.get("indicatorParity");
        this.indicatorStopBits = settings.get("indicatorStopBits");
        this.indicatorFlowControl = settings.get("indicatorFlowControl");
        this.indicatorDelimiter = settings.get("indicatorDelimiter");
    }

    @Override
    public void setCommPort() {

        if (this.indicatorCOMPort == null) {
            this.initializeSettings();
        }
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            if (serialPort.getSystemPortName().equals(this.indicatorCOMPort)) {
                this.comPort = serialPort;
                break;
            }
        }
        if (this.comPort != null) {
            System.out.println("here" + indicatorCOMPort);
            this.comPort.setComPortParameters(Integer.parseInt(0 + this.indicatorBaudRate.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + this.indicatorDataBits.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + this.indicatorStopBits.replaceAll("[^-0-9]", "")), Integer.parseInt(0 + this.indicatorParity.replaceAll("[^-0-9]", "")));
            this.comPort.openPort();
            this.comPort.addDataListener(new SerialPortMessageListener() {
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
        return this.weight;
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
