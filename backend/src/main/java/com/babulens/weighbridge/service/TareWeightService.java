package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.TareWeight;

import java.util.List;

public interface TareWeightService {

    List<TareWeight> getAllTareWeight();

    TareWeight addUpdateTareWeight(TareWeight tareWeight);

    void deleteTareWeight(int id);
}
