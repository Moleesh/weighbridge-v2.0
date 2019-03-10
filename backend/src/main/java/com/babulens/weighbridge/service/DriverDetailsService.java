package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.DriverDetails;

import java.util.List;

public interface DriverDetailsService {

    List<DriverDetails> getAllDriverDetails();

    DriverDetails addUpdateDriverDetails(DriverDetails driverDetails);

    void deleteDriverDetails(int id);
}
