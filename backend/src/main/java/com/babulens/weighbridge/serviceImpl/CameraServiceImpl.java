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
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.RasterFormatException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

class MyIpCam extends IpCamDriver {
    MyIpCam() {
        try {
            super.register(new IpCamDevice("No Camera Available", "http:", IpCamMode.PULL));
        } catch (MalformedURLException | WebcamException ex) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

class MyCompositeDriver extends WebcamCompositeDriver {
    MyCompositeDriver() {
        try {
            add(new IpCamDriver(new IpCamStorage("cameras.xml")));
        } catch (NullPointerException | WebcamException ex) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
            add(new MyIpCam());
        }
        add(new WebcamDefaultDriver());
    }
}

@Service
public class CameraServiceImpl implements CameraService {
    private static boolean nullWebCam = false;

    static {
        Webcam.setDriver(new MyCompositeDriver());
    }

    @Autowired
    private SettingsService settingsService;
    private Webcam webcam = null;

    private Webcam getWebcam() {
        return webcam;
    }

    private void setWebcam(Webcam webcam) {
        this.webcam = webcam;
    }

    @Override
    @PostConstruct
    public synchronized void settingUpCamera() {
        Map<String, String> settings = settingsService.getAllSettings();
        String cameraName = settings.get("cameraName").split("\\[")[0].trim();
        if (getWebcam() != null && getWebcam().isOpen()) {
            getWebcam().close();
        }

        setWebcam(getCamera(cameraName));
        if (webcam != null) {
            try {
                getWebcam().setViewSize(getBestDimensions(getWebcam()));
                getWebcam().open();
            } catch (WebcamException ex) {
                getWebcam().close();
            }
        }
    }

    @Override
    public void saveCameraImageToDisk(String fileName) {
        if (getWebcam() != null && getWebcam().isOpen()) {
            File directory = new File("CameraOutput");
            File outputFile = new File("CameraOutput" + File.separator + fileName);
            if (!directory.exists()) {
                if (!directory.mkdirs()) {
                    return;
                }
            }
            try {
                ImageIO.write(getWebcam().getImage(), "jpeg", outputFile);
            } catch (IOException ex) {
                Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
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
        if (getWebcam() != null && getWebcam().isOpen()) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            try {
                try {
                    if (cameraWidth < 1 || cameraHeight < 1) {
                        ImageIO.write(getWebcam().getImage().getSubimage(0, 0, 1, 1),
                                "jpeg", outputStream);
                    } else {
                        ImageIO.write(getWebcam().getImage().getSubimage(cameraXAxis, cameraYAxis, cameraWidth, cameraHeight),
                                "jpeg", outputStream);
                    }
                } catch (NullPointerException ex1) {
                    if (!CameraServiceImpl.nullWebCam) {
                        Logger.getLogger(getClass().getName()).log(Level.WARNING, getWebcam().getName() + ": Camera is NuLL");
                        CameraServiceImpl.nullWebCam = true;
                    }
                    return null;
                }
            } catch (IOException | IllegalArgumentException | RasterFormatException ex) {
                Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
                return null;
            }
            CameraServiceImpl.nullWebCam = false;
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
    @PostConstruct
    @Cacheable(cacheNames = "Cameras")
    public List<String> getAllCameras() {
        List<String> cameras = new ArrayList<>();
        for (Webcam webcam : Webcam.getWebcams()) {
            try {
                cameras.add(webcam.getName() + " " + getBestDimensions(webcam).toString().replace("java.awt" +
                        ".Dimension", ""));
            } catch (WebcamException ex) {
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
