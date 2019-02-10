package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Settings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsDAO extends CrudRepository<Settings, Integer> {
}
