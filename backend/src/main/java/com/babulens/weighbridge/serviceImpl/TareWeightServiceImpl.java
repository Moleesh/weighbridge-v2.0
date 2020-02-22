package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.repository.TareWeightDAO;
import com.babulens.weighbridge.service.TareWeightService;
import com.google.common.collect.Lists;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareWeightServiceImpl implements TareWeightService {

	private final
	TareWeightDAO tareWeightDAO;

	public TareWeightServiceImpl(TareWeightDAO tareWeightDAO) {
		this.tareWeightDAO = tareWeightDAO;
	}

	@Override
	@Cacheable(cacheNames = "TareWeights")
	public TareWeight getTareWeightByVehicleNoAndProfile(String vehicleNo, String profile) {
		return tareWeightDAO.findFirstByVehicleNoAndProfile(vehicleNo, new Profile(profile));
	}

	@Override
	@Cacheable(cacheNames = "TareWeights")
	public List<TareWeight> getAllTareWeightsByProfile(String profile) {
		return Lists.newArrayList(tareWeightDAO.findAllByProfile(new Profile(profile)));
	}

	@Override
	@CacheEvict(value = "TareWeights", allEntries = true)
	public TareWeight addUpdateTareWeight(TareWeight tareWeight) {
		return tareWeightDAO.save(tareWeight);
	}

	@Override
	@CacheEvict(value = "TareWeights", allEntries = true)
	public void deleteTareWeight(int id) {
		tareWeightDAO.deleteById(id);
	}

}
