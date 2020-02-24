package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Setting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettingDAO extends CrudRepository<Setting, String> {

	List<Setting> findAllByProfile(String profile);

	Setting findOneByKeyAndProfile(String key, String profile);

}
