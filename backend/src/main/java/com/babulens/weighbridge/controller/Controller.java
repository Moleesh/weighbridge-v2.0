package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.GetReport;
import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.entity.*;
import com.babulens.weighbridge.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
class Controller {

	final AdminSettingService adminSettingService;
	private final WeighService weighService;
	private final MaterialService materialService;
	private final DriverService driverService;
	private final TareWeightService tareWeightService;
	private final SettingService settingService;
	private final PrinterService printerService;
	private final SerialPortService serialPortService;
	private final WebCamService webCamService;
	private final ProfileService profileService;

	@Autowired
	public Controller(WeighService weighService, MaterialService materialService, DriverService driverService,
	                  TareWeightService tareWeightService, SettingService settingService, PrinterService printerService,
	                  SerialPortService serialPortService, WebCamService webCamService, ProfileService profileService,
	                  AdminSettingService adminSettingService) {
		this.weighService = weighService;
		this.materialService = materialService;
		this.driverService = driverService;
		this.tareWeightService = tareWeightService;
		this.settingService = settingService;
		this.printerService = printerService;
		this.serialPortService = serialPortService;
		this.webCamService = webCamService;
		this.profileService = profileService;
		this.adminSettingService = adminSettingService;
	}

	@RequestMapping(value = "/adminSetting/getAllAdminSettings", method = {RequestMethod.GET})
	public Map<String, String> getAllAdminSettings() {
		return adminSettingService.getAllAdminSettings();
	}

	@RequestMapping(value = "/profile/getMyPrimaryProfile", method = {RequestMethod.GET})
	public String getMyPrimaryProfile() {
		return profileService.getMyPrimaryProfile();
	}

	@RequestMapping(value = "/profile/getAllProfiles", method = {RequestMethod.GET})
	public List<String> getAllProfiles() {
		return profileService.getAllProfiles();
	}

	@RequestMapping(value = "/printer/getAllPrinters", method = {RequestMethod.GET})
	public List<String> getAllPrinters() {
		return printerService.getAllPrinters();
	}

	@RequestMapping(value = "/printer/getAllPrintFormats", method = {RequestMethod.GET})
	public List<String> getAllPrintFormats() {
		return printerService.getAllPrintFormats();
	}

	@RequestMapping(value = "/printer/printWeight", method = {RequestMethod.POST})
	public void printWeight(@RequestBody PrintWeight printWeight) {
		printerService.printWeight(printWeight);
	}

