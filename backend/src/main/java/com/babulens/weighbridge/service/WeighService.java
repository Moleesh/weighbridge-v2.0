package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.Weight;

import java.util.List;

public interface WeighService {
    void saveWeight(Weight weight);
    Weight getWeight(int slipNo);
    List<Weight> getAllWeight();
}
