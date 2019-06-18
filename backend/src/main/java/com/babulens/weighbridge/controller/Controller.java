package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.*;
import com.babulens.weighbridge.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    private
    WeighService weighService;

    @Autowired
    private
    MaterialService materialService;

    @Autowired
    private
    DriversService driversService;

    @Autowired
    private
    TareWeightService tareWeightService;

    @Autowired
    private
    SettingsService settingsService;

    @RequestMapping(value = "/getNextWeight")
    public static int getNextWeight() {
        return (int) (Math.random() * 10000 + 1);
    }

    @RequestMapping(value = "/getTareWeight")
    public TareWeight getTareWeight(@RequestParam("vehicleNo") String vehicleNo) {
        return tareWeightService.getTareWeight(vehicleNo);
    }

    @RequestMapping(value = "/getGrossWeight")
    public TareWeight getGrossWeight(@RequestParam("vehicleNo") String vehicleNo) {
        return weighService.getGrossWeight(vehicleNo);
    }

    @RequestMapping(value = "/getNextSlipNo")
    public int getNextSlipNo() {
        return Integer.parseInt((String) settingsService.getSetting("slipNo"));
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

    @RequestMapping(value = "/getAllSettings", method = {RequestMethod.GET})
    public List<Settings> getAllSettings() {
        return settingsService.getAllSettings();
    }

    @RequestMapping(value = "/saveAllSettings", method = {RequestMethod.PUT})
    public void saveAllSettings(@RequestParam("Settings") List<Settings> settings) {
        settingsService.saveAllSettings(settings);
    }
}
