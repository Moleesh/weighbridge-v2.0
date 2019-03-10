package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Drivers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriversDAO extends CrudRepository<Drivers, Integer> {
}
