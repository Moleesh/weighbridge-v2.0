package com.babulens.weighbridge.service;


import java.util.List;

public interface ProfileService {

	String getMyPrimaryProfile();

	List<String> getAllProfiles();

	void changeMyPrimaryProfile(String profile);

	void addUpdateProfile(String profile);

}
