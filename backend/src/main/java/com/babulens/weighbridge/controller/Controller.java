package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.*;
import com.babulens.weighbridge.service.DriversService;
import com.babulens.weighbridge.service.MaterialService;
import com.babulens.weighbridge.service.TareWeightService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    WeighService weighService;

    @Autowired
    MaterialService materialService;

    @Autowired
    DriversService driversService;

    @Autowired
    TareWeightService tareWeightService;

    int count =1;
    @RequestMapping(value = "/getNextSlipNo")
    public int getNextSlipNo() { return count ++;
    }

    @RequestMapping(value = "/getNextWeight")
    public int getNextWeight() { return (int)(Math.random() * 10000 + 1);
    }

    @RequestMapping(value = "/saveWeight", method = {RequestMethod.POST})
    public void saveWeight(@RequestBody Weight weight) {
        weighService.saveWeight(weight);
    }

    @RequestMapping(value = "/getWeight")
    public Weight getWeight(@RequestParam("slipNo") int slipNo) {
        return weighService.getWeight(slipNo);
    }

    @RequestMapping(value = "/getAllWeight", method = {RequestMethod.POST})
    public List<Weight> getAllWeight(@RequestBody GetReport getReport) {
        return weighService.getAllWeight(getReport.getStartDate(), getReport.getEndDate(), getReport.getInputLabel(), getReport.getInput());
    }

    @RequestMapping(value = "/getAllMaterial")
    public List<Material> getAllMaterial() {
        return materialService.getAllMaterial();
    }

    @RequestMapping(value = "/addUpdateMaterial", method = {RequestMethod.POST, RequestMethod.PUT})
    public Material addUpdateMaterial(@RequestBody Material material) {
        return materialService.addUpdateMaterial(material);
    }

    @RequestMapping(value = "/deleteMaterial", method = {RequestMethod.DELETE})
    public void deleteMaterial(@RequestParam("id") int id) {
        materialService.deleteMaterial(id);
    }

    @RequestMapping(value = "/getAllDrivers")
    public List<Drivers> getAllDrivers() {
        return driversService.getAllDrivers();
    }

    @RequestMapping(value = "/addUpdateDrivers", method = {RequestMethod.POST, RequestMethod.PUT})
    public Drivers addUpdateDrivers(@RequestBody Drivers drivers) {
        return driversService.addUpdateDrivers(drivers);
    }

    @RequestMapping(value = "/deleteDrivers", method = {RequestMethod.DELETE})
    public void deleteDrivers(@RequestParam("id") int id) {
        driversService.deleteDrivers(id);
    }

    @RequestMapping(value = "/getAllTareWeight")
    public List<TareWeight> getAllTareWeight() {
        return tareWeightService.getAllTareWeight();
    }

    @RequestMapping(value = "/addUpdateTareWeight", method = {RequestMethod.POST, RequestMethod.PUT})
    public TareWeight addUpdateTareWeight(@RequestBody TareWeight tareWeight) {
        return tareWeightService.addUpdateTareWeight(tareWeight);
    }

    @RequestMapping(value = "/deleteTareWeight", method = {RequestMethod.DELETE})
    public void deleteTareWeight(@RequestParam("id") int id) {
        tareWeightService.deleteTareWeight(id);
    }
}
