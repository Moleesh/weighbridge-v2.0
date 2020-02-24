package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.TareWeight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareWeightDAO extends CrudRepository<TareWeight, Integer> {

	TareWeight findFirstByVehicleNoAndProfileOrderByTareTimeDesc(String vehicleNo, String profile);

	List<TareWeight> findAllByProfile(String profile);

}
