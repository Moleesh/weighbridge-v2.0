package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.service.SerialPortService;
import com.fazecast.jSerialComm.SerialPort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SerialPortServiceImpl implements SerialPortService {
//    public static void main(String[] args) {
//        SerialPort comPort = null;
//        boolean potfound = false;
//        for (com.fazecast.jSerialComm.SerialPort serialPort : com.fazecast.jSerialComm.SerialPort.getCommPorts()) {
//            if (serialPort.getSystemPortName().equals("COM7")) {
//                comPort = serialPort;
//                potfound = true;
//            }
//        }
//        if (potfound) {
//            comPort.setComPortParameters(1200, 8, 1, 0);
//            comPort.openPort();
//            try {
//                while (true) {
//                    BufferedReader buildPropertiesFile = new BufferedReader(new InputStreamReader(comPort.getInputStream()));
//                    System.out.println(buildPropertiesFile.readLine());
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            comPort.closePort();
//            System.out.println("here");
//        }
//    }

    @Override
    public List<String> getAllSerialPort() {
        List<String> serialPorts = new ArrayList<>();
        for (SerialPort serialPort : SerialPort.getCommPorts()) {
            serialPorts.add(serialPort.getSystemPortName());

        }
        return serialPorts;
    }
}
