package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.Settings;

import java.util.List;


public interface SettingsService {

    List<Settings> getAllSettings();

    List<Settings> saveAllSettings(List<Settings> settings);
}
