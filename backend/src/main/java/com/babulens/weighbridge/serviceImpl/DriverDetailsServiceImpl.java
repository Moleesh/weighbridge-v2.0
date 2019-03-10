package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.DriverDetails;
import com.babulens.weighbridge.repository.DriverDetailsDAO;
import com.babulens.weighbridge.service.DriverDetailsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverDetailsServiceImpl implements DriverDetailsService {

    @Autowired
    DriverDetailsDAO driverDetailsDAO;

    @Override
    public List<DriverDetails> getAllDriverDetails() {
        return Lists.newArrayList(driverDetailsDAO.findAll());
    }

    @Override
    public DriverDetails addUpdateDriverDetails(DriverDetails driverDetails) {
        return driverDetailsDAO.save(driverDetails);
    }

    @Override
    public void deleteDriverDetails(int id) {
        driverDetailsDAO.deleteById(id);
    }
}
