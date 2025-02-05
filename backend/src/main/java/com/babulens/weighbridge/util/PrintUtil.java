package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.PrintInvoice;
import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.PrintWeightReport;

import java.awt.print.Book;

public interface PrintUtil {
    Book printPrePrint1(PrintWeight printWeight);

    Book printPrePrint2(PrintWeight printWeight);

    Book printPlainPaper(PrintWeight printWeight);

    Book printWebCamPrint(PrintWeight printWeight);

    Book printReport(PrintWeightReport printWeightReport);

    Book printReport(PrintInvoiceReport printInvoiceReport);

    Book printPrePrint1(PrintInvoice printInvoice);

    Book printPrePrint2(PrintInvoice printInvoice);

    Book printStandard(PrintInvoice printInvoice);

}
