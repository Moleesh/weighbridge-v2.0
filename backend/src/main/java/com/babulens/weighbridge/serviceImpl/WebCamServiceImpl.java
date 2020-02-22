package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.StaticVariable;
import com.babulens.weighbridge.model.entity.WebCamDetail;
import com.babulens.weighbridge.repository.WebCamDetailDAO;
import com.babulens.weighbridge.service.WebCamService;
import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.RasterFormatException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class WebCamServiceImpl implements WebCamService {

	final
	WebCamDetailDAO webCamDetailDAO;

	@Autowired
	public WebCamServiceImpl(WebCamDetailDAO webCamDetailDAO) {
		this.webCamDetailDAO = webCamDetailDAO;
		getAllWebCams();
//		settingUpWebCam(webCamDetailsDAO.findByMyPrimaryIsTrue().getName());
	}

	@Override
	public void settingUpWebCam(String webcam) {
		WebCamDetail webCamDetail = webCamDetailDAO.findById(webcam).orElse(null);
		Webcam __webcam = StaticVariable.getWebcams(Objects.requireNonNull(webCamDetail).getName());

		if (__webcam != null && __webcam.isOpen()) {
			__webcam.close();
		}

		__webcam = getWebCam(webcam);
		if (__webcam != null) {
			try {
				__webcam.setViewSize(getBestDimensions(__webcam));
				__webcam.open();
			} catch (WebcamException ex) {
				__webcam.close();
			}
		}
	}

	@Override
	public void saveWebCamImageToDisk(String fileName, String webcam) {
		WebCamDetail webCamDetail = webCamDetailDAO.findById(webcam).orElse(null);
		Webcam __webcam = StaticVariable.getWebcams(Objects.requireNonNull(webCamDetail).getName());

		if (__webcam != null && __webcam.isOpen()) {
			File directory = new File("WebCamOutput");
			File outputFile = new File("WebCamOutput" + File.separator + fileName);
			if (!directory.exists()) {
				if (!directory.mkdirs()) {
					return;
				}
			}
			try {
				ImageIO.write(__webcam.getImage(), "jpeg", outputFile);
			} catch (IOException ex) {
				Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
			}
		}
	}

	@Override
	public byte[] getWebCamImage(String webcam) {
		WebCamDetail webCamDetail = webCamDetailDAO.findById(webcam).orElse(null);
		Webcam __webcam = StaticVariable.getWebcams(Objects.requireNonNull(webCamDetail).getName());

		if (__webcam != null && __webcam.isOpen()) {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			try {
				try {
					if (webCamDetail.getWidth() < 1 || webCamDetail.getHeight() < 1) {
						ImageIO.write(__webcam.getImage().getSubimage(0, 0, 1, 1),
								"jpeg", outputStream);
					} else {
						ImageIO.write(__webcam.getImage().getSubimage(webCamDetail.getX_Axis(), webCamDetail.getY_Axis(), webCamDetail.getWidth(), webCamDetail.getHeight()),
								"jpeg", outputStream);
					}
				} catch (NullPointerException ex1) {
					Logger.getLogger(getClass().getName()).log(Level.WARNING, __webcam.getName() + ": WebCam is NuLL");
					return null;
				}
			} catch (IOException | IllegalArgumentException | RasterFormatException ex) {
				Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
				return null;
			}
			return outputStream.toByteArray();
		}
		return null;
	}

	@Override
	public Webcam getWebCam(String WebCam) {
		for (Webcam webcam : Webcam.getWebcams()) {
			if (WebCam.equals(webcam.getName())) {
				return webcam;
			}
		}
		return null;
	}

	@Override
	@Cacheable(cacheNames = "WebCams")
	public List<String> getAllWebCams() {
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
	@Cacheable(cacheNames = "WebCamDimension")
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
