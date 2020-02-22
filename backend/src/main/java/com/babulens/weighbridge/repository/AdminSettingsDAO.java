package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.AdminSettings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminSettingsDAO extends CrudRepository<AdminSettings, String> {
}
