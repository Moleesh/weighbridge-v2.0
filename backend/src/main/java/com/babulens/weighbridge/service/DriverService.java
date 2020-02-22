package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.Driver;

import java.util.List;

public interface DriverService {

	List<Driver> getAllDriversByProfile(String profile);

	Driver addUpdateDrivers(Driver driver);

	void deleteDrivers(int id);
}
