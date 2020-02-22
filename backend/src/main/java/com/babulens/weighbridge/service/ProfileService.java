package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.model.entity.Profile;

import java.util.List;

public interface ProfileService {

	String getMyPrimaryProfile();

	List<String> getAllProfile();

	void changeMyPrimaryProfile(String profile);

	void addUpdateProfile(String profile);

}
