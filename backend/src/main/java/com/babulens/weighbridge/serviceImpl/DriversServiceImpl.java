package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Drivers;
import com.babulens.weighbridge.repository.DriversDAO;
import com.babulens.weighbridge.service.DriversService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriversServiceImpl implements DriversService {

    @Autowired
    DriversDAO driversDAO;

    @Override
    public List<Drivers> getAllDrivers() {
        return Lists.newArrayList(driversDAO.findAll());
    }

    @Override
    public Drivers addUpdateDrivers(Drivers drivers) {
        return driversDAO.save(drivers);
    }

    @Override
    public void deleteDrivers(int id) {
        driversDAO.deleteById(id);
    }
}
