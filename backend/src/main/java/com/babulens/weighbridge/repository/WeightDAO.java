package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Weight;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface WeightDAO extends CrudRepository<Weight, Integer> {
     List<Weight> findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqual(Date startDate, Date endDate);
}
