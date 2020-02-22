package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.AdminSetting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminSettingDAO extends CrudRepository<AdminSetting, String> {
}
