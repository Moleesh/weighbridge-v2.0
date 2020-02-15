package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.model.entity.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialDAO extends CrudRepository<Material, Integer> {
	List<Material> findAllByProfile(Profile profile);
}
