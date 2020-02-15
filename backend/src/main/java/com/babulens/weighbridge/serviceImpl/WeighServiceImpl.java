package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.model.entity.Settings;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.repository.WebCamDetailsDAO;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.SettingsService;
import com.babulens.weighbridge.service.TareWeightService;
import com.babulens.weighbridge.service.WebCamService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WeighServiceImpl implements WeighService {

	private final
	WeightDAO weightDAO;

	private final
	TareWeightService tareWeightService;

	private final
	SettingsService settingsService;

	private final
	WebCamService webCamService;

	private final
	WebCamDetailsDAO webCamDetailsDAO;

	@Autowired
	public WeighServiceImpl(WeightDAO weightDAO, TareWeightService tareWeightService, SettingsService settingsService, WebCamService webCamService, WebCamDetailsDAO webCamDetailsDAO) {
		this.weightDAO = weightDAO;
		this.tareWeightService = tareWeightService;
		this.settingsService = settingsService;
		this.webCamService = webCamService;
		this.webCamDetailsDAO = webCamDetailsDAO;
	}

	@Override
	public Weight saveWeight(Weight weight) {
		if (weight.getSlipNo() != -1) {
			if (!(weight.getTareTime() == null || weight.getTareTime().toString().trim().equals(""))) {
				List<TareWeight> tareWeightList = tareWeightService.getTareByVehicleNoAndProfile(weight.getVehicleNo(), weight.getProfile().getProfileName());
				if (tareWeightList.isEmpty()) {
					tareWeightService.addUpdateTareWeight(new TareWeight(weight.getVehicleNo(),
							weight.getTareWeight(), weight.getTareTime(), weight.getProfile().getProfileName()));
				} else {
					TareWeight tareWeight = tareWeightList.get(0);
					tareWeight.setTareTime(weight.getTareTime());
					tareWeight.setTareWeight(weight.getTareWeight());
					tareWeightService.addUpdateTareWeight(tareWeightList.get(0));
				}
			}
			weight.setSlipNo(Integer.parseInt(settingsService.getSettingByProfile("slipNo", weight.getProfile().getProfileName())));
			new Thread(() -> webCamService.saveWebCamImageToDisk(weight.getProfile() + "_" + weight.getSlipNo() + ".jpeg", webCamDetailsDAO.findByMyPrimaryIsTrue().getName())).start();
			weightDAO.save(weight);
			settingsService.saveSetting(new Settings("slipNo", "" + Integer.parseInt(settingsService.getSettingByProfile(
					"slipNo", weight.getProfile().getProfileName()) + 1), weight.getProfile()));
		}
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
		settingsService.saveSetting(new Settings("slipNo", slipNo, new Profile(profile)));
	}

	@Override
	public Weight updateWeight(Weight weight) {
		weight.setManual("Y");
		weightDAO.save(weight);
		return weight;
	}
}
