package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.TareWeight;

import java.util.List;

public interface TareWeightService {

	TareWeight getTareWeightByVehicleNoAndProfile(String vehicleNo, String profile);

	List<TareWeight> getAllTareWeightsByProfile(String profile);

	TareWeight addUpdateTareWeight(TareWeight tareWeight);

	void deleteTareWeight(int id);

}
