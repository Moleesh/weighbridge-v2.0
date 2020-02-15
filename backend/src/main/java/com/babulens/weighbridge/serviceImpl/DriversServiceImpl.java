package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Drivers;
import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.repository.DriversDAO;
import com.babulens.weighbridge.service.DriversService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriversServiceImpl implements DriversService {

	private final
	DriversDAO driversDAO;

	@Autowired
	public DriversServiceImpl(DriversDAO driversDAO) {
		this.driversDAO = driversDAO;
	}

	@Override
	public List<Drivers> getAllDriversByProfile(String profile) {
		return Lists.newArrayList(driversDAO.findAllByProfile(new Profile(profile)));
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
