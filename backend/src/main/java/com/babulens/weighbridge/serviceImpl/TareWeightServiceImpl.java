package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.repository.TareWeightDAO;
import com.babulens.weighbridge.service.TareWeightService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Service
public class TareWeightServiceImpl implements TareWeightService {

    @Autowired
    private
    TareWeightDAO tareWeightDAO;

    public TareWeightServiceImpl(TareWeightDAO tareWeightDAO) {
        this.tareWeightDAO = tareWeightDAO;
    }

    @Override
    public TareWeight getTareWeight(String vehicleNo) {
        List<TareWeight> tareWeightList = getTareByVehicleNo(vehicleNo);
        if (tareWeightList.isEmpty()) {
            return new TareWeight();
        } else {
            return tareWeightList.get(0);
        }
    }

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

    @Override
    public List<TareWeight> getTareByVehicleNo(String vehicleNo) {
        return tareWeightDAO.findByVehicleNo(vehicleNo);
    }
}
