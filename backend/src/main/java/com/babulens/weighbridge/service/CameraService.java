package com.babulens.weighbridge.service;

import com.github.sarxos.webcam.Webcam;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.List;

public interface CameraService {
    BufferedImage getCameraImage(String camera);

    byte[] getCameraImageByteBuffer(String camera);

    List<String> getAllCameras();

    Webcam getCamera(String camera);

    List<String> getAllDimensions(String camera);

    Dimension getBestDimensions(Webcam webcam);
}
