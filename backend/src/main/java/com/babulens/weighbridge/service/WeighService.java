package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.model.Weight;

import java.util.Date;

public interface WeighService {
	Weight saveWeight (Weight weight);

	Weight getWeight (int slipNo);

	PrintReport getReport (Date startDate, Date endDate, String inputLabel, String input);

	TareWeight getGrossWeight (String vehicleNo);

	void resetWeight (int slipNo);

	Weight updateWeight (Weight weight);
}
