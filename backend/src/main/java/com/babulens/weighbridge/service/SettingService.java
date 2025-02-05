package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.Setting;

import java.util.Map;

public interface SettingService {

    String getSettingByProfile(String key, String profile);

    Map<String, String> getAllSettingsByProfile(String profile);

    void saveSetting(Setting setting);

    void saveAllSettingsByProfile(Map<String, String> settings, String profile, boolean resetSlipNo);

}
