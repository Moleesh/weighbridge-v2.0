package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.repository.ProfileDAO;
import com.babulens.weighbridge.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

	final
	ProfileDAO profileDAO;

	@Autowired
	public ProfileServiceImpl(ProfileDAO profileDAO) {
		this.profileDAO = profileDAO;
	}

	@Override
	@Cacheable(cacheNames = "MyPrimaryProfile")
	public String getMyPrimaryProfile() {
		return profileDAO.findFirstByMyPrimaryIsTrue().getProfileName();
	}

	@Override
	@Cacheable(cacheNames = "Profiles")
	public List<String> getAllProfile() {
		List<String> profiles = new ArrayList<>();
		profileDAO.findAll().forEach(profile -> profiles.add(profile.getProfileName()));
		return profiles;
	}

	@Override
	@CacheEvict(value = "MyPrimaryProfile", allEntries = true)
	public void changeMyPrimaryProfile(String profile) {
		// TODO: 2/22/2020
	}

	@Override
	@CacheEvict(value = "Profiles", allEntries = true)
	public void addUpdateProfile(String profile) {
		profileDAO.save(new Profile(profile));
	}

}
