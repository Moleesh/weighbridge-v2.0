package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Settings;
import com.babulens.weighbridge.repository.SettingsDAO;
import com.babulens.weighbridge.service.SettingsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsServiceImpl implements SettingsService {

    @Autowired
    SettingsDAO settingsDAO;

    @Override
    public List<Settings> getAllSettings() {
        return Lists.newArrayList(settingsDAO.findAll());
    }

    @Override
    public List<Settings> saveAllSettings(List<Settings> settings) {
        return Lists.newArrayList(settingsDAO.saveAll(settings));
    }
}
