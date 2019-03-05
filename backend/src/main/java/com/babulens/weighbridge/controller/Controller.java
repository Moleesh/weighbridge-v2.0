package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    WeighService weighService;

    Weight weight;
    @RequestMapping(value = "/getNextSlipNo")
    public String getNextSlipNo() {        return "1";
    }

    @RequestMapping(value = "/saveWeight", method = {RequestMethod.POST})
    public void saveWeight(@RequestBody Weight weight) {
        weighService.saveWeight(weight);
    }

    @RequestMapping(value = "/getWeight")
    public Weight getWeight(@RequestParam("slipNo") String slipNo) {
        return weighService.getWeight(Integer.parseInt(""+slipNo));
    }
}
