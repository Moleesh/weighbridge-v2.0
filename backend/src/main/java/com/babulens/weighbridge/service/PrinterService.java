package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.PrintWeight;

import javax.print.PrintService;
import java.util.List;

public interface PrinterService {
	List<String> getAllPrinters();

	List<String> getAllPrintFormat();

	void printWeight(PrintWeight printWeight);

	void printReport(PrintReport printReport);

	byte[] getPrintWeightPDF(PrintWeight printWeight);

	byte[] getPrintReportPDF(PrintReport printReport);
}
