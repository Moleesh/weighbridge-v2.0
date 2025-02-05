package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.entity.Invoice;
import com.babulens.weighbridge.model.entity.Setting;
import com.babulens.weighbridge.repository.InvoiceDAO;
import com.babulens.weighbridge.service.InvoiceService;
import com.babulens.weighbridge.service.SettingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final
    InvoiceDAO invoiceDAO;

    private final
    SettingService settingService;

    @Autowired
    public InvoiceServiceImpl(InvoiceDAO invoiceDAO, SettingService settingService) {
        this.invoiceDAO = invoiceDAO;
        this.settingService = settingService;
    }

    @Override
    public synchronized Invoice saveInvoice(Invoice invoice) {
        if (invoice.getInvoiceNo() != -1) {
            if (invoice.isDummy()) {
                invoice.setId(invoice.getProfile() + "_DUMMY_" + invoice.getInvoiceNo());
                invoiceDAO.save(invoice);
                if (Integer.parseInt(settingService.getSettingByProfile("dummyInvoiceNo", invoice.getProfile())) < invoice.getInvoiceNo()) {
                    settingService.saveSetting(new Setting("dummyInvoiceNo", invoice.getInvoiceNo() + 1, invoice.getProfile()));
                }
            } else {
                invoice.setInvoiceNo(Integer.parseInt(settingService.getSettingByProfile("invoiceNo", invoice.getProfile())));
                invoice.setId(invoice.getProfile() + "_" + invoice.getInvoiceNo());
                invoiceDAO.save(invoice);
                settingService.saveSetting(new Setting("invoiceNo", invoice.getInvoiceNo() + 1, invoice.getProfile()));
            }
        }
        return invoice;
    }

    @Override
    public Invoice getInvoiceByInvoiceNoAndProfile(boolean dummy, int invoiceNo, String profile) {
        return invoiceDAO.findFirstByDummyAndInvoiceNoAndProfileOrderByInvoiceNoDesc(dummy, invoiceNo, profile);
    }

    @SuppressWarnings("ConstantConditions")
    @Override
    public PrintInvoiceReport getInvoiceReportByProfile(Date startInvoiceTime, Date endInvoiceTime, String inputLabel, String input, String dummy, String profile) {
        PrintInvoiceReport printInvoiceReport = new PrintInvoiceReport();
        int totalQuantity = 0;
        int totalAmount = 0;
        switch (inputLabel) {
            case "invoice":
                switch (inputLabel) {
                    case "Invoice No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(Integer.parseInt(0 + input.replaceAll("[^0-9]", "")), startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Reference Slip No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByReferenceSlipNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Customer Name":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByCustomersNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Driver Name":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByDriverNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Vehicle No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByVehicleNoContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Material":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByMaterialContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Mode Of Payment":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByModeOfPaymentContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    default:
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsFalseAndProfileOrderByInvoiceNoAsc(startInvoiceTime, endInvoiceTime, profile));
                }
                break;
            case "dummy":
                switch (inputLabel) {
                    case "Invoice No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(Integer.parseInt(0 + input.replaceAll("[^0-9]", "")), startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Reference Slip No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByReferenceSlipNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Customer Name":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByCustomersNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Driver Name":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByDriverNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Vehicle No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByVehicleNoContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Material":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByMaterialContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Mode Of Payment":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByModeOfPaymentContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    default:
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndDummyIsTrueAndProfileOrderByInvoiceNoAsc(startInvoiceTime, endInvoiceTime, profile));
                }
                break;
            default:
                switch (inputLabel) {
                    case "Invoice No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(Integer.parseInt(0 + input.replaceAll("[^0-9]", "")), startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Reference Slip No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByReferenceSlipNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Customer Name":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByCustomersNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Driver Name":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByDriverNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Vehicle No":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByVehicleNoContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Material":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByMaterialContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    case "Mode Of Payment":
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByModeOfPaymentContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(input, startInvoiceTime, endInvoiceTime, profile));
                        break;
                    default:
                        printInvoiceReport.setInvoices(invoiceDAO.findAllByInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(startInvoiceTime, endInvoiceTime, profile));
                }
        }

        for (Invoice invoice : printInvoiceReport.getInvoices()) {
            totalQuantity += invoice.getQuantity();
            totalAmount += invoice.getTotal();
        }
        printInvoiceReport.setTotalRecords(printInvoiceReport.getInvoices().size());
        printInvoiceReport.setTotalQuantity(totalQuantity);
        printInvoiceReport.setTotalAmount(totalAmount);
        return printInvoiceReport;
    }

    @Override
    @Transactional
    public void resetInvoiceByProfile(String invoiceNo, String profile) {
        invoiceDAO.deleteByProfile(profile);
        settingService.saveSetting(new Setting("dummyInvoiceNo", invoiceNo, profile));
        settingService.saveSetting(new Setting("invoiceNo", invoiceNo, profile));
    }

    @Override
    public Invoice updateInvoice(Invoice invoice) {
        invoiceDAO.save(invoice);
        return invoice;
    }

    @Override
    public boolean checkDummyInvoiceNoByProfile(int invoiceNo, String profile) {
        return invoiceDAO.findFirstByInvoiceNoAndProfileAndDummyIsTrue(invoiceNo, profile) == null;
    }
}
