package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.GetReport;
import com.babulens.weighbridge.model.PrintInvoice;
import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.PrintWeightReport;
import com.babulens.weighbridge.model.entity.Customer;
import com.babulens.weighbridge.model.entity.Invoice;
import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.model.entity.SerialPortDetail;
import com.babulens.weighbridge.model.entity.TareWeight;
import com.babulens.weighbridge.model.entity.WebCamDetail;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.service.AdminSettingService;
import com.babulens.weighbridge.service.CustomerService;
import com.babulens.weighbridge.service.InvoiceService;
import com.babulens.weighbridge.service.MaterialService;
import com.babulens.weighbridge.service.PrinterService;
import com.babulens.weighbridge.service.ProfileService;
import com.babulens.weighbridge.service.SerialPortService;
import com.babulens.weighbridge.service.SettingService;
import com.babulens.weighbridge.service.TareWeightService;
import com.babulens.weighbridge.service.WebCamService;
import com.babulens.weighbridge.service.WeighService;
import com.babulens.weighbridge.util.ExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
class Controller {

	private final AdminSettingService adminSettingService;
	private final WeighService weighService;
	private final InvoiceService invoiceService;
	private final MaterialService materialService;
	private final CustomerService customerService;
	private final TareWeightService tareWeightService;
	private final SettingService settingService;
	private final PrinterService printerService;
	private final SerialPortService serialPortService;
	private final WebCamService webCamService;
	private final ProfileService profileService;
	private final ExcelUtil excelUtil;
	private final CacheManager cacheManager;

	@Autowired
	public Controller(WeighService weighService, InvoiceService invoiceService, MaterialService materialService, CustomerService customerService,
	                  TareWeightService tareWeightService, SettingService settingService, PrinterService printerService,
	                  SerialPortService serialPortService, WebCamService webCamService, ProfileService profileService,
	                  AdminSettingService adminSettingService, ExcelUtil excelUtil, CacheManager cacheManager) {
		this.weighService = weighService;
		this.materialService = materialService;
		this.invoiceService = invoiceService;
		this.customerService = customerService;
		this.tareWeightService = tareWeightService;
		this.settingService = settingService;
		this.printerService = printerService;
		this.serialPortService = serialPortService;
		this.webCamService = webCamService;
		this.profileService = profileService;
		this.adminSettingService = adminSettingService;
		this.excelUtil = excelUtil;
		this.cacheManager = cacheManager;
	}

	@RequestMapping(value = "/adminSetting/getAllAdminSettings", method = {RequestMethod.GET})
	public Map<String, String> getAllAdminSettings() {
		return adminSettingService.getAllAdminSettings();
	}

	@RequestMapping(value = "/profile/getMyPrimaryProfile", method = {RequestMethod.GET})
	public String getMyPrimaryProfile() {
		return profileService.getMyPrimaryProfile();
	}

	@RequestMapping(value = "/profile/setMyPrimaryProfile", method = {RequestMethod.PATCH})
	public void setMyPrimaryProfile(@RequestParam("profile") String profile) {
		profileService.setMyPrimaryProfile(profile);
	}

	@RequestMapping(value = "/profile/getAllProfiles", method = {RequestMethod.GET})
	public List<String> getAllProfiles() {
		return profileService.getAllProfiles();
	}

	@RequestMapping(value = "/profile/addUpdateProfile", method = {RequestMethod.PATCH})
	public List<String> addUpdateProfile(@RequestParam("profile") String profile) {
		return profileService.addUpdateProfile(profile);
	}

	@RequestMapping(value = "/printer/getAllPrinters", method = {RequestMethod.GET})
	public List<String> getAllPrinters() {
		return printerService.getAllPrinters();
	}

	@RequestMapping(value = "/printer/getAllWeightPrintFormats", method = {RequestMethod.GET})
	public List<String> getAllWeightPrintFormats() {
		return printerService.getAllWeightPrintFormats();
	}

	@RequestMapping(value = "/printer/getAllInvoicePrintFormats", method = {RequestMethod.GET})
	public List<String> getAllInvoicePrintFormats() {
		return printerService.getAllInvoicePrintFormats();
	}

	@RequestMapping(value = "/printer/printWeight", method = {RequestMethod.POST})
	public void printWeight(@RequestBody PrintWeight printWeight) {
		printerService.printWeight(printWeight);
	}

	@RequestMapping(value = "/printer/printInvoice", method = {RequestMethod.POST})
	public void printInvoice(@RequestBody PrintInvoice printInvoice) {
		printerService.printInvoice(printInvoice);
	}

