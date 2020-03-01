package com.babulens.weighbridge.serviceImpl;

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
	public TareWeight getTareWeightByVehicleNo(String vehicleNo) {
		return tareWeightDAO.findById(vehicleNo).orElse(null);
	}

	@Override
	public List<TareWeight> getAllTareWeights() {
		return Lists.newArrayList(tareWeightDAO.findAll());
	}

	@Override
	public TareWeight addUpdateTareWeight(TareWeight tareWeight) {
		return tareWeightDAO.save(tareWeight);
	}

	@Override
	public void deleteTareWeight(String vehicleNo) {
		tareWeightDAO.deleteById(vehicleNo);
	}

}
