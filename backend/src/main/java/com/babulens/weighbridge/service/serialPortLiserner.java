package com.babulens.weighbridge.service;

import com.fazecast.jSerialComm.SerialPort;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class serialPortLiserner {
    public static void main(String[] args) {
        SerialPort comPort =null;
        boolean potfound =false;
        for ( SerialPort serialPort : SerialPort.getCommPorts()) {
            if (serialPort.getSystemPortName().equals("COM7")) {
                comPort = serialPort;
                potfound =true;
            }
        }
        if (potfound) {
            comPort.setComPortParameters(1200,8,1,0);
            comPort.openPort();
            try {
                while (true)
                {
                    BufferedReader buildPropertiesFile = new BufferedReader(new InputStreamReader(comPort.getInputStream()));
                    System.out.println(buildPropertiesFile.readLine());
                }
            } catch (Exception e) { e.printStackTrace(); }
            comPort.closePort();
            System.out.println("here");
        }
    }
}