	@RequestMapping(value = "/printer/getPrintWeightPDF", method = RequestMethod.POST, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getPrintWeightPDF(@RequestBody PrintWeight printWeight) {
		return printerService.getPrintWeightPDF(printWeight);
	}

	@RequestMapping(value = "/printer/getPrintInvoicePDF", method = RequestMethod.POST, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getPrintInvoicePDF(@RequestBody PrintInvoice printInvoice) {
		return printerService.getPrintInvoicePDF(printInvoice);
	}

	@RequestMapping(value = "/printer/printWeightReport", method = {RequestMethod.POST})
	public void printWeightReport(@RequestBody PrintWeightReport printWeightReport) {
		printerService.printWeightReport(printWeightReport);
	}

	@RequestMapping(value = "/printer/printInvoiceReport", method = {RequestMethod.POST})
	public void printInvoiceReport(@RequestBody PrintInvoiceReport printInvoiceReport) {
		printerService.printInvoiceReport(printInvoiceReport);
	}

	@RequestMapping(value = "/printer/getWeightReportPDF", method = RequestMethod.POST, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getWeightReportPDF(@RequestBody PrintWeightReport printWeightReport) {
		return printerService.getPrintWeightReportPDF(printWeightReport);
	}

	@RequestMapping(value = "/printer/getInvoiceReportPDF", method = RequestMethod.POST, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody
	byte[] getInvoiceReportPDF(@RequestBody PrintInvoiceReport printInvoiceReport) {
		return printerService.getInvoiceReportPDF(printInvoiceReport);
	}

	@RequestMapping(value = "/setting/getAllSettingsByProfile", method = {RequestMethod.GET})
	public Map<String, String> getAllSettingsByProfile(@RequestParam("profile") String profile) {
		return settingService.getAllSettingsByProfile(profile);
	}

	@RequestMapping(value = "/setting/getNextSlipNoByProfile", method = {RequestMethod.GET})
	public int getNextSlipNoByProfile(@RequestParam("profile") String profile) {
		return Integer.parseInt(settingService.getSettingByProfile("slipNo", profile));
	}

	@RequestMapping(value = "/setting/getNextInvoiceNoByProfile", method = {RequestMethod.GET})
	public int getNextInvoiceNoByProfile(@RequestParam("profile") String profile) {
		return Integer.parseInt(settingService.getSettingByProfile("invoiceNo", profile));
	}

	@RequestMapping(value = "/setting/getNextDummyInvoiceNoByProfile", method = {RequestMethod.GET})
	public int getNextDummyInvoiceNoByProfile(@RequestParam("profile") String profile) {
		return Integer.parseInt(settingService.getSettingByProfile("dummyInvoiceNo", profile));
	}

	@RequestMapping(value = "/setting/saveAllSettingsByProfile", method = {RequestMethod.PUT})
	public void saveAllSettingsByProfile(@RequestBody Map<String, String> settings, @RequestParam("profile") String profile) {
		settingService.saveAllSettingsByProfile(settings, profile, false);
	}

	@RequestMapping(value = "/material/getAllMaterials", method = {RequestMethod.GET})
	public List<Material> getAllMaterials() {
		return materialService.getAllMaterials();
	}

	@RequestMapping(value = "/material/addUpdateMaterial", method = {RequestMethod.POST, RequestMethod.PUT})
	public Material addUpdateMaterial(@RequestBody Material material) {
		return materialService.addUpdateMaterial(material);
	}

	@RequestMapping(value = "/material/deleteMaterial", method = {RequestMethod.DELETE})
	public void deleteMaterial(@RequestParam("id") int id) {
		materialService.deleteMaterial(id);
	}

	@RequestMapping(value = "/customer/getAllCustomers", method = {RequestMethod.GET})
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	@RequestMapping(value = "/customer/addUpdateCustomer", method = {RequestMethod.POST, RequestMethod.PUT})
	public Customer addUpdateCustomer(@RequestBody Customer customer) {
		return customerService.addUpdateCustomer(customer);
	}

	@RequestMapping(value = "/customer/deleteCustomer", method = {RequestMethod.DELETE})
	public void deleteCustomer(@RequestParam("id") int id) {
		customerService.deleteCustomer(id);
	}

	@RequestMapping(value = "/tareWeight/getAllTareWeights", method = {RequestMethod.GET})
	public List<TareWeight> getAllTareWeights() {
		return tareWeightService.getAllTareWeights();
	}

	@RequestMapping(value = "/tareWeight/getTareWeightByVehicleNo", method = {RequestMethod.GET})
	public TareWeight getTareWeightByVehicleNo(@RequestParam("vehicleNo") String vehicleNo) {
		return tareWeightService.getTareWeightByVehicleNo(vehicleNo);
	}

	@RequestMapping(value = "/tareWeight/addUpdateTareWeight", method = {RequestMethod.POST, RequestMethod.PUT})
	public TareWeight addUpdateTareWeight(@RequestBody TareWeight tareWeight) {
		return tareWeightService.addUpdateTareWeight(tareWeight);
	}

	@RequestMapping(value = "/tareWeight/deleteTareWeight", method = {RequestMethod.DELETE})
	public void deleteTareWeight(@RequestParam("vehicleNo") String vehicleNo) {
		tareWeightService.deleteTareWeight(vehicleNo);
	}

	@RequestMapping(value = "/webCam/getAllWebCamDetails", method = {RequestMethod.GET})
	public List<WebCamDetail> getAllWebCamDetails() {
		return webCamService.getAllWebCamDetails();
	}

	@RequestMapping(value = "/webCam/getWebCamImage", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody
	byte[] getImage(@RequestParam("webcam") String webcam, @RequestParam("fullSize") boolean fullSize) {
		return webCamService.getWebCamImage(webcam, fullSize);
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
	public void updateWebCam(@RequestBody WebCamDetail webCamDetail) {
		webCamService.updateWebCam(webCamDetail);
	}

	@RequestMapping(value = "/serialPort/getSerialPortDetailByName", method = {RequestMethod.GET})
	public SerialPortDetail getSerialPortDetailByName(@RequestParam("name") String name) {
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
	public void settingUpSerialPort(@RequestParam("serialPort") String serialPort, @RequestParam("setDataListener") Boolean setDataListener) {
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

	@RequestMapping(value = "/weight/secondWeight", method = {RequestMethod.GET})
	public Weight secondWeight(@RequestParam("slipNo") int slipNo, @RequestParam("profile") String profile) {
		return weighService.secondWeight(slipNo, profile);
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
	public TareWeight getGrossWeightByVehicleNoAndProfile(@RequestParam("vehicleNo") String vehicleNo, @RequestParam("profile") String profile) {
		return weighService.getGrossWeightByVehicleNoAndProfile(vehicleNo, profile);
	}

	@RequestMapping(value = "/weight/getWeightBySlipNoAndProfile")
	public Weight getWeightBySlipNoAndProfile(@RequestParam("slipNo") int slipNo, @RequestParam("profile") String profile) {
		return weighService.getWeightBySlipNoAndProfile(slipNo, profile);
	}

	@RequestMapping(value = "/weight/getWeightReportByProfile", method = {RequestMethod.POST})
	public PrintWeightReport getWeightReportByProfile(@RequestBody GetReport getReport) {
		return weighService.getWeightReportByProfile(getReport.getStartDate(), getReport.getEndDate(),
				getReport.getInputLabel(), getReport.getInput(), getReport.getProfile());
	}

	@RequestMapping(value = "/weight/resetWeightByProfile", method = {RequestMethod.GET})
	public void resetWeightByProfile(@RequestParam("slipNo") String slipNo, @RequestParam("profile") String profile) {
		weighService.resetWeightByProfile(slipNo, profile);
	}

	@RequestMapping(value = "/invoice/checkDummyByProfile", method = {RequestMethod.GET})
	public boolean checkDummyByProfile(@RequestParam("invoiceNo") int invoiceNo, @RequestParam("profile") String profile) {
		return invoiceService.checkDummyByProfile(invoiceNo, profile);
	}

	@RequestMapping(value = "/invoice/saveInvoice", method = {RequestMethod.POST})
	public Invoice saveInvoice(@RequestBody Invoice invoice) {
		return invoiceService.saveInvoice(invoice);
	}

	@RequestMapping(value = "/invoice/updateInvoice", method = {RequestMethod.POST})
	public Invoice updateInvoice(@RequestBody Invoice invoice) {
		return invoiceService.updateInvoice(invoice);
	}

	@RequestMapping(value = "/invoice/getInvoiceByInvoiceNoAndProfile")
	public Invoice getInvoiceByInvoiceNoAndProfile(@RequestParam("dummy") boolean dummy, @RequestParam("invoiceNo") int invoiceNo, @RequestParam("profile") String profile) {
		return invoiceService.getInvoiceByInvoiceNoAndProfile(dummy, invoiceNo, profile);
	}

	@RequestMapping(value = "/invoice/getInvoiceReportByProfile", method = {RequestMethod.POST})
	public PrintInvoiceReport getInvoiceReportByProfile(@RequestBody GetReport getReport) {
		return invoiceService.getInvoiceReportByProfile(getReport.getStartDate(), getReport.getEndDate(), getReport.getInputLabel(), getReport.getInput(), getReport.getDummy(), getReport.getProfile());
	}

	@RequestMapping(value = "/invoice/resetInvoiceByProfile", method = {RequestMethod.GET})
	public void resetInvoiceByProfile(@RequestParam("invoiceNo") String invoiceNo, @RequestParam("profile") String profile) {
		invoiceService.resetInvoiceByProfile(invoiceNo, profile);
	}

	@RequestMapping(value = "/excel/getWeightAsExcel", method = {RequestMethod.POST}, produces = MediaType.MULTIPART_FORM_DATA_VALUE)
	public byte[] getWeightAsExcel(@RequestBody PrintWeightReport printWeightReport) {
		return excelUtil.getWeightAsExcel(printWeightReport);
	}

	@RequestMapping(value = "/excel/getInvoiceAsExcel", method = {RequestMethod.POST}, produces = MediaType.MULTIPART_FORM_DATA_VALUE)
	public byte[] getInvoiceAsExcel(@RequestBody PrintInvoiceReport printInvoiceReport) {
		return excelUtil.getInvoiceAsExcel(printInvoiceReport);
	}

	@RequestMapping(value = "/error/getDefault")
	public int getDefaultSlipNo() {
		return -1;
	}

	@RequestMapping(value = "/cache/clearCache")
	public void clearCache() {
		for (String name : cacheManager.getCacheNames()) {
			Objects.requireNonNull(cacheManager.getCache(name)).clear();
		}
	}

}
