package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Drivers;
import com.babulens.weighbridge.model.entity.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriversDAO extends CrudRepository<Drivers, Integer> {
	List<Drivers> findAllByProfile(Profile profile);
}
