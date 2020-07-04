package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintWeightReport;
import com.babulens.weighbridge.model.entity.Setting;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.SettingService;
import com.babulens.weighbridge.service.TareWeightService;
import com.babulens.weighbridge.service.WebCamService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class WeighServiceImpl implements WeighService {

	private final WeightDAO weightDAO;

	private final TareWeightService tareWeightService;

	private final SettingService settingService;

	private final WebCamService webCamService;

	@Autowired
	public WeighServiceImpl(WeightDAO weightDAO, TareWeightService tareWeightService, SettingService settingService,
	                        WebCamService webCamService) {
		this.weightDAO = weightDAO;
		this.tareWeightService = tareWeightService;
		this.settingService = settingService;
		this.webCamService = webCamService;
	}

	@Override
	public synchronized Weight saveWeight(Weight weight) {
		if (weight.getSlipNo() != -1) {
			if (!(weight.getTareTime() == null || weight.getTareTime().toString().trim().equals(""))) {
				tareWeightService.addUpdateTareWeight(
						new TareWeight(weight.getVehicleNo(), weight.getTareWeight(), weight.getTareTime()));
			}
			weight.setSlipNo(Integer.parseInt(settingService.getSettingByProfile("slipNo", weight.getProfile())));
			new Thread(
					() -> webCamService.saveWebCamImageToDisk(weight.getProfile() + "_" + weight.getSlipNo() + ".jpeg",
							webCamService.getMyPrimaryWebCam())).start();
			weight.setId(weight.getProfile() + "_" + weight.getSlipNo());
			weightDAO.save(weight);
			settingService.saveSetting(new Setting("slipNo", weight.getSlipNo() + 1, weight.getProfile()));
		}
		return weight;
	}

	@Override
	public Weight getWeightBySlipNoAndProfile(int slipNo, String profile) {
		return weightDAO.findFirstBySlipNoAndProfileOrderBySlipNoDesc(slipNo, profile);
	}

	@Override
	public PrintWeightReport getWeightReportByProfile(Date startNettTime, Date endNettTime, String inputLabel,
	                                                  String input, String profile) {
		PrintWeightReport printWeightReport = new PrintWeightReport();
		int totalWeight = 0;
		int totalTotalCharges = 0;
		switch (inputLabel) {
			case "Slip No":
				printWeightReport.setWeights(weightDAO
						                             .findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(
								                             Integer.parseInt(0 + input), startNettTime, endNettTime, profile));
				break;
			case "Customer Name":
				printWeightReport.setWeights(weightDAO
						                             .findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(
								                             input, startNettTime, endNettTime, profile));
				break;
			case "Transporter Name":
				printWeightReport.setWeights(weightDAO
						                             .findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(
								                             input, startNettTime, endNettTime, profile));
				break;
			case "Vehicle No":
				printWeightReport.setWeights(weightDAO
						                             .findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(
								                             input, startNettTime, endNettTime, profile));
				break;
			case "Material":
				printWeightReport.setWeights(weightDAO
						                             .findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(
								                             input, startNettTime, endNettTime, profile));
				break;
			default:
				printWeightReport.setWeights(
						weightDAO.findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(
								startNettTime, endNettTime, profile));
				break;
		}
		for (Weight weight : printWeightReport.getWeights()) {
			totalWeight += weight.getNettWeight();
			totalTotalCharges += weight.getCharges();
		}
		printWeightReport.setTotalRecords(printWeightReport.getWeights().size());
		printWeightReport.setTotalWeight(totalWeight);
		printWeightReport.setTotalTotalCharges(totalTotalCharges);
		return printWeightReport;
	}

	@Override
	public TareWeight getGrossWeightByVehicleNoAndProfile(String vehicleNo, String profile) {
		Weight weight = weightDAO.findFirstByVehicleNoAndProfileOrderBySlipNoDesc(vehicleNo, profile);
		if (weight != null) {
			if (weight.getGrossTime() != null && weight.getTareTime() == null) {
				return new TareWeight(vehicleNo, weight.getGrossWeight(), weight.getGrossTime());
			}
		}
		return null;
	}

	@Override
	public void resetWeightByProfile(String slipNo, String profile) {
		weightDAO.deleteAll();
		settingService.saveSetting(new Setting("slipNo", slipNo, profile));
	}

	@Override
	public Weight updateWeight(Weight weight) {
		weight.setManual(true);
		weightDAO.save(weight);
		return weight;
	}
}
