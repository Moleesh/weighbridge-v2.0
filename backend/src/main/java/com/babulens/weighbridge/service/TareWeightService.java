package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.TareWeight;

import java.util.List;

public interface TareWeightService {

    TareWeight getTareWeight(String vehicleNo);

    List<TareWeight> getAllTareWeight();

    TareWeight addUpdateTareWeight(TareWeight tareWeight);

    void deleteTareWeight(int id);

    List<TareWeight> getTareByVehicleNo(String vehicleNo);
}
