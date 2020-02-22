package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.Setting;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.repository.WebCamDetailDAO;
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

	private final
	WeightDAO weightDAO;

	private final
	TareWeightService tareWeightService;

	private final
	SettingService settingService;

	private final
	WebCamService webCamService;

	private final
	WebCamDetailDAO webCamDetailDAO;

	@Autowired
	public WeighServiceImpl(WeightDAO weightDAO, TareWeightService tareWeightService, SettingService settingService, WebCamService webCamService, WebCamDetailDAO webCamDetailDAO) {
		this.weightDAO = weightDAO;
		this.tareWeightService = tareWeightService;
		this.settingService = settingService;
		this.webCamService = webCamService;
		this.webCamDetailDAO = webCamDetailDAO;
	}

	@Override
	public Weight saveWeight(Weight weight) {
		// TODO: 2/22/2020 weight
//		if (weight.getSlipNo() != -1) {
//			if (!(weight.getTareTime() == null || weight.getTareTime().toString().trim().equals(""))) {
//				TareWeight tareWeight = tareWeightService.getTareWeightByVehicleNoAndProfile(weight.getVehicleNo(), weight.getProfile().getProfileName());
//				if (tareWeightList.isEmpty()) {
//					tareWeightService.addUpdateTareWeight(new TareWeight(weight.getVehicleNo(),
//							weight.getTareWeight(), weight.getTareTime(), weight.getProfile().getProfileName()));
//				} else {
//					TareWeight tareWeight = tareWeightList.get(0);
//					tareWeight.setTareTime(weight.getTareTime());
//					tareWeight.setTareWeight(weight.getTareWeight());
//					tareWeightService.addUpdateTareWeight(tareWeightList.get(0));
//				}
//			}
//			weight.setSlipNo(Integer.parseInt(settingService.getSettingByProfile("slipNo", weight.getProfile().getProfileName())));
//			new Thread(() -> webCamService.saveWebCamImageToDisk(weight.getProfile() + "_" + weight.getSlipNo() + ".jpeg", webCamDetailDAO.findByMyPrimaryIsTrue().getName())).start();
//			weightDAO.save(weight);
//			settingService.saveSetting(new Setting("slipNo", "" + Integer.parseInt(settingService.getSettingByProfile(
//					"slipNo", weight.getProfile().getProfileName()) + 1), weight.getProfile()));
//		}
		return weight;
	}

	@Override
	public Weight getWeightBySlipNoAndProfile(int slipNo, String profile) {
		if (weightDAO.findById(slipNo).isPresent()) {
			return weightDAO.findById(slipNo).get();
		}
		return null;
	}

	@Override
	public PrintReport getReportByProfile(Date startNettTime, Date endNettTime, String inputLabel, String input, String profile) {
		PrintReport printReport = new PrintReport();
		int totalNettWeight = 0;
		int totalTotalCharges = 0;
		switch (inputLabel) {
			case "Slip No":
				printReport.setWeights(weightDAO.findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(Integer.parseInt(0 + input), startNettTime, endNettTime, new Profile(profile)));
				break;
			case "Customer Name":
				printReport.setWeights(weightDAO.findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(input, startNettTime, endNettTime, new Profile(profile)));
				break;
			case "Transporter Name":
				printReport.setWeights(weightDAO.findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(input, startNettTime, endNettTime, new Profile(profile)));
				break;
			case "Vehicle No":
				printReport.setWeights(weightDAO.findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(input, startNettTime, endNettTime, new Profile(profile)));
				break;
			case "Material":
				printReport.setWeights(weightDAO.findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(input, startNettTime, endNettTime, new Profile(profile)));
				break;
			default:
				printReport.setWeights(weightDAO.findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqualAndProfileOrderBySlipNoAsc(startNettTime, endNettTime, new Profile(profile)));
				break;
		}
		for (Weight weight : printReport.getWeights()) {
			totalNettWeight += weight.getNettWeight();
			totalTotalCharges += weight.getCharges();
		}
		printReport.setTotalRecords(printReport.getWeights().size());
		printReport.setTotalNettWeight(totalNettWeight);
		printReport.setTotalTotalCharges(totalTotalCharges);
		return printReport;
	}

	@Override
	public TareWeight getGrossWeightByVehicleNoAndProfile(String vehicleNo, String profile) {
		Weight weight = weightDAO.findFirstByVehicleNoAndProfileOrderBySlipNoDesc(vehicleNo, new Profile(profile));
		if (weight != null) {
			if (weight.getGrossTime() != null && weight.getTareTime() == null) {
				return new TareWeight(vehicleNo, weight.getGrossWeight(), weight.getGrossTime(), weight.getProfile().getProfileName());
			}
		}
		return null;
	}

	@Override
	public void resetWeightByProfile(String slipNo, String profile) {
		weightDAO.deleteAll();
		settingService.saveSetting(new Setting("slipNo", slipNo, new Profile(profile)));
	}

	@Override
	public Weight updateWeight(Weight weight) {
		weight.setManual("Y");
		weightDAO.save(weight);
		return weight;
	}
}
