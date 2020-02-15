package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.model.entity.Weight;

import java.util.Date;

public interface WeighService {
	Weight saveWeight(Weight weight);

	Weight getWeightBySlipNoAndProfile(int slipNo, String profile);

	PrintReport getReportByProfile(Date startDate, Date endDate, String inputLabel, String input, String profile);

	TareWeight getGrossWeightByVehicleNoAndProfile(String vehicleNo, String profile);

	void resetWeightByProfile(String slipNo, String profile);

	Weight updateWeight(Weight weight);
}
