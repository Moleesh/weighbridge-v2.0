package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.PrintInvoice;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.PrintWeightReport;

import java.util.List;

public interface PrinterService {

	List<String> getAllPrinters();

	List<String> getAllWeightPrintFormats();

	List<String> getAllInvoicePrintFormats();

	void printWeight(PrintWeight printWeight);

	void printInvoice(PrintInvoice printInvoice);

	void printWeightReport(PrintWeightReport printWeightReport);

	byte[] getPrintWeightPDF(PrintWeight printWeight);

	byte[] getPrintInvoicePDF(PrintInvoice printInvoice);

	byte[] getPrintWeightReportPDF(PrintWeightReport printWeightReport);
}
