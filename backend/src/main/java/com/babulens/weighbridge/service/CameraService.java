package com.babulens.weighbridge.service;

import com.github.sarxos.webcam.Webcam;

import java.awt.*;
import java.util.List;

public interface CameraService {
    void saveCameraImageToDisk(String fileName);

    byte[] getCameraImage();

    List<String> getAllCameras();

    @SuppressWarnings("unused")
    Webcam getCamera(String camera);

    @SuppressWarnings("unused")
    Dimension getBestDimensions(Webcam webcam);

    void settingUpCamera();
}
