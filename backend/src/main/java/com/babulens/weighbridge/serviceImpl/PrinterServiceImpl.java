package com.babulens.weighbridge.serviceImpl;


import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.service.PrinterService;
import com.babulens.weighbridge.util.PrintUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PrinterServiceImpl implements PrinterService {

    @Autowired
    private PrintUtil printUtil;

    @Override
    public PrintService getPrinter(String printer) {
        for (PrintService printerPrintService : PrintServiceLookup.lookupPrintServices(null, null)) {
            if (printer.equals(printerPrintService.getName())) {
                return printerPrintService;
            }
        }
        return null;
    }

    @Override
    public List<String> getAllPrinters() {
        List<String> printers = new ArrayList<>();
        for (PrintService printerPrintService : PrintServiceLookup.lookupPrintServices(null, null)) {
            printers.add(printerPrintService.getName());
        }
        return printers;
    }

    @Override
    public List<String> getAllPrintFormat() {
        return Arrays.asList("Normal Print", "Pre Print", "Camera Print");
    }

    @Override
    public void printWeight(PrintWeight printWeight) {

        int noOfCopies = printWeight.getNoOfCopies();
        while (0 < noOfCopies--) {
            switch (printWeight.getPrintFormat()) {
                case "Normal Print":
                    break;
                case "Pre Print":
                    printUtil.printPrePrint(printWeight, getPrinter(printWeight.getPrinterName()));
                    break;
                case "Camera Print":
                    printUtil.printCameraPrint(printWeight, getPrinter(printWeight.getPrinterName()));
                    break;
            }
        }
    }
}
