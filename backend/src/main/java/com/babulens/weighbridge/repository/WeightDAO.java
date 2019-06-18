package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Weight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface WeightDAO extends CrudRepository<Weight, Integer> {

    List<Weight> findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualByOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByCustomerNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualByOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualByOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualByOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualByOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualByOrderBySlipNoAsc(Date startNettTime, Date endNettTime);

    List<Weight> findAllByVehicleNoAndTareTimeByOrderByGrossTimeDesc(String vehicleNo, Date tareTime);
}
