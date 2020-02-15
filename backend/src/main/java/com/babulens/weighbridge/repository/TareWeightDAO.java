package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.TareWeight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareWeightDAO extends CrudRepository<TareWeight, Integer> {
	List<TareWeight> findAllByVehicleNoAndProfile(String vehicleNo, Profile profile);

	List<TareWeight> findAllByProfile(Profile profile);

}
