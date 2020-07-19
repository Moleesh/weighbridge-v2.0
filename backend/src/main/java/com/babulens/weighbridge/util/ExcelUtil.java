package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.PrintWeightReport;

public interface ExcelUtil {

	byte[] getInvoiceAsExcel(PrintInvoiceReport printInvoiceReport);

	byte[] getWeightAsExcel(PrintWeightReport printWeightReport);
}
