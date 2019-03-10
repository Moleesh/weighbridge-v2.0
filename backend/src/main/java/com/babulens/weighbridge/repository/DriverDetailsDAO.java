package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.DriverDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverDetailsDAO extends CrudRepository<DriverDetails, Integer> {
}
