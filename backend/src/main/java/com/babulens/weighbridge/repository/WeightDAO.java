package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Weight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface WeightDAO extends CrudRepository<Weight, Integer> {

    List<Weight> findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(int input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(String input, Date startNettTime, Date endNettTime);

    List<Weight> findAllByAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(Date startNettTime, Date endNettTime);

    List<Weight> findAllByVehicleNoAndTareTimeOrderByGrossTimeDesc(String vehicleNo, Date tareTime);
}
