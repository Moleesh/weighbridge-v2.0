package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.Settings;

import java.util.Map;


public interface SettingsService {

	Map<String, String> getAllSettingsByProfile(String profile);

	void saveSetting(Settings setting);

	void saveAllSettingsByProfile(Map<String, String> settings, String profile);

	String getSettingByProfile(String key, String profile);
}
