package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Setting;
import com.babulens.weighbridge.repository.SettingDAO;
import com.babulens.weighbridge.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
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
	public String getSettingByProfile(String key, String profile) {
		if (settingDAO.findOneByKeyAndProfile(key, profile) != null) {
			return settingDAO.findOneByKeyAndProfile(key, profile).getValue();
		} else {
			return null;
		}
	}

	@Override
	public Map<String, String> getAllSettingsByProfile(String profile) {
		Map<String, String> settings = new HashMap<>();
		settingDAO.findAllByProfile(profile).forEach(setting -> settings.put(setting.getKey(), setting.getValue()));
		return settings;
	}

	@Override
	public void saveSetting(Setting setting) {
		settingDAO.save(setting);
	}

	@Override
	public void saveAllSettingsByProfile(Map<String, String> settings, String profile, boolean resetSlipNo) {
		List<Setting> settingList = new ArrayList<>();
		for (String key : settings.keySet()) {
			if (!key.equals("slipNo")) {
				settingList.add(new Setting(key, settings.get(key), profile));
			} else if (resetSlipNo) {
				settingList.add(new Setting(key, 1, profile));
			}
		}
		settingDAO.saveAll(settingList);
	}

}
