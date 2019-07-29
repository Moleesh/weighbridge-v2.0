package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.*;
import com.babulens.weighbridge.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
class Controller {

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

    @Autowired
    private
    PrinterService printerService;

    @Autowired
    private
    SerialPortService serialPortService;

    @Autowired
    private
    CameraService cameraService;

    @RequestMapping(value = "/getCameraImage", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody
    byte[] getImage() {
        return cameraService.getCameraImageByteBuffer("My Camera");
    }

    @RequestMapping(value = "/getNextWeight")
    public int getNextWeight() {
        return serialPortService.getWeight();
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
    public Map<String, String> getAllSettings() {
        return settingsService.getAllSettings();
    }

    @RequestMapping(value = "/getAllPrinters", method = {RequestMethod.GET})
    public List<String> getAllPrinters() {
        return printerService.getAllPrinters();
    }

    @RequestMapping(value = "/getAllPrintFormat", method = {RequestMethod.GET})
    public List<String> getAllPrintFormat() {
        return printerService.getAllPrintFormat();
    }

    @RequestMapping(value = "/printWeight", method = {RequestMethod.POST})
    public void printWeight(@RequestBody PrintWeight printWeight) {
        printerService.printWeight(printWeight);
    }

    @RequestMapping(value = "/getAllSerialPort", method = {RequestMethod.GET})
    public List<String> getAllSerialPort() {
        return serialPortService.getAllSerialPort();
    }

    @RequestMapping(value = "/settingUpIndicator", method = {RequestMethod.GET})
    public void settingUpIndicator() {
        serialPortService.settingUpIndicator();
    }

    @RequestMapping(value = "/settingUpDisplay", method = {RequestMethod.GET})
    public void settingUpDisplay() {
        serialPortService.settingUpDisplay();
    }

    @RequestMapping(value = "/sendToDisplay", method = {RequestMethod.PUT})
    public void sendToDisplay(@RequestBody String message) {
        serialPortService.sendToDisplay(message);
    }

    @RequestMapping(value = "/saveAllSettings", method = {RequestMethod.PUT})
    public void saveAllSettings(@RequestBody Map<String, String> settings) {
        settingsService.saveAllSettings(settings);
    }

}
