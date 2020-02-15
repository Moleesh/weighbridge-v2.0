package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.repository.TareWeightDAO;
import com.babulens.weighbridge.service.TareWeightService;
import com.google.common.collect.Lists;
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
	public TareWeight getTareWeightByVehicleNoAndProfile(String vehicleNo, String profile) {
		List<TareWeight> tareWeightList = getTareByVehicleNoAndProfile(vehicleNo, profile);
		if (tareWeightList.isEmpty()) {
			return null;
		} else {
			return tareWeightList.get(0);
		}
	}

	@Override
	public List<TareWeight> getAllTareWeightByProfile(String profile) {
		return Lists.newArrayList(tareWeightDAO.findAllByProfile(new Profile(profile)));
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
	public List<TareWeight> getTareByVehicleNoAndProfile(String vehicleNo, String profile) {
		return tareWeightDAO.findAllByVehicleNoAndProfile(vehicleNo, new Profile(profile));
	}
}
