package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.Settings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettingsDAO extends CrudRepository<Settings, String> {
	List<Settings> findAllByProfile(Profile profile);

	Settings findOneByKeyAndProfile(String key, Profile profile);
}
