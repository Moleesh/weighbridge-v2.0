package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.repository.WeightDAO;
import com.babulens.weighbridge.service.WeighService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WeighServiceImpl implements WeighService{

    @Autowired
    WeightDAO weightDAO;

    @Override
    public void saveWeight(Weight weight) {
        weightDAO.save(weight);
    }

    @Override
    public Weight getWeight(int slipNo) {
        if (weightDAO.existsById(slipNo))
            return weightDAO.findById(slipNo).get();
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
}
