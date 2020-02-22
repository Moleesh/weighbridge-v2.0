package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.WebCamDetail;

import java.util.List;

public interface WebCamService {

	String getMyPrimaryWebCam();

	List<WebCamDetail> getAllWebCamDetails();

	List<String> getAllWebCams();

	void settingUpWebCam(String name);

	byte[] getWebCamImage(String name);

	void saveWebCamImageToDisk(String fileName, String name);

}
