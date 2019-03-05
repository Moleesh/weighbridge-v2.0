package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeighServiceImpl implements WeighService{

    @Autowired
    WeightDAO weightDAO;

    @Override
    public void saveWeight(Weight weight) {
        weightDAO.save(weight);
    }

    @Override
    public Weight getWeight(int slipNo) {
        return weightDAO.findById(slipNo).get();
    }
}
