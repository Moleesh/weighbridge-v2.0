package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.service.CameraService;
import com.babulens.weighbridge.service.SettingsService;
import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamCompositeDriver;
import com.github.sarxos.webcam.WebcamException;
import com.github.sarxos.webcam.ds.buildin.WebcamDefaultDriver;
import com.github.sarxos.webcam.ds.ipcam.IpCamDevice;
import com.github.sarxos.webcam.ds.ipcam.IpCamDriver;
import com.github.sarxos.webcam.ds.ipcam.IpCamMode;
import com.github.sarxos.webcam.ds.ipcam.IpCamStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.RasterFormatException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class MyIpCam extends IpCamDriver {
    MyIpCam() {
        try {
            super.register(new IpCamDevice("No Camera Available", "http:", IpCamMode.PULL));
        } catch (MalformedURLException | WebcamException ignored) {
        }
    }
}

class MyCompositeDriver extends WebcamCompositeDriver {
    MyCompositeDriver() {
        try {
            add(new IpCamDriver(new IpCamStorage("cameras.xml")));
        } catch (NullPointerException | WebcamException ex) {
            add(new MyIpCam());
        }
        add(new WebcamDefaultDriver());
    }
}

@Service
public class CameraServiceImpl implements CameraService {
    static {
        Webcam.setDriver(new MyCompositeDriver());
    }

    @Autowired
    private SettingsService settingsService;
    private Webcam webcam = null;

    @Override
    @PostConstruct
    public synchronized void settingUpCamera() {
        Map<String, String> settings = settingsService.getAllSettings();
        String cameraName = settings.get("cameraName").split("\\[")[0].trim();
        if (webcam != null && webcam.isOpen()) {
            webcam.close();
        }

        webcam = getCamera(cameraName);
        if (webcam != null) {
            try {
                webcam.setViewSize(getBestDimensions(webcam));
                webcam.open();
            } catch (WebcamException ignored) {
            }
        }
    }

    @Override
    public void saveCameraImageToDisk(String fileName) {
        if (webcam != null && webcam.isOpen()) {
            File directory = new File("CameraOutput");
            File outputFile = new File(Paths.get("CameraOutput/" + fileName).toString());
            if (!directory.exists()) {
                if (directory.mkdirs()) {
                    return;
                }
            }
            try {
                ImageIO.write(webcam.getImage(), "jpeg", outputFile);
            } catch (IOException ignored) {
            }
        }
    }

    @Override
    public byte[] getCameraImage() {
        Map<String, String> settings = settingsService.getAllSettings();
        int cameraXAxis = Integer.parseInt(settings.get("cameraXAxis"));
        int cameraYAxis = Integer.parseInt(settings.get("cameraYAxis"));
        int cameraWidth = Integer.parseInt(settings.get("cameraWidth"));
        int cameraHeight = Integer.parseInt(settings.get("cameraHeight"));
        if (webcam != null && webcam.isOpen()) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            try {
                ImageIO.write(webcam.getImage().getSubimage(cameraXAxis, cameraYAxis, cameraWidth, cameraHeight),
                        "jpeg", outputStream);
            } catch (IOException | IllegalArgumentException | NullPointerException | RasterFormatException e) {
                return null;
            }
            return outputStream.toByteArray();
        }
        return null;
    }

    @Override
    public Webcam getCamera(String camera) {
        for (Webcam webcam : Webcam.getWebcams()) {
            if (camera.equals(webcam.getName())) {
                return webcam;
            }
        }
        return null;
    }

    @Override
    public List<String> getAllCameras() {
        List<String> cameras = new ArrayList<>();
        for (Webcam webcam : Webcam.getWebcams()) {
            try {
                cameras.add(webcam.getName() + " " + getBestDimensions(webcam).toString().replace("java.awt" +
                        ".Dimension", ""));
            } catch (WebcamException e) {
                cameras.add(webcam.getName() + " " + "[width=0,height=0]");
            }
        }
        return cameras;
    }

    @Override
    public Dimension getBestDimensions(Webcam webcam) throws WebcamException {
        if (webcam != null) {
            Dimension[] dimensions = webcam.getViewSizes();
            if (dimensions.length != 0) {
                return dimensions[dimensions.length - 1];
            }
        }
        return new Dimension(0, 0);
    }
}
