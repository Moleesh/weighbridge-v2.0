package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.Settings;

import java.util.Map;


public interface SettingsService {

    Settings saveSettings(Settings settings);

    Map<String, String> getAllSettings();

    void saveAllSettings(Map<String, String> settings);

    Object getSetting(String id);
}
