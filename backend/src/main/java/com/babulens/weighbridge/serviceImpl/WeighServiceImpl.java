package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.TareWeight;
import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
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

    @Override
    public void saveWeight(Weight weight) {
        if (!weight.getTareTime().toString().trim().equals("")) {
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
    }

    @Override
    public Weight getWeight(int slipNo) {
        if (weightDAO.existsById(slipNo)) {
            return weightDAO.findById(slipNo).get();
        }
        return null;
    }

    @Override
    public List<Weight> getAllWeight(Date startDate, Date endDate, String inputLabel, String input) {
        switch (inputLabel) {
            case "Slip No":
                inputLabel = "slipNo";

                break;
            case "Customer Name":
                inputLabel = "customersName";
                input = "%" + input + "%";

                break;
            case "Transporter Name":
                inputLabel = "transporterName";
                input = "%" + input + "%";

                break;
            case "Vehicle No":
                inputLabel = "vehicleNo";
                input = "%" + input + "%";

                break;
            case "Material":
                inputLabel = "material";
                input = "%" + input + "%";

                break;
            default:
                inputLabel = "slipNo";
                input = "%";

        }
        return weightDAO.findAllByNettTimeGreaterThanEqualAndNettTimeLessThanEqual(startDate, endDate);
    }

    @Override
    public TareWeight getGrossWeight(String vehicleNo) {
        List<Weight> weightList = weightDAO.findAllByVehicleNoAndTareTime(vehicleNo, null);
        if (weightList.isEmpty()) {
            return new TareWeight();
        } else {
            TareWeight tareWeight = new TareWeight(vehicleNo, weightList.get(0).getGrossWeight(), weightList.get(0).getGrossTime());
            return tareWeight;
        }
    }
}
