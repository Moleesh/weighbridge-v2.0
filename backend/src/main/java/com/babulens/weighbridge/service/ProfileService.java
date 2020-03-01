package com.babulens.weighbridge.service;


import java.util.List;

public interface ProfileService {

	String getMyPrimaryProfile();

	List<String> getAllProfiles();

	void setMyPrimaryProfile(String profile);

	List<String> addUpdateProfile(String profile);

}
