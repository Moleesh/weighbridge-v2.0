package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Settings;
import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.SettingsService;
import com.babulens.weighbridge.service.TareWeightService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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

    @Override
    public void saveWeight(Weight weight) {
        if (!(weight.getTareTime() == null || weight.getTareTime().toString().trim().equals(""))) {
            List<TareWeight> tareWeightList = tareWeightService.getTareByVehicleNo(weight.getVehicleNo());
            if (tareWeightList.isEmpty()) {
                tareWeightService.addUpdateTareWeight(new TareWeight(weight.getVehicleNo(), weight.getTareWeight(), weight.getTareTime()));
            } else {
                TareWeight tareWeight = tareWeightList.get(0);
                tareWeight.setTareTime(weight.getTareTime());
                tareWeight.setTareWeight(weight.getTareWeight());
                tareWeightService.addUpdateTareWeight(tareWeightList.get(0));
            }
        }
        weightDAO.save(weight);
        settingsService.saveSettings(new Settings("slipNo", Integer.parseInt((String) settingsService.getSetting("slipNo")) + 1));
    }

    @Override
    public Weight getWeight(int slipNo) {
        if (weightDAO.findById(slipNo).isPresent()) {
            return weightDAO.findById(slipNo).get();
        }
        return null;
    }

    @Override
    public List<Weight> getAllWeight(Date startNettTime, Date endNettTime, String inputLabel, String input) {
        switch (inputLabel) {
            case "Slip No":
                return weightDAO.findAllBySlipNoGreaterThanEqualAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(Integer.parseInt(0 + input), startNettTime, endNettTime);
            case "Customer Name":
                return weightDAO.findAllByCustomersNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime);
            case "Transporter Name":
                return weightDAO.findAllByTransporterNameContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime);
            case "Vehicle No":
                return weightDAO.findAllByVehicleNoContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime);
            case "Material":
                return weightDAO.findAllByMaterialContainingAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(input, startNettTime, endNettTime);
            default:
                return weightDAO.findAllByAndNettTimeGreaterThanEqualAndNettTimeLessThanEqualOrderBySlipNoAsc(startNettTime, endNettTime);
        }
    }

    @Override
    public TareWeight getGrossWeight(String vehicleNo) {
        List<Weight> weightList = weightDAO.findAllByVehicleNoAndTareTimeOrderByGrossTimeDesc(vehicleNo, null);
        if (weightList.isEmpty()) {
            return new TareWeight();
        } else {
            return new TareWeight(vehicleNo, weightList.get(0).getGrossWeight(), weightList.get(0).getGrossTime());
        }
    }
}
