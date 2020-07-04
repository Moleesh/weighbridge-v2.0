package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.PrintInvoice;
import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.PrintWeightReport;

import java.awt.print.Book;

public interface PrintUtil {
	Book printPrePrint(PrintWeight printWeight);

	Book printWebCamPrint(PrintWeight printWeight);

	Book printReport(PrintWeightReport printWeightReport);

	Book printReport(PrintInvoiceReport printInvoiceReport);

	Book printPrePrint(PrintInvoice printInvoice);

}
