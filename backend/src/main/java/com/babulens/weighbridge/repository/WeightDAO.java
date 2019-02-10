package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Weight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightDAO extends CrudRepository<Weight, Integer> {
}
