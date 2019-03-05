package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.Weight;

public interface WeighService {
    void saveWeight(Weight weight);
    Weight getWeight(int slipNo);
}
