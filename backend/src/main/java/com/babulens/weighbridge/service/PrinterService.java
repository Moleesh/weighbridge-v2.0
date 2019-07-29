package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.Weight;

import javax.print.PrintService;
import java.util.List;

public interface PrinterService {
    List<String> getAllPrinters();

    void printWeight(Weight weight, String printerName, int noOfCopies, String printFormat);

    List<String> getAllPrintFormat();

    PrintService getPrinter(String printer);
}
