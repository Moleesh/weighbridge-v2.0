package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.entity.Invoice;
import com.babulens.weighbridge.model.entity.Setting;
import com.babulens.weighbridge.repository.InvoiceDAO;
import com.babulens.weighbridge.service.InvoiceService;
import com.babulens.weighbridge.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class InvoiceServiceImpl implements InvoiceService {

	private final
	InvoiceDAO invoiceDAO;

	private final
	SettingService settingService;

	@Autowired
	public InvoiceServiceImpl(InvoiceDAO invoiceDAO, SettingService settingService) {
		this.invoiceDAO = invoiceDAO;
		this.settingService = settingService;
	}

	@Override
	public synchronized Invoice saveInvoice(Invoice invoice) {
		if (invoice.getInvoiceNo() != -1) {
			invoice.setInvoiceNo(Integer.parseInt(settingService.getSettingByProfile("invoiceNo", invoice.getProfile())));
			invoice.setId(invoice.getProfile() + "_" + invoice.getInvoiceNo());
			invoiceDAO.save(invoice);
			settingService.saveSetting(new Setting("invoiceNo", invoice.getInvoiceNo() + 1, invoice.getProfile()));
		}
		return invoice;
	}

	@Override
	public Invoice getInvoiceByInvoiceNoAndProfile(int invoiceNo, String profile) {
		return invoiceDAO.findFirstByInvoiceNoAndProfileOrderByInvoiceNoDesc(invoiceNo, profile);
	}

	@Override
	public PrintInvoiceReport getInvoiceReportByProfile(Date startInvoiceTime, Date endInvoiceTime, String inputLabel, String input, String profile) {
		PrintInvoiceReport printInvoiceReport = new PrintInvoiceReport();
		int totalQuantity = 0;
		int totalAmount = 0;
		switch (inputLabel) {
			case "Invoice No":
				printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(Integer.parseInt(0 + input), startInvoiceTime, endInvoiceTime, profile));
				break;
			case "Reference Slip No":
				printInvoiceReport.setInvoices(invoiceDAO.findAllByReferenceSlipNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(Integer.parseInt(0 + input), startInvoiceTime, endInvoiceTime, profile));
				break;
			case "Customer Name":
				printInvoiceReport.setInvoices(invoiceDAO.findAllByCustomersNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
				break;
			case "Vehicle No":
				printInvoiceReport.setInvoices(invoiceDAO.findAllByVehicleNoContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
				break;
			case "Material":
				printInvoiceReport.setInvoices(invoiceDAO.findAllByMaterialContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
				break;
			default:
				printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(startInvoiceTime, endInvoiceTime, profile));
				break;
		}
		for (Invoice invoice : printInvoiceReport.getInvoices()) {
			totalQuantity += invoice.getQuantity();
			totalAmount += invoice.getTotal();
		}
		printInvoiceReport.setTotalRecords(printInvoiceReport.getInvoices().size());
		printInvoiceReport.setTotalQuantity(totalQuantity);
		printInvoiceReport.setTotalAmount(totalAmount);
		return printInvoiceReport;
	}

	@Override
	public void resetInvoiceByProfile(String invoiceNo, String profile) {
		invoiceDAO.deleteByProfile(profile);
		settingService.saveSetting(new Setting("invoiceNo", invoiceNo, profile));
	}

	@Override
	public Invoice updateInvoice(Invoice invoice) {
		invoiceDAO.save(invoice);
		return invoice;
	}
}
