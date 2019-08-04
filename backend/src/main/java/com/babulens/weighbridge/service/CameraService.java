package com.babulens.weighbridge.service;

import com.github.sarxos.webcam.Webcam;

import java.awt.*;
import java.net.ConnectException;
import java.util.List;

public interface CameraService {
    void saveCameraImageToDisk(String fileName);

    byte[] getCameraImage();

    List<String> getAllCameras();

    Webcam getCamera(String camera);

    Dimension getBestDimensions(Webcam webcam) throws ConnectException;

    void settingUpCamera();
}
