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
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class StaticVariable {

	private static Map<String, SerialPort> serialPorts;
	private static Map<String, Webcam> webcams;

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

	public static SerialPort getSerialPorts(String serialPort) {
		if (!serialPorts.containsKey(serialPort)) {
			serialPorts.put(serialPort, null);
		}
		return serialPorts.get(serialPort);
	}

	public static Webcam getWebcams(String webCam) {
		if (!webcams.containsKey(webCam)) {
			webcams.put(webCam, null);
		}
		return webcams.get(webCam);
	}

}
