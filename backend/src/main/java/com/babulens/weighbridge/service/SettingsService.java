package com.babulens.weighbridge.service;

public class SettingsService {
    private static SettingsService ourInstance = new SettingsService();

    public static SettingsService getInstance() {
        return ourInstance;
    }

    private SettingsService() {
    }
}
