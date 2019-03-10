package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.repository.TareWeightDAO;
import com.babulens.weighbridge.service.TareWeightService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareWeightServiceImpl implements TareWeightService {

    @Autowired
    TareWeightDAO tareWeightDAO;

    @Override
    public List<TareWeight> getAllTareWeight() {
        return Lists.newArrayList(tareWeightDAO.findAll());
    }

    @Override
    public TareWeight addUpdateTareWeight(TareWeight tareWeight) {
        return tareWeightDAO.save(tareWeight);
    }

    @Override
    public void deleteTareWeight(int id) {
        tareWeightDAO.deleteById(id);
    }
}
