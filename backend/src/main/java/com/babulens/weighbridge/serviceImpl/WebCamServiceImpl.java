package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.StaticVariable;
import com.babulens.weighbridge.model.entity.WebCamDetail;
import com.babulens.weighbridge.repository.WebCamDetailDAO;
import com.babulens.weighbridge.service.WebCamService;
import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.Dimension;
import java.awt.image.RasterFormatException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class WebCamServiceImpl implements WebCamService {

	private final WebCamDetailDAO webCamDetailDAO;
	private final boolean dontLog = false;


	@Autowired
	public WebCamServiceImpl(WebCamDetailDAO webCamDetailDAO) {
		this.webCamDetailDAO = webCamDetailDAO;
	}

	@EventListener(ContextRefreshedEvent.class)
	public void init() {
		getAllWebCams();
		settingUpWebCam(getMyPrimaryWebCam());
	}

	public Webcam getWebCam(String WebCam) {
		for (Webcam webcam : Webcam.getWebcams()) {
			if (WebCam.equals(webcam.getName())) {
				return webcam;
			}
		}
		return null;
	}

	@Cacheable(cacheNames = "BestDimensions")
	public Dimension getBestDimensions(Webcam webcam) throws WebcamException {
		if (webcam != null) {
			Dimension[] dimensions = webcam.getViewSizes();
			if (dimensions.length != 0) {
				return dimensions[dimensions.length - 1];
			}
		}
		return new Dimension(0, 0);
	}

	@Override
	@Cacheable(cacheNames = "MyPrimaryWebCam")
	public String getMyPrimaryWebCam() {
		return webCamDetailDAO.findFirstByMyPrimaryIsTrue().getName();
	}

	@Override
	public List<WebCamDetail> getAllWebCamDetails() {
		return webCamDetailDAO.findAllByOrderByMyPrimaryDesc();
	}

	@Override
	@Cacheable(cacheNames = "WebCams")
	public List<String> getAllWebCams() {
		List<String> webcams = new ArrayList<>();
		try {
			for (Webcam webcam : Webcam.getWebcams(20, TimeUnit.SECONDS)) {
				try {
					Dimension dimension = getBestDimensions(webcam);
					webcams.add(webcam.getName() + " [" + (int) dimension.getWidth() + "*" + (int) dimension.getHeight() + "]");
				} catch (WebcamException ex) {
					webcams.add(webcam.getName() + " " + "[0*0]");
				}
			}
		} catch (Exception ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
		}
		if (webcams.size() == 0) {
			webcams.add("dummy " + "[0*0]");
		}
		return webcams;
	}

	@Override
	public synchronized void settingUpWebCam(String name) {
		WebCamDetail webCamDetail = webCamDetailDAO.findById(name).orElse(new WebCamDetail(name));
		Webcam webcam = StaticVariable.getWebcam(webCamDetail.getName());

		if (webcam != null && webcam.isOpen()) {
			webcam.close();
		}

		webcam = getWebCam(name);
		if (webcam != null) {
			try {
				webcam.setViewSize(getBestDimensions(webcam));
				webcam.open();
			} catch (WebcamException ex) {
				webcam.close();
			}
		}
		StaticVariable.setWebcam(name, webcam);
	}

	@Override
	@CacheEvict(value = "WebCams", allEntries = true)
	public void updateWebCam(WebCamDetail webCamDetail) {
		if (webCamDetail.isMyPrimary()) {
			webCamDetailDAO.findAllByMyPrimaryIsTrue().forEach(_webCamDetail -> {
				_webCamDetail.setMyPrimary(false);
				webCamDetailDAO.save(_webCamDetail);
			});
		}
		webCamDetailDAO.save(webCamDetail);
	}

	@Override
	public byte[] getWebCamImage(String name, boolean fullSize) {
		WebCamDetail webCamDetail = webCamDetailDAO.findById(name).orElse(new WebCamDetail(name));
		Webcam webcam = StaticVariable.getWebcam(webCamDetail.getName());

		if (webcam == null) {
			settingUpWebCam(name);
		}
		if (webcam != null && webcam.isOpen()) {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			if (fullSize) {
				try {
					try {
						ImageIO.write(webcam.getImage(), "jpeg", outputStream);
					} catch (NullPointerException | WebcamException | IllegalArgumentException ex1) {
						if (!dontLog) {
							Logger.getLogger(getClass().getName()).log(Level.WARNING, webcam.getName() + ": WebCam is NuLL");
						}
						return null;
					}
				} catch (IOException | IllegalArgumentException | RasterFormatException ex) {
					Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
					return null;
				}
			} else {
				try {
					try {
						if (webCamDetail.getWidth() < 1 || webCamDetail.getHeight() < 1) {
							ImageIO.write(webcam.getImage().getSubimage(0, 0, 1, 1),
									"jpeg", outputStream);
						} else {
							ImageIO.write(webcam.getImage().getSubimage(webCamDetail.getX_Axis(), webCamDetail.getY_Axis(), webCamDetail.getWidth(), webCamDetail.getHeight()),
									"jpeg", outputStream);
						}
					} catch (NullPointerException | WebcamException ex1) {
						if (!dontLog) {
							Logger.getLogger(getClass().getName()).log(Level.WARNING, webcam.getName() + ": WebCam is NuLL");
						}
						return null;
					}
				} catch (IOException | IllegalArgumentException | RasterFormatException ex) {
					Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
					return null;
				}
			}
			return outputStream.toByteArray();
		}
		return null;
	}

	@Override
	public void saveWebCamImageToDisk(String fileName, String name) {
		WebCamDetail webCamDetail = webCamDetailDAO.findById(name).orElse(new WebCamDetail(name));
		Webcam webcam = StaticVariable.getWebcam(webCamDetail.getName());

		if (webcam != null && webcam.isOpen()) {
			File directory = new File("WebCamOutput");
			File outputFile = new File("WebCamOutput" + File.separator + fileName);
			if (!directory.exists()) {
				if (!directory.mkdirs()) {
					return;
				}
			}
			try {
				ImageIO.write(webcam.getImage(), "jpeg", outputFile);
			} catch (IOException ex) {
				Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
			}
		}
	}

}
