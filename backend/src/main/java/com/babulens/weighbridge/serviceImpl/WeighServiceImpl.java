package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.Settings;
import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.CameraService;
import com.babulens.weighbridge.service.SettingsService;
import com.babulens.weighbridge.service.TareWeightService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Service
public class WeighServiceImpl implements WeighService {

    @Autowired
    private
    WeightDAO weightDAO;

    @Autowired
    private
    TareWeightService tareWeightService;

    @Autowired
    private
    SettingsService settingsService;

    @Autowired
    private
    CameraService cameraService;

    @Override
    public Weight saveWeight(Weight weight) {
        if (weight.getSlipNo() != -1) {
            if (!(weight.getTareTime() == null || weight.getTareTime().toString().trim().equals(""))) {
                List<TareWeight> tareWeightList = tareWeightService.getTareByVehicleNo(weight.getVehicleNo());
                if (tareWeightList.isEmpty()) {
                    tareWeightService.addUpdateTareWeight(new TareWeight(weight.getVehicleNo(),
                            weight.getTareWeight(), weight.getTareTime()));
                } else {
                    TareWeight tareWeight = tareWeightList.get(0);
                    tareWeight.setTareTime(weight.getTareTime());
                    tareWeight.setTareWeight(weight.getTareWeight());
                    tareWeightService.addUpdateTareWeight(tareWeightList.get(0));
                }
            }
            weight.setSlipNo(Integer.parseInt((String) settingsService.getSetting("slipNo")));
            new Thread(() -> cameraService.saveCameraImageToDisk(weight.getSlipNo() + ".jpeg")).start();
            weightDAO.save(weight);
            settingsService.saveSettings(new Settings("slipNo", Integer.parseInt((String) settingsService.getSetting(
                    "slipNo")) + 1));
        }
        return weight;
    }

    @Override
    public Weight getWeight(int slipNo) {
        if (weightDAO.findById(slipNo).isPresent()) {
            return weightDAO.findById(slipNo).get();
        }
        return null;
    }

    @Override
    public PrintReport getReport(Date startNettTime, Date endNettTime, String inputLabel, String input) {
        PrintReport printReport = new PrintReport();
        int totalNettWeight = 0;
        int totalTotalCharges = 0;
        switch (inputLabel) {
            case "Slip No":
                printReport.setWeights(weightDAO.findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(Integer.parseInt(0 + input), startNettTime, endNettTime));
                break;
            case "Customer Name":
                printReport.setWeights(weightDAO.findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime));
                break;
            case "Transporter Name":
                printReport.setWeights(weightDAO.findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime));
                break;
            case "Vehicle No":
                printReport.setWeights(weightDAO.findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime));
                break;
            case "Material":
                printReport.setWeights(weightDAO.findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime));
                break;
            default:
                printReport.setWeights(weightDAO.findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(startNettTime, endNettTime));
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
    public TareWeight getGrossWeight(String vehicleNo) {
        Weight weigh = weightDAO.findOneByVehicleNoOrderByGrossTimeDesc(vehicleNo);
        if (weigh != null) {
            if (weigh.getGrossTime() != null && weigh.getTareTime() == null) {
                return new TareWeight(vehicleNo, weigh.getGrossWeight(), weigh.getGrossTime());
            }
        }
        return new TareWeight();
    } 

    @Override
    public void resetWeight(int slipNo) {
        weightDAO.deleteAll();
        settingsService.saveSettings(new Settings("slipNo", slipNo));
    }
}
