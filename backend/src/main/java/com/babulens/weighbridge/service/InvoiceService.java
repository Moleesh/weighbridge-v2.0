package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.entity.Invoice;

import java.util.Date;

public interface InvoiceService {

	Invoice saveInvoice(Invoice invoice);

	Invoice getInvoiceByInvoiceNoAndProfile(int invoiceNo, String profile);

	PrintInvoiceReport getInvoiceReportByProfile(Date startDate, Date endDate, String inputLabel, String input, String profile);

	void resetInvoiceByProfile(String invoiceNo, String profile);

	Invoice updateInvoice(Invoice invoice);
}
