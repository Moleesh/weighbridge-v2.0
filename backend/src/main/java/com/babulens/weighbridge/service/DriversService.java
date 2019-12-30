package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.Drivers;

import java.util.List;

public interface DriversService {

	List<Drivers> getAllDrivers ();

	Drivers addUpdateDrivers (Drivers drivers);

	void deleteDrivers (int id);
}
