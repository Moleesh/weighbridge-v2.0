package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.PrintWeightReport;

import java.awt.print.Book;

public interface PrintUtil {
	Book printPrePrint(PrintWeight printWeight);

	Book printWebCamPrint(PrintWeight printWeight);

	Book printWeightReport(PrintWeightReport printWeightReport);
}
