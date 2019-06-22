package com.babulens.weighbridge.serviceImpl;


import com.babulens.weighbridge.service.PrinterService;
import org.springframework.stereotype.Service;

import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import java.util.ArrayList;
import java.util.List;

@Service
public class PrinterServiceImpl implements PrinterService {
    @Override
    public List<String> getAllPrinters() {
        PrintService[] printServices = PrintServiceLookup.lookupPrintServices(null, null);
        List<String> printers = new ArrayList<>();
        for (PrintService printer : printServices) {
            printers.add(printer.getName());
        }
        return printers;
    }
}
