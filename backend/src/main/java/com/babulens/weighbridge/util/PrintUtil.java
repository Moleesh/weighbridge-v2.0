package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.PrintWeight;

import javax.print.PrintService;

public interface PrintUtil {
    void printPrePrint(PrintWeight printWeight, PrintService printer);

    void printCameraPrint(PrintWeight printWeight, PrintService printer);
}
