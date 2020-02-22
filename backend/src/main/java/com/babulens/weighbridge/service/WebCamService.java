package com.babulens.weighbridge.service;

import com.github.sarxos.webcam.Webcam;

import java.awt.*;
import java.util.List;

public interface WebCamService {
	void saveWebCamImageToDisk(String fileName, String webcam);

	byte[] getWebCamImage(String webcam);

	List<String> getAllWebCams();

	Webcam getWebCam(String WebCam);

	Dimension getBestDimensions(Webcam webcam);

	void settingUpWebCam(String webcam);
}
