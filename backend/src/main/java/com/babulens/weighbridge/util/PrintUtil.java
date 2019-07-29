package com.babulens.weighbridge.util;

import com.babulens.weighbridge.model.Weight;

import javax.print.PrintService;

public interface PrintUtil {
    void printPrePrint(Weight weight, PrintService printer);
}
