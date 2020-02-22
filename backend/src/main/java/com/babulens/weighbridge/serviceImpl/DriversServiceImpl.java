package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Driver;
import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.repository.DriverDAO;
import com.babulens.weighbridge.service.DriverService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriversServiceImpl implements DriverService {

	private final
	DriverDAO driverDAO;

	@Autowired
	public DriversServiceImpl(DriverDAO driverDAO) {
		this.driverDAO = driverDAO;
	}

	@Override
	@Cacheable(cacheNames = "Drivers")
	public List<Driver> getAllDriversByProfile(String profile) {
		return Lists.newArrayList(driverDAO.findAllByProfile(new Profile(profile)));
	}

	@Override
	@CacheEvict(value = "Drivers", allEntries = true)
	public Driver addUpdateDrivers(Driver driver) {
		return driverDAO.save(driver);
	}

	@Override
	@CacheEvict(value = "Drivers", allEntries = true)
	public void deleteDrivers(int id) {
		driverDAO.deleteById(id);
	}

}
