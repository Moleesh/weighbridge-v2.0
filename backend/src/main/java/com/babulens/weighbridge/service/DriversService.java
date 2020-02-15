package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.Drivers;

import java.util.List;

public interface DriversService {

	List<Drivers> getAllDriversByProfile(String profile);

	Drivers addUpdateDrivers(Drivers drivers);

	void deleteDrivers(int id);
}
