package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.Settings;

import java.util.List;


public interface SettingsService {

    Settings saveSettings(Settings settings);

    List<Settings> getAllSettings();

    List<Settings> saveAllSettings(List<Settings> settings);

    Object getSetting(String id);
}
