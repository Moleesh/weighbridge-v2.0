package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Settings;
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

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Service
public class SettingsServiceImpl implements SettingsService {

    @Autowired
    private
    SettingsDAO settingsDAO;

    @Override
    @CacheEvict(value = "Settings", key = "#settings.getKey()")
    public void saveSettings(Settings settings) {
        settingsDAO.save(settings);
    }

    @Override
    @Cacheable(cacheNames = "Settings")
    public Map<String, String> getAllSettings() {
        Map<String, String> settingMap = new HashMap<>();
        for (Settings settings : settingsDAO.findAll()) {
            settingMap.put(settings.getKey(), settings.getValue());
        }
        return settingMap;
    }

    @Override
    @CacheEvict(value = "Settings", allEntries = true)
    public void saveAllSettings(Map<String, String> settings) {
        List<Settings> settingsList = new ArrayList<>();
        for (String key : settings.keySet()) {
            settingsList.add(new Settings(key, settings.get(key)));
        }
        settingsDAO.saveAll(settingsList);
    }

    @Override
    @Cacheable(cacheNames = "Settings", key = "#id")
    public Object getSetting(String id) {
        if (settingsDAO.findById(id).isPresent()) {
            return settingsDAO.findById(id).get().getValue();
        } else {
            return null;
        }
    }
}