	@RequestMapping(value = "/printer/getPrintWeightPDF", method = RequestMethod.POST, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getPrintWeightPDF(@RequestBody PrintWeight printWeight) {
		return printerService.getPrintWeightPDF(printWeight);
	}

	@RequestMapping(value = "/printer/printReport", method = {RequestMethod.POST})
	public void printReport(@RequestBody PrintReport printReport) {
		printerService.printReport(printReport);
	}

	@RequestMapping(value = "/printer/getReportPDF", method = RequestMethod.POST, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getReportPDF(@RequestBody PrintReport printReport) {
		return printerService.getPrintReportPDF(printReport);
	}

	@RequestMapping(value = "/setting/getAllSettingsByProfile", method = {RequestMethod.GET})
	public Map<String, String> getAllSettingsByProfile(@RequestParam("profile") String profile) {
		return settingService.getAllSettingsByProfile(profile);
	}

	@RequestMapping(value = "/setting/getNextSlipNoByProfile", method = {RequestMethod.GET})
	public int getNextSlipNoByProfile(@RequestParam("profile") String profile) {
		return Integer.parseInt(settingService.getSettingByProfile("slipNo", profile));
	}

	@RequestMapping(value = "/setting/saveAllSettingsByProfile", method = {RequestMethod.PUT})
	public void saveAllSettingsByProfile(@RequestBody Map<String, String> settings, @RequestBody String profile) {
		settingService.saveAllSettingsByProfile(settings, profile);
	}

	@RequestMapping(value = "/material/getAllMaterialsByProfile", method = {RequestMethod.GET})
	public List<Material> getAllMaterialsByProfile(@RequestParam String profile) {
		return materialService.getAllMaterialsByProfile(profile);
	}

	@RequestMapping(value = "/material/addUpdateMaterial", method = {RequestMethod.POST, RequestMethod.PUT})
	public Material addUpdateMaterial(@RequestBody Material material) {
		return materialService.addUpdateMaterial(material);
	}

	@RequestMapping(value = "/material/deleteMaterial", method = {RequestMethod.DELETE})
	public void deleteMaterial(@RequestParam("id") int id) {
		materialService.deleteMaterial(id);
	}

	@RequestMapping(value = "/driver/getAllDriversByProfile", method = {RequestMethod.GET})
	public List<Driver> getAllDriversByProfile(@RequestParam String profile) {
		return driverService.getAllDriversByProfile(profile);
	}

	@RequestMapping(value = "/driver/addUpdateDriver", method = {RequestMethod.POST, RequestMethod.PUT})
	public Driver addUpdateDriver(@RequestBody Driver driver) {
		return driverService.addUpdateDriver(driver);
	}

	@RequestMapping(value = "/driver/deleteDriver", method = {RequestMethod.DELETE})
	public void deleteDriver(@RequestParam("id") int id) {
		driverService.deleteDriver(id);
	}

	@RequestMapping(value = "/tareWeight/getAllTareWeightsByProfile", method = {RequestMethod.GET})
	public List<TareWeight> getAllTareWeightsByProfile(@RequestParam String profile) {
		return tareWeightService.getAllTareWeightsByProfile(profile);
	}

	@RequestMapping(value = "/tareWeight/getTareWeightByVehicleNoAndProfile", method = {RequestMethod.GET})
	public TareWeight getTareWeightByVehicleNoAndProfile(@RequestParam("vehicleNo") String vehicleNo,
	                                                     @RequestParam("profile") String profile) {
		return tareWeightService.getTareWeightByVehicleNoAndProfile(vehicleNo, profile);
	}

	@RequestMapping(value = "/tareWeight/addUpdateTareWeight", method = {RequestMethod.POST, RequestMethod.PUT})
	public TareWeight addUpdateTareWeight(@RequestBody TareWeight tareWeight) {
		return tareWeightService.addUpdateTareWeight(tareWeight);
	}

	@RequestMapping(value = "/tareWeight/deleteTareWeight", method = {RequestMethod.DELETE})
	public void deleteTareWeight(@RequestParam("id") int id) {
		tareWeightService.deleteTareWeight(id);
	}

	@RequestMapping(value = "/webCam/getMyPrimaryWebCam", method = {RequestMethod.GET})
	public String getMyPrimaryWebCam() {
		return webCamService.getMyPrimaryWebCam();
	}

	@RequestMapping(value = "/webCam/getAllWebCamDetails", method = {RequestMethod.GET})
	public List<WebCamDetail> getAllWebCamDetails() {
		return webCamService.getAllWebCamDetails();
	}

	@RequestMapping(value = "/webCam/getWebCamImage", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody
	byte[] getImage(@RequestParam("webcam") String webcam) {
		return webCamService.getWebCamImage(webcam);
	}

	@RequestMapping(value = "/webCam/getAllWebCams", method = {RequestMethod.GET})
	public List<String> getAllWebCams() {
		return webCamService.getAllWebCams();
	}

	@RequestMapping(value = "/webCam/settingUpWebCam", method = {RequestMethod.GET})
	public void settingUpWebCam(@RequestParam("webcam") String webcam) {
		webCamService.settingUpWebCam(webcam);
	}

	@RequestMapping(value = "/webCam/updateWebCam", method = {RequestMethod.POST})
	public void updateWebCam(@RequestParam("webcam") WebCamDetail webCamDetail) {
		webCamService.updateWebCam(webCamDetail);
	}

	@RequestMapping(value = "/serialPort/getSerialPortDetailByName", method = {RequestMethod.GET})
	public SerialPortDetail getSerialPortDetailByName(@RequestParam String name) {
		return serialPortService.getSerialPortDetailByName(name);
	}

	@RequestMapping(value = "/serialPort/getAllSerialPorts", method = {RequestMethod.GET})
	public List<String> getAllSerialPortDetails() {
		return serialPortService.getAllSerialPort();
	}

	@RequestMapping(value = "/serialPort/getNextWeight", method = {RequestMethod.GET})
	public int getNextWeight() {
		return serialPortService.getWeight();
	}

	@RequestMapping(value = "/serialPort/settingUpSerialPort", method = {RequestMethod.GET})
	public void settingUpSerialPort(@RequestParam("serialPort") String serialPort,
	                                @RequestParam("setDataListener") Boolean setDataListener) {
		serialPortService.settingUpSerialPort(serialPort, setDataListener);
	}

	@RequestMapping(value = "/serialPort/updateSerialPort", method = {RequestMethod.POST})
	public void updateSerialPort(@RequestBody SerialPortDetail serialPortDetail) {
		serialPortService.updateSerialPortDetail(serialPortDetail);
	}

	@RequestMapping(value = "/serialPort/sendToDisplay", method = {RequestMethod.PUT})
	public void sendToDisplay(@RequestBody String message) {
		serialPortService.sendToDisplay(message);
	}

	@RequestMapping(value = "/weight/saveWeight", method = {RequestMethod.POST})
	public Weight saveWeight(@RequestBody Weight weight) {
		return weighService.saveWeight(weight);
	}

	@RequestMapping(value = "/weight/updateWeight", method = {RequestMethod.POST})
	public Weight updateWeight(@RequestBody Weight weight) {
		return weighService.updateWeight(weight);
	}

	@RequestMapping(value = "/weight/getGrossWeightByVehicleNoAndProfile", method = {RequestMethod.GET})
	public TareWeight getGrossWeightByVehicleNoAndProfile(@RequestParam("vehicleNo") String vehicleNo,
	                                                      @RequestParam("profile") String profile) {
		return weighService.getGrossWeightByVehicleNoAndProfile(vehicleNo, profile);
	}

	@RequestMapping(value = "/weight/getWeightBySlipNoAndProfile")
	public Weight getWeightBySlipNoAndProfile(@RequestParam("slipNo") int slipNo, @RequestParam String profile) {
		return weighService.getWeightBySlipNoAndProfile(slipNo, profile);
	}

	@RequestMapping(value = "/weight/getReport", method = {RequestMethod.POST})
	public PrintReport getReport(@RequestBody GetReport getReport) {
		return weighService.getReportByProfile(getReport.getStartDate(), getReport.getEndDate(),
				getReport.getInputLabel(), getReport.getInput(), getReport.getProfile());
	}

	@RequestMapping(value = "/weight/resetWeightByProfile", method = {RequestMethod.GET})
	public void resetWeightByProfile(@RequestParam String slipNo, @RequestParam String profile) {
		weighService.resetWeightByProfile(slipNo, profile);
	}

	@RequestMapping(value = "/error/getDefaultSlipNo", method = {RequestMethod.GET})
	public int getDefaultSlipNo() {
		return -1;
	}

}
