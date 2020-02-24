package com.babulens.weighbridge.model;

import com.fazecast.jSerialComm.SerialPort;
import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamCompositeDriver;
import com.github.sarxos.webcam.WebcamException;
import com.github.sarxos.webcam.ds.buildin.WebcamDefaultDriver;
import com.github.sarxos.webcam.ds.ipcam.IpCamDevice;
import com.github.sarxos.webcam.ds.ipcam.IpCamDriver;
import com.github.sarxos.webcam.ds.ipcam.IpCamMode;
import com.github.sarxos.webcam.ds.ipcam.IpCamStorage;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class StaticVariable {

	private static final Map<String, SerialPort> serialPorts = new HashMap<>();
	private static final Map<String, Webcam> webcams = new HashMap<>();
	private static int weight = -1;

	static {
		Webcam.setDriver(new WebcamCompositeDriver() {
			{
				try {
					add(new IpCamDriver(new IpCamStorage("webcam.xml")));
				} catch (NullPointerException | WebcamException ex) {
					Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
					add(new IpCamDriver() {
						{
							try {
								super.register(new IpCamDevice("No WebCam Available", "http:", IpCamMode.PULL));
							} catch (MalformedURLException | WebcamException ex) {
								Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
							}
						}
					});
				}
				add(new WebcamDefaultDriver());
			}
		});
	}

	StaticVariable() {
	}

	public static int getWeight() {
		return weight;
	}

	public static void setWeight(int weight) {
		StaticVariable.weight = weight;
	}

	public static SerialPort getSerialPort(String serialPort) {
		if (!serialPorts.containsKey(serialPort)) {
			serialPorts.put(serialPort, null);
		}
		return serialPorts.get(serialPort);
	}

	public static void setSerialPort(String key, SerialPort serialPort) {
		StaticVariable.serialPorts.put(key, serialPort);
	}

	public static Webcam getWebcam(String webCam) {
		if (!webcams.containsKey(webCam)) {
			webcams.put(webCam, null);
		}
		return webcams.get(webCam);
	}

	public static void setWebcam(String key, Webcam webcam) {
		StaticVariable.webcams.put(key, webcam);
	}

}
