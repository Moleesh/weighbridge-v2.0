package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.TareWeights;

import java.util.List;

public interface TareWeightsService {

    List<TareWeights> getAllTareWeights();

    TareWeights addUpdateTareWeights(TareWeights tareWeights);

    void deleteTareWeights(int id);
}
