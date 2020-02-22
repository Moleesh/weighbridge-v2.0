package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.AdminSetting;

import java.util.Map;

public interface AdminSettingService {

	Map<String, String> getAllAdminSettings();

	void addUpdateAdminSettings(AdminSetting adminSetting);

}
