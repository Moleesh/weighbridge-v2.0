package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.Setting;
import com.babulens.weighbridge.repository.SettingDAO;
import com.babulens.weighbridge.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SettingServiceImpl implements SettingService {

	private final
	SettingDAO settingDAO;

	@Autowired
	public SettingServiceImpl(SettingDAO settingDAO) {
		this.settingDAO = settingDAO;
	}

	@Override
	@Cacheable(cacheNames = "Settings")
	public Map<String, String> getAllSettingsByProfile(String profile) {
		Map<String, String> settingMap = new HashMap<>();
		for (Setting setting : settingDAO.findAllByProfile(new Profile(profile))) {
			settingMap.put(setting.getKey(), setting.getValue());
		}
		return settingMap;
	}

	@Override
	public void saveSetting(Setting setting) {
		settingDAO.save(setting);
	}

	@Override
	@CacheEvict(value = "Settings", allEntries = true)
	public void saveAllSettingsByProfile(Map<String, String> settings, String profile) {
		List<Setting> settingList = new ArrayList<>();
		for (String key : settings.keySet()) {
			if (!key.equals("slipNo")) {
				settingList.add(new Setting(key, settings.get(key), new Profile(profile)));
			}
		}
		settingDAO.saveAll(settingList);
	}

	@Override
	@Cacheable(cacheNames = "Settings")
	public String getSettingByProfile(String key, String profile) {
		if (settingDAO.findOneByKeyAndProfile(key, new Profile(profile)) != null) {
			return settingDAO.findOneByKeyAndProfile(key, new Profile(profile)).getValue();
		} else {
			return null;
		}
	}
}
