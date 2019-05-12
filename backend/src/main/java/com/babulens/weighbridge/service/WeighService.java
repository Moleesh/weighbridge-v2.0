package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.model.Weight;

import java.util.Date;
import java.util.List;

public interface WeighService {
    void saveWeight(Weight weight);

    Weight getWeight(int slipNo);

    List<Weight> getAllWeight(Date startDate, Date endDate, String inputLabel, String input);

    TareWeight getGrossWeight(String vehicleNo);
}
