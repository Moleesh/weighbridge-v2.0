package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.TareWeights;
import com.babulens.weighbridge.repository.TareWeightsDAO;
import com.babulens.weighbridge.service.TareWeightsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareWeightsServiceImpl implements TareWeightsService {

    @Autowired
    TareWeightsDAO tareWeightsDAO;

    @Override
    public List<TareWeights> getAllTareWeights() {
        return Lists.newArrayList(tareWeightsDAO.findAll());
    }

    @Override
    public TareWeights addUpdateTareWeights(TareWeights tareWeights) {
        return tareWeightsDAO.save(tareWeights);
    }

    @Override
    public void deleteTareWeights(int id) {
        tareWeightsDAO.deleteById(id);
    }
}
