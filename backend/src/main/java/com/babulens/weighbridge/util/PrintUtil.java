package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.PrintWeight;

import java.awt.print.Book;

public interface PrintUtil {
	Book printPrePrint(PrintWeight printWeight);

	Book printWebCamPrint(PrintWeight printWeight);

	Book printReport(PrintReport printReport);
}
