package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Weight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface WeightDAO extends CrudRepository<Weight, String> {

    List<Weight> findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(int slipNo, Date startNettTime, Date endNettTime, String profile);

    List<Weight> findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String customersName, Date startNettTime, Date endNettTime, String profile);

    List<Weight> findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String transporterName, Date startNettTime, Date endNettTime, String profile);

    List<Weight> findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String vehicleNo, Date startNettTime, Date endNettTime, String profile);

    List<Weight> findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String material, Date startNettTime, Date endNettTime, String profile);

    List<Weight> findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(Date startNettTime, Date endNettTime, String profile);

    Weight findFirstByVehicleNoAndProfileOrderBySlipNoDesc(String vehicleNo, String profile);

    Weight findFirstBySlipNoAndProfileOrderBySlipNoDesc(int slipNo, String profile);

    Long deleteByProfile(String profile);

}
