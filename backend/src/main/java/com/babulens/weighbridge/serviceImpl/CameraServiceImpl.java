package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.service.CameraService;
import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamCompositeDriver;
import com.github.sarxos.webcam.WebcamException;
import com.github.sarxos.webcam.ds.buildin.WebcamDefaultDriver;
import com.github.sarxos.webcam.ds.ipcam.IpCamDevice;
import com.github.sarxos.webcam.ds.ipcam.IpCamDriver;
import com.github.sarxos.webcam.ds.ipcam.IpCamMode;
import com.github.sarxos.webcam.ds.ipcam.IpCamStorage;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class MyIpCam extends IpCamDriver {
    MyIpCam() {
        try {
            super.register(new IpCamDevice("No Camera Available", "http:", IpCamMode.PULL));
        } catch (MalformedURLException ignored) {
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
    CameraServiceImpl() {
        Webcam.setDriver(new MyCompositeDriver());
    }

    @Override
    public BufferedImage getCameraImage(String camera) {
        Webcam webcam = getCamera(camera);
        webcam.open();
        return webcam.getImage();
    }

    @Override
    public byte[] getCameraImageByteBuffer(String camera) {
        Webcam webcam = getCamera(camera);
        System.out.println(webcam.getName());

        webcam.setViewSize(getBestDimensions(webcam));
        webcam.open();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        File outputfile = new File("saved.jpeg");

        try {
            ImageIO.write(webcam.getImage(), "jpeg", outputfile);
            ImageIO.write(webcam.getImage(), "jpeg", outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        webcam.close();
        return outputStream.toByteArray();

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
            cameras.add(webcam.getName());
        }
        return cameras;
    }

    @Override
    public List<String> getAllDimensions(String camera) {
        List<String> dimensions = new ArrayList<>();
        try {
            for (Dimension dimension : getCamera(camera).getViewSizes()) {
                dimensions.add((int) dimension.getWidth() + " * " + (int) dimension.getHeight());
            }
        } catch (NullPointerException ex) {
            return Arrays.asList("-1 * -1");
        }
        return dimensions;
    }

    @Override
    public Dimension getBestDimensions(Webcam webcam) {
        Dimension[] dimensions = webcam.getViewSizes();
        return dimensions[dimensions.length - 1];
    }
}
