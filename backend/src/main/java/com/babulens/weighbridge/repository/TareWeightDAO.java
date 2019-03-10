package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.TareWeight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareWeightDAO extends CrudRepository<TareWeight, Integer> {
}
