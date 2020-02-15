package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.GetReport;
import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.entity.Drivers;
import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
class Controller {

	private final
	WeighService weighService;

	private final
	MaterialService materialService;

	private final
	DriversService driversService;

	private final
	TareWeightService tareWeightService;

	private final
	SettingsService settingsService;

	private final
	PrinterService printerService;

	private final
	SerialPortService serialPortService;

	private final
	WebCamService webCamService;

	@Autowired
	public Controller(WeighService weighService, MaterialService materialService, DriversService driversService, TareWeightService tareWeightService, SettingsService settingsService, PrinterService printerService, SerialPortService serialPortService, WebCamService webCamService) {
		this.weighService = weighService;
		this.materialService = materialService;
		this.driversService = driversService;
		this.tareWeightService = tareWeightService;
		this.settingsService = settingsService;
		this.printerService = printerService;
		this.serialPortService = serialPortService;
		this.webCamService = webCamService;
	}

	@RequestMapping(value = "/settingUpWebCam", method = {RequestMethod.GET})
	public void settingUpWebCam(@RequestParam("webcam") String webcam) {
		webCamService.settingUpWebCam(webcam);
	}

	@RequestMapping(value = "/getAllWebCams", method = {RequestMethod.GET})
	public List<String> getAllWebCams() {
		return webCamService.getAllWebCams();
	}

	@RequestMapping(value = "/getWebCamImage", method = RequestMethod.GET,
			produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody
	byte[] getImage(@RequestParam("webcam") String webcam) {
		return webCamService.getWebCamImage(webcam);
	}

	@RequestMapping(value = "/getNextWeight")
	public int getNextWeight() {
		return serialPortService.getWeight();
	}

	@RequestMapping(value = "/getTareWeightByVehicleNoAndProfile")
	public TareWeight getTareWeightByVehicleNoAndProfile(@RequestParam("vehicleNo") String vehicleNo, @RequestParam("profile") String profile) {
		return tareWeightService.getTareWeightByVehicleNoAndProfile(vehicleNo, profile);
	}

	@RequestMapping(value = "/getGrossWeightByVehicleNoAndProfile")
	public TareWeight getGrossWeightByVehicleNoAndProfile(@RequestParam("vehicleNo") String vehicleNo, @RequestParam("profile") String profile) {
		return weighService.getGrossWeightByVehicleNoAndProfile(vehicleNo, profile);
	}

	@RequestMapping(value = "/getDefaultSlipNo")
	public int getDefaultSlipNo() {
		return -1;
	}

	@RequestMapping(value = "/getNextSlipNo")
	public int getNextSlipNo(@RequestParam("profile") String profile) {
		return Integer.parseInt(settingsService.getSettingByProfile("slipNo", profile));
	}

	@RequestMapping(value = "/saveWeight", method = {RequestMethod.POST})
	public Weight saveWeight(@RequestBody Weight weight) {
		return weighService.saveWeight(weight);
	}

	@RequestMapping(value = "/updateWeight", method = {RequestMethod.POST})
	public Weight updateWeight(@RequestBody Weight weight) {
		return weighService.updateWeight(weight);
	}

	@RequestMapping(value = "/resetWeightByProfile", method = {RequestMethod.GET})
	public void resetWeightByProfile(@RequestParam String slipNo, @RequestParam String profile) {
		weighService.resetWeightByProfile(slipNo, profile);
	}

	@RequestMapping(value = "/getWeightBySlipNoAndProfile")
	public Weight getWeightBySlipNoAndProfile(@RequestParam("slipNo") int slipNo, @RequestParam String profile) {
		return weighService.getWeightBySlipNoAndProfile(slipNo, profile);
	}

	@RequestMapping(value = "/getReport", method = {RequestMethod.POST})
	public PrintReport getReport(@RequestBody GetReport getReport) {
		return weighService.getReportByProfile(getReport.getStartDate(), getReport.getEndDate(), getReport.getInputLabel(),
				getReport.getInput(), getReport.getProfile());
	}

	@RequestMapping(value = "/getAllMaterialByProfile")
	public List<Material> getAllMaterialByProfile(@RequestParam String profile) {
		return materialService.getAllMaterialByProfile(profile);
	}

	@RequestMapping(value = "/addUpdateMaterial", method = {RequestMethod.POST, RequestMethod.PUT})
	public Material addUpdateMaterial(@RequestBody Material material) {
		return materialService.addUpdateMaterial(material);
	}

	@RequestMapping(value = "/deleteMaterial", method = {RequestMethod.DELETE})
	public void deleteMaterial(@RequestParam("id") int id) {
		materialService.deleteMaterial(id);
	}

	@RequestMapping(value = "/getAllDriversByProfile")
	public List<Drivers> getAllDriversByProfile(@RequestParam String profile) {
		return driversService.getAllDriversByProfile(profile);
	}

	@RequestMapping(value = "/addUpdateDrivers", method = {RequestMethod.POST, RequestMethod.PUT})
	public Drivers addUpdateDrivers(@RequestBody Drivers drivers) {
		return driversService.addUpdateDrivers(drivers);
	}

	@RequestMapping(value = "/deleteDrivers", method = {RequestMethod.DELETE})
	public void deleteDrivers(@RequestParam("id") int id) {
		driversService.deleteDrivers(id);
	}

	@RequestMapping(value = "/getAllTareWeightByProfile")
	public List<TareWeight> getAllTareWeightByProfile(@RequestParam String profile) {
		return tareWeightService.getAllTareWeightByProfile(profile);
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
	public Map<String, String> getAllSettings(@RequestParam("profile") String profile) {
		return settingsService.getAllSettingsByProfile(profile);
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

	@RequestMapping(value = "/getPrintWeightPDF", method = RequestMethod.POST,
			produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getPrintWeightPDF(@RequestBody PrintWeight printWeight) {
		return printerService.getPrintWeightPDF(printWeight);
	}

	@RequestMapping(value = "/printReport", method = {RequestMethod.POST})
	public void printReport(@RequestBody PrintReport printReport) {
		printerService.printReport(printReport);
	}

	@RequestMapping(value = "/getReportPDF", method = RequestMethod.POST,
			produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getReportPDF(@RequestBody PrintReport printReport) {
		return printerService.getPrintReportPDF(printReport);
	}

	@RequestMapping(value = "/getAllSerialPort", method = {RequestMethod.GET})
	public List<String> getAllSerialPort() {
		return serialPortService.getAllSerialPort();
	}

	@RequestMapping(value = "/settingUpSerialPort", method = {RequestMethod.GET})
	public void settingUpSerialPort(@RequestParam("serialPort") String serialPort, @RequestParam("serialPort") Boolean setDataListener) {
		serialPortService.settingUpSerialPort(serialPort, setDataListener);
	}

	@RequestMapping(value = "/sendToDisplay", method = {RequestMethod.PUT})
	public void sendToDisplay(@RequestBody String message) {
		serialPortService.sendToDisplay(message);
	}

	@RequestMapping(value = "/saveAllSettings", method = {RequestMethod.PUT})
	public void saveAllSettings(@RequestBody Map<String, String> settings, String profile) {
		settingsService.saveAllSettingsByProfile(settings, profile);
	}

}
