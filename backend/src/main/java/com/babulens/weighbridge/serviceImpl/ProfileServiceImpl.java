package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.repository.ProfileDAO;
import com.babulens.weighbridge.service.ProfileService;
import com.babulens.weighbridge.service.SettingService;
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

	final
	SettingService settingService;

	@Autowired
	public ProfileServiceImpl(ProfileDAO profileDAO, SettingService settingService) {
		this.profileDAO = profileDAO;
		this.settingService = settingService;
	}

	@Override
	@Cacheable(cacheNames = "MyPrimaryProfile")
	public String getMyPrimaryProfile() {
		return profileDAO.findFirstByMyPrimaryIsTrue().getProfileName();
	}

	@Override
	@CacheEvict(value = "MyPrimaryProfile", allEntries = true)
	public void setMyPrimaryProfile(String profile) {
		Profile _profile = profileDAO.findFirstByMyPrimaryIsTrue();
		_profile.setMyPrimary(false);
		profileDAO.save(_profile);
		_profile = profileDAO.findById(profile).orElse(new Profile(profile));
		_profile.setMyPrimary(true);
		profileDAO.save(_profile);
	}

	@Override
	@Cacheable(cacheNames = "Profiles")
	public List<String> getAllProfiles() {
		List<String> profiles = new ArrayList<>();
		profileDAO.findAll().forEach(profile -> profiles.add(profile.getProfileName()));
		return profiles;
	}

	@Override
	@CacheEvict(value = "Profiles", allEntries = true)
	public List<String> addUpdateProfile(String profile) {
		profileDAO.save(new Profile(profile));
		settingService.saveAllSettingsByProfile(settingService.getAllSettingsByProfile("Standard"), profile, true);
		return getAllProfiles();
	}
}
