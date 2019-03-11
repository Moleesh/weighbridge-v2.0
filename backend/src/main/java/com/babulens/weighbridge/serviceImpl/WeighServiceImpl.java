package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.WeighService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        if (weightDAO.existsById(slipNo))
            return weightDAO.findById(slipNo).get();
        return null;
    }

    @Override
    public List<Weight> getAllWeight() {
        return Lists.newArrayList(weightDAO.findAll());
    }
}
