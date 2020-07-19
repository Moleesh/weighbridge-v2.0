package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.repository.ProfileDAO;
import com.babulens.weighbridge.service.InvoiceService;
import com.babulens.weighbridge.service.ProfileService;
import com.babulens.weighbridge.service.SettingService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

	private final ProfileDAO profileDAO;
	private final SettingService settingService;
	private final WeighService weighService;
	private final InvoiceService invoiceService;

	@Autowired
	public ProfileServiceImpl(ProfileDAO profileDAO, SettingService settingService, WeighService weighService, InvoiceService invoiceService) {
		this.profileDAO = profileDAO;
		this.settingService = settingService;
		this.weighService = weighService;
		this.invoiceService = invoiceService;
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
		weighService.resetWeightByProfile("1", profile);
		invoiceService.resetInvoiceByProfile("1", profile);
		return getAllProfiles();
	}
}
