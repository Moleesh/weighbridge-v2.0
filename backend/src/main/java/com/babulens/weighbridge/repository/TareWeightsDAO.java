package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.TareWeights;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareWeightsDAO extends CrudRepository<TareWeights, Integer> {
}
