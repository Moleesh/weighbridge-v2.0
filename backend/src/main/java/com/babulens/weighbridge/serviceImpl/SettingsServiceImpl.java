package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.Settings;
import com.babulens.weighbridge.repository.SettingsDAO;
import com.babulens.weighbridge.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SettingsServiceImpl implements SettingsService {

	private final
	SettingsDAO settingsDAO;

	@Autowired
	public SettingsServiceImpl(SettingsDAO settingsDAO) {
		this.settingsDAO = settingsDAO;
	}

	@Override
	@Cacheable(cacheNames = "Settings")
	public Map<String, String> getAllSettingsByProfile(String profile) {
		Map<String, String> settingMap = new HashMap<>();
		for (Settings settings : settingsDAO.findAllByProfile(new Profile(profile))) {
			settingMap.put(settings.getKey(), settings.getValue());
		}
		return settingMap;
	}

	@Override
	public void saveSetting(Settings setting) {
		settingsDAO.save(setting);
	}

	@Override
	@CacheEvict(value = "Settings", allEntries = true)
	public void saveAllSettingsByProfile(Map<String, String> settings, String profile) {
		List<Settings> settingsList = new ArrayList<>();
		for (String key : settings.keySet()) {
			if (!key.equals("slipNo")) {
				settingsList.add(new Settings(key, settings.get(key), new Profile(profile)));
			}
		}
		settingsDAO.saveAll(settingsList);
	}

	@Override
	@Cacheable(cacheNames = "Settings")
	public String getSettingByProfile(String key, String profile) {
		if (settingsDAO.findOneByKeyAndProfile(key, new Profile(profile)) != null) {
			return settingsDAO.findOneByKeyAndProfile(key, new Profile(profile)).getValue();
		} else {
			return null;
		}
	}
}
