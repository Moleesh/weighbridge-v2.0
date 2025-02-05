package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.TareWeight;

import java.util.List;

public interface TareWeightService {

    TareWeight getTareWeightByVehicleNo(String vehicleNo);

    List<TareWeight> getAllTareWeights();

    TareWeight addUpdateTareWeight(TareWeight tareWeight);

    void deleteTareWeight(String vehicleNo);

}
