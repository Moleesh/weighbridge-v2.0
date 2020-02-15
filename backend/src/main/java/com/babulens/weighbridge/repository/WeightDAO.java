package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.Weight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface WeightDAO extends CrudRepository<Weight, Integer> {

	List<Weight> findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(int slipNo, Date nettTime, Date nettTime2, Profile profile);

	List<Weight> findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String customersName, Date nettTime, Date nettTime2, Profile profile);

	List<Weight> findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String transporterName, Date nettTime, Date nettTime2, Profile profile);

	List<Weight> findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String vehicleNo, Date nettTime, Date nettTime2, Profile profile);

	List<Weight> findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(String material, Date nettTime, Date nettTime2, Profile profile);

	List<Weight> findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(Date nettTime, Date nettTime2, Profile profile);

	Weight findFirstByVehicleNoAndProfileOrderBySlipNoDesc(String vehicleNo, Profile profile);

}
