package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.AdminSetting;
import com.babulens.weighbridge.repository.AdminSettingDAO;
import com.babulens.weighbridge.service.AdminSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminSettingServiceImpl implements AdminSettingService {

	final
	AdminSettingDAO adminSettingDAO;

	@Autowired
	public AdminSettingServiceImpl(AdminSettingDAO adminSettingDAO) {
		this.adminSettingDAO = adminSettingDAO;
	}

	@Override
	@Cacheable(cacheNames = "AdminSettings")
	public Map<String, String> getAllAdminSettings() {
		Map<String, String> adminSettings = new HashMap<>();
		adminSettingDAO.findAll().forEach(adminSetting -> adminSettings.put(adminSetting.getKey(), adminSetting.getValue()));
		return adminSettings;
	}

	@Override
	public String getAdminSetting(String key) {
		return adminSettingDAO.findById(key).isPresent() ? adminSettingDAO.findById(key).get().getValue() : null;
	}

	@Override
	@CacheEvict(value = "AdminSettings", allEntries = true)
	public void addUpdateAdminSettings(AdminSetting adminSetting) {
		adminSettingDAO.save(adminSetting);
	}
}
