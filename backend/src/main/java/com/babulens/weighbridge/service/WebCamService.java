package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.WebCamDetail;

import java.util.List;

public interface WebCamService {

	String getMyPrimaryWebCam();

	List<WebCamDetail> getAllWebCamDetails();

	List<String> getAllWebCams();

	void settingUpWebCam(String name);

	void updateWebCam(WebCamDetail webCamDetail);

	byte[] getWebCamImage(String name, boolean fullSize);

	void saveWebCamImageToDisk(String fileName, String name);

}
