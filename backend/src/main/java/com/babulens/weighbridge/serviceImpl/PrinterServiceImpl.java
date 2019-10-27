package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.service.PrinterService;
import com.babulens.weighbridge.util.PrintUtil;
import com.babulens.weighbridge.utilImpl.PdfFontMapperImpl;
import com.babulens.weighbridge.utilImpl.PrintUtilImpl;
import com.itextpdf.awt.PdfGraphics2D;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.RectangleReadOnly;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import java.awt.print.Book;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@SuppressWarnings({"SpringJavaAutowiredFieldsWarningInspection", "DuplicatedCode"})
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

    @SuppressWarnings("DuplicatedCode")
    @Override
    public byte[] getPrintWeightPDF(PrintWeight printWeight) {
        Book book = new Book();
        switch (printWeight.getPrintFormat()) {
            case "Normal Print":
                break;
            case "Pre Print":
                book = printUtil.printPrePrint(printWeight);
                break;
            case "Camera Print":
                book = printUtil.printCameraPrint(printWeight);
                break;
        }
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            Document document = new Document(new RectangleReadOnly((float) book.getPageFormat(0).getWidth(),
                    (float) book.getPageFormat(0).getHeight()),
                    (float) (book.getPageFormat(0).getHeight() - book.getPageFormat(0).getImageableHeight()) / 2,
                    (float) (book.getPageFormat(0).getWidth() - book.getPageFormat(0).getImageableWidth()) / 2,
                    (float) (book.getPageFormat(0).getHeight() - book.getPageFormat(0).getImageableHeight()) / 2,
                    (float) (book.getPageFormat(0).getWidth() - book.getPageFormat(0).getImageableWidth()) / 2);
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            for (int j = 0; j < book.getNumberOfPages(); j++) {
                PdfGraphics2D pdfGraphics2D = new PdfGraphics2D(writer.getDirectContent(),
                        (float) book.getPageFormat(0).getWidth(), (float) book.getPageFormat(0).getHeight(),
                        new PdfFontMapperImpl());
                book.getPrintable(j).print(pdfGraphics2D, book.getPageFormat(j), j);
                pdfGraphics2D.dispose();
                if (j + 1 < book.getNumberOfPages()) {
                    document.newPage();
                }
            }
            document.close();
            writer.close();
            return byteArrayOutputStream.toByteArray();
        } catch (DocumentException | PrinterException | IndexOutOfBoundsException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);

        }
        return null;
    }

    @Override
    public byte[] getPrintReportPDF(PrintReport printReport) {
        Book book = printUtil.printReport(printReport);
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            Document document = new Document(new RectangleReadOnly((float) book.getPageFormat(0).getWidth(),
                    (float) book.getPageFormat(0).getHeight()),
                    (float) (book.getPageFormat(0).getHeight() - book.getPageFormat(0).getImageableHeight()) / 2,
                    (float) (book.getPageFormat(0).getWidth() - book.getPageFormat(0).getImageableWidth()) / 2,
                    (float) (book.getPageFormat(0).getHeight() - book.getPageFormat(0).getImageableHeight()) / 2,
                    (float) (book.getPageFormat(0).getWidth() - book.getPageFormat(0).getImageableWidth()) / 2);
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            for (int j = 0; j < book.getNumberOfPages(); j++) {
                PdfGraphics2D pdfGraphics2D = new PdfGraphics2D(writer.getDirectContent(),
                        (float) book.getPageFormat(0).getWidth(), (float) book.getPageFormat(0).getHeight(),
                        new PdfFontMapperImpl());
                book.getPrintable(j).print(pdfGraphics2D, book.getPageFormat(j), j);
                pdfGraphics2D.dispose();
                if (j + 1 < book.getNumberOfPages()) {
                    document.newPage();
                }
            }
            document.close();
            writer.close();
            return byteArrayOutputStream.toByteArray();
        } catch (DocumentException | PrinterException | IndexOutOfBoundsException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }
        return null;
    }

    @Override
    public List<String> getAllPrinters() {
        List<String> printers = new ArrayList<>();
        for (PrintService printerPrintService : PrintServiceLookup.lookupPrintServices(null, null)) {
            printers.add(printerPrintService.getName());
        }
        printers.add("get as .pdf File");
        return printers;
    }

    @Override
    public List<String> getAllPrintFormat() {
        return Arrays.asList("Normal Print", "Pre Print", "Camera Print");
    }

    @Override
    public void printWeight(PrintWeight printWeight) {
        int noOfCopies = printWeight.getNoOfCopies();
        PrinterJob printerJob = PrinterJob.getPrinterJob();
        switch (printWeight.getPrintFormat()) {
            case "Normal Print":
                break;
            case "Pre Print":
                printerJob.setPageable(printUtil.printPrePrint(printWeight));
                break;
            case "Camera Print":
                printerJob.setPageable(printUtil.printCameraPrint(printWeight));
                break;
        }
        try {
            printerJob.setPrintService(getPrinter(printWeight.getPrinterName()));
            while (0 < noOfCopies--) {
                printerJob.print();
            }
        } catch (PrinterException ignored) {
        }
    }

    @Override
    public void printReport(PrintReport printReport) {
        PrinterJob printerJob = PrinterJob.getPrinterJob();
        PrintUtil printUtil = new PrintUtilImpl();
        try {
            printerJob.setPageable(printUtil.printReport(printReport));
            printerJob.setPrintService(getPrinter(printReport.getPrinterName()));
            printerJob.print();
        } catch (PrinterException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }
    }

}
