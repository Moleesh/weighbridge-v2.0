package com.babulens.weighbridge.utilImpl;

import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.PrintWeightReport;
import com.babulens.weighbridge.model.entity.Invoice;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.util.ExcelUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.WorkbookUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ExcelUtilImpl implements ExcelUtil {

    @Override
    public byte[] getWeightAsExcel(PrintWeightReport printWeightReport) {
        Workbook workbook = new XSSFWorkbook();

        String sheetName = WorkbookUtil.createSafeSheetName(printWeightReport.getReportTitle());
        Sheet sheet = workbook.createSheet(sheetName);
        int rowNum = 0;
        Row row = sheet.createRow(rowNum);
        CreationHelper creationHelper = workbook.getCreationHelper();
        CellStyle cellStyleStringCenter = sheet.getWorkbook().createCellStyle();
        cellStyleStringCenter.setAlignment(HorizontalAlignment.CENTER);
        Cell cell;
        cell = row.createCell(0);
        cell.setCellValue(printWeightReport.getWeighbridgeName());
        cell.setCellStyle(cellStyleStringCenter);
        rowNum++;
        row = sheet.createRow(rowNum);
        cell = row.createCell(0);
        cell.setCellValue(printWeightReport.getWeighbridgeAddress());
        cell.setCellStyle(cellStyleStringCenter);
        rowNum++;
        row = sheet.createRow(rowNum);
        cell = row.createCell(0);
        cell.setCellValue(printWeightReport.getReportTitle());
        cell.setCellStyle(cellStyleStringCenter);
        rowNum++;
        row = sheet.createRow(rowNum);
        int j = 0;
        for (String header : printWeightReport.getHeaders()) {
            cell = row.createCell(j++);
            cell.setCellValue(header);
            cell.setCellStyle(cellStyleStringCenter);
        }

        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        cellStyle.setDataFormat(creationHelper.createDataFormat().getFormat((new SimpleDateFormat("dd-MM-yyyy hh:mm a")).toPattern()));

        int grossWeight = -1, tareWeight = -1, nettWeight = -1, charges = -1;
        for (Weight weight : printWeightReport.getWeights()) {
            rowNum++;
            row = sheet.createRow(rowNum);
            int col = 0;
            if (printWeightReport.getHeaders().contains("Slip No")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getSlipNo());
            }
            if (printWeightReport.getHeaders().contains("Vehicle No")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getVehicleNo());
            }
            if (printWeightReport.getHeaders().contains("Material")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getMaterial());
            }
            if (printWeightReport.getHeaders().contains("Customer Name")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getCustomersName());
            }
            if (printWeightReport.getHeaders().contains("Transporter Name")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getTransporterName());
            }
            if (printWeightReport.getHeaders().contains("Gross Weight")) {
                grossWeight = col;
                cell = row.createCell(col++);
                cell.setCellValue(weight.getGrossWeight());
            }
            if (printWeightReport.getHeaders().contains("Gross Time")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getGrossTime());
                cell.setCellStyle(cellStyle);
            }
            if (printWeightReport.getHeaders().contains("Tare Weight")) {
                tareWeight = col;
                cell = row.createCell(col++);
                cell.setCellValue(weight.getTareWeight());
            }
            if (printWeightReport.getHeaders().contains("Tare Time")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getTareTime());
                cell.setCellStyle(cellStyle);
            }
            if (printWeightReport.getHeaders().contains("Nett Weight")) {
                nettWeight = col;
                cell = row.createCell(col++);
                cell.setCellValue(weight.getNettWeight());
            }
            if (printWeightReport.getHeaders().contains("Nett Time")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getNettTime());
                cell.setCellStyle(cellStyle);
            }
            if (printWeightReport.getHeaders().contains("Charges")) {
                charges = col;
                cell = row.createCell(col++);
                cell.setCellValue(weight.getCharges());
            }
            if (printWeightReport.getHeaders().contains("Remarks")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getRemarks());
            }
            if (printWeightReport.getHeaders().contains("Manual")) {
                cell = row.createCell(col++);
                cell.setCellValue(weight.getManual());
            }
        }

        rowNum++;
        String getColumn = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        row = sheet.createRow(rowNum);
        if (grossWeight != -1) {
            cell = row.createCell(grossWeight);
            cell.setCellFormula("SUM(" + getColumn.charAt(grossWeight) + "4:" + getColumn.charAt(grossWeight) + rowNum + ")");
        }
        if (tareWeight != -1) {
            cell = row.createCell(tareWeight);
            cell.setCellFormula("SUM(" + getColumn.charAt(tareWeight) + "4:" + getColumn.charAt(tareWeight) + rowNum + ")");
        }
        if (nettWeight != -1) {
            cell = row.createCell(nettWeight);
            cell.setCellFormula("SUM(" + getColumn.charAt(nettWeight) + "4:" + getColumn.charAt(nettWeight) + rowNum + ")");
        }
        if (charges != -1) {
            cell = row.createCell(charges);
            cell.setCellFormula("SUM(" + getColumn.charAt(charges) + "4:" + getColumn.charAt(charges) + rowNum + ")");
        }

        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, sheet.getRow(3).getLastCellNum() - 1));
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, sheet.getRow(3).getLastCellNum() - 1));
        sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, sheet.getRow(3).getLastCellNum() - 1));

        for (short i = sheet.getRow(3).getFirstCellNum(), end = sheet.getRow(3).getLastCellNum(); i < end; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {
            workbook.write(byteArrayOutputStream);
            workbook.close();
            return byteArrayOutputStream.toByteArray();
        } catch (IOException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }
        return null;
    }

    @Override
    public byte[] getInvoiceAsExcel(PrintInvoiceReport printInvoiceReport) {
        Workbook workbook = new XSSFWorkbook();

        String sheetName = WorkbookUtil.createSafeSheetName(printInvoiceReport.getReportTitle());
        Sheet sheet = workbook.createSheet(sheetName);
        int rowNum = 0;
        Row row = sheet.createRow(rowNum);
        CreationHelper creationHelper = workbook.getCreationHelper();
        CellStyle cellStyleStringCenter = sheet.getWorkbook().createCellStyle();
        cellStyleStringCenter.setAlignment(HorizontalAlignment.CENTER);
        Cell cell;
        cell = row.createCell(0);
        cell.setCellValue(printInvoiceReport.getWeighbridgeName());
        cell.setCellStyle(cellStyleStringCenter);
        rowNum++;
        row = sheet.createRow(rowNum);
        cell = row.createCell(0);
        cell.setCellValue(printInvoiceReport.getWeighbridgeAddress());
        cell.setCellStyle(cellStyleStringCenter);
        rowNum++;
        row = sheet.createRow(rowNum);
        cell = row.createCell(0);
        cell.setCellValue(printInvoiceReport.getReportTitle());
        cell.setCellStyle(cellStyleStringCenter);
        rowNum++;
        row = sheet.createRow(rowNum);
        int j = 0;
        for (String header : printInvoiceReport.getHeaders()) {
            cell = row.createCell(j++);
            cell.setCellValue(header);
            cell.setCellStyle(cellStyleStringCenter);
        }

        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        cellStyle.setDataFormat(creationHelper.createDataFormat().getFormat((new SimpleDateFormat("dd-MM-yyyy hh:mm a")).toPattern()));

        int quantity = -1, amount = -1, cgst = -1, sgst = -1, igst = -1, total = -1;
        for (Invoice invoice : printInvoiceReport.getInvoices()) {
            rowNum++;
            row = sheet.createRow(rowNum);
            int col = 0;
            if (printInvoiceReport.getHeaders().contains("Invoice No")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getInvoiceNo());
            }
            if (printInvoiceReport.getHeaders().contains("Reference Slip No")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getReferenceSlipNo());
            }
            if (printInvoiceReport.getHeaders().contains("Invoice Time")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getInvoiceTime());
                cell.setCellStyle(cellStyle);
            }
            if (printInvoiceReport.getHeaders().contains("Customer Name")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getCustomersName());
            }
            if (printInvoiceReport.getHeaders().contains("Address Line 1")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getAddress1());
            }
            if (printInvoiceReport.getHeaders().contains("Address Line 2")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getAddress2());
            }
            if (printInvoiceReport.getHeaders().contains("Vehicle No")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getVehicleNo());
            }
            if (printInvoiceReport.getHeaders().contains("Time Of Arrival")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getTimeOfArrival());
            }
            if (printInvoiceReport.getHeaders().contains("Material")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getMaterial());
            }
            if (printInvoiceReport.getHeaders().contains("Unit Price")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getUnitPrice());
            }
            if (printInvoiceReport.getHeaders().contains("Quantity")) {
                quantity = col;
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getQuantity());
            }
            if (printInvoiceReport.getHeaders().contains("Amount")) {
                amount = col;
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getAmount());
            }
            if (printInvoiceReport.getHeaders().contains("CGST %")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.get_cgst());
            }
            if (printInvoiceReport.getHeaders().contains("CGST")) {
                cgst = col;
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getCgst());
            }
            if (printInvoiceReport.getHeaders().contains("SGST %")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.get_cgst());
            }
            if (printInvoiceReport.getHeaders().contains("SGST")) {
                sgst = col;
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getSgst());
            }
            if (printInvoiceReport.getHeaders().contains("IGST %")) {
                cell = row.createCell(col++);
                cell.setCellValue(invoice.get_igst());
            }
            if (printInvoiceReport.getHeaders().contains("IGST")) {
                igst = col;
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getIgst());
            }
            if (printInvoiceReport.getHeaders().contains("Total")) {
                total = col;
                cell = row.createCell(col++);
                cell.setCellValue(invoice.getTotal());
            }
        }

        rowNum++;
        String getColumn = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        row = sheet.createRow(rowNum);
        if (quantity != -1) {
            cell = row.createCell(quantity);
            cell.setCellFormula("SUM(" + getColumn.charAt(quantity) + "4:" + getColumn.charAt(quantity) + rowNum + ")");
        }
        if (amount != -1) {
            cell = row.createCell(amount);
            cell.setCellFormula("SUM(" + getColumn.charAt(amount) + "4:" + getColumn.charAt(amount) + rowNum + ")");
        }
        if (cgst != -1) {
            cell = row.createCell(cgst);
            cell.setCellFormula("SUM(" + getColumn.charAt(cgst) + "4:" + getColumn.charAt(cgst) + rowNum + ")");
        }
        if (sgst != -1) {
            cell = row.createCell(sgst);
            cell.setCellFormula("SUM(" + getColumn.charAt(sgst) + "4:" + getColumn.charAt(sgst) + rowNum + ")");
        }
        if (igst != -1) {
            cell = row.createCell(igst);
            cell.setCellFormula("SUM(" + getColumn.charAt(igst) + "4:" + getColumn.charAt(igst) + rowNum + ")");
        }
        if (total != -1) {
            cell = row.createCell(total);
            cell.setCellFormula("SUM(" + getColumn.charAt(total) + "4:" + getColumn.charAt(total) + rowNum + ")");
        }

        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, sheet.getRow(3).getLastCellNum() - 1));
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, sheet.getRow(3).getLastCellNum() - 1));
        sheet.addMergedRegion(new CellRangeAddress(2, 2, 0, sheet.getRow(3).getLastCellNum() - 1));

        for (short i = sheet.getRow(3).getFirstCellNum(), end = sheet.getRow(3).getLastCellNum(); i < end; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {
            workbook.write(byteArrayOutputStream);
            workbook.close();
            return byteArrayOutputStream.toByteArray();
        } catch (IOException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }
        return null;
    }
}
