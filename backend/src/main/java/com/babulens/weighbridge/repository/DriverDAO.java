package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Driver;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverDAO extends CrudRepository<Driver, Integer> {
}
