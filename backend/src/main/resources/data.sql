INSERT INTO PROFILE
SELECT 'Standard', true
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM PROFILE WHERE PROFILE_NAME like 'Standard');

INSERT INTO ADMIN_SETTING
SELECT 'REFRESH_TIME_WEIGHT', 500
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'REFRESH_TIME_WEIGHT');
INSERT INTO ADMIN_SETTING
SELECT 'RESET_SLIP_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'RESET_SLIP_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'RESET_INVOICE_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'RESET_INVOICE_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'MANUAL_ENTRY_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'MANUAL_ENTRY_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'EDIT_ENABLE_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'EDIT_ENABLE_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'INVOICE_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'INVOICE_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'WEBCAMS_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'WEBCAMS_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'BACKUP', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE SQNO = 'BACKUP');

INSERT INTO SETTING
SELECT 'Standard_slipNo', 'slipNo', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'slipNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceNo', 'invoiceNo', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'invoiceNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_dummyInvoiceNo', 'dummyInvoiceNo', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'dummyInvoiceNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_weighbridgeName', 'weighbridgeName', 'Standard', 'Babulens Enterprises'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'weighbridgeName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_weighbridgeAddress', 'weighbridgeAddress', 'Standard', 'Nagercoil'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'weighbridgeAddress' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_contacts', 'contacts', 'Standard', 'babulens@yahoo.com'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'phone' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_phone', 'phone', 'Standard', '9789597007'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'phone' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_footer', 'footer', 'Standard', ''
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'footer' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceHeader', 'invoiceHeader', 'Standard', 'Welcome'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'invoiceHeader' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceIdentifier', 'invoiceIdentifier', 'Standard', 'BE - 19/20'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'invoiceIdentifier' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_gstin', 'gstin', 'Standard', '123456789123456789'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'gstin' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceFooter', 'invoiceFooter', 'Standard', 'Thank You Visit Again'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'invoiceFooter' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_additionalInformation', 'additionalInformation', 'Standard', 'Terms & Conditions'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'additionalInformation' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_cgst', 'cgst', 'Standard', 4.5
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'cgst' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_sgst', 'sgst', 'Standard', 4.5
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'sgst' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_igst', 'igst', 'Standard', 4.5
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'igst' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printerNameForWeighing', 'printerNameForWeighing', 'Standard', 'get as .pdf File'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'printerNameForWeighing' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_noOfCopiesForWeighing', 'noOfCopiesForWeighing', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'noOfCopiesForWeighing' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printFormatForWeighing', 'printFormatForWeighing', 'Standard', 'Pre Print 1'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'printFormatForWeighing' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printerNameForInvoice', 'printerNameForInvoice', 'Standard', 'get as .pdf File'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'printerNameForInvoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_noOfCopiesForInvoice', 'noOfCopiesForInvoice', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'noOfCopiesForInvoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printFormatForInvoice', 'printFormatForInvoice', 'Standard', 'Standard'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'printFormatForInvoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoice', 'invoice', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'invoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_tonnage', 'tonnage', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'tonnage' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_webcams', 'webcams', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'webcams' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_automation', 'automation', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'automation' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_secondWeight', 'secondWeight', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'secondWeight' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideCharges', 'hideCharges', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideCharges' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideCustomerName', 'hideCustomerName', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideCustomerName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideTransporterName', 'hideTransporterName', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideTransporterName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideRemarks', 'hideRemarks', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideRemarks' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideVehicleNo', 'hideVehicleNo', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideVehicleNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideDriverName', 'hideDriverName', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideDriverName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideTimeOfArrival', 'hideTimeOfArrival', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideTimeOfArrival' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideModeOfPayment', 'hideModeOfPayment', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE SQNO = 'hideModeOfPayment' AND PROFILE like 'Standard');

INSERT INTO SERIAL_PORT_DETAIL
SELECT 'indicator',
       1200,
       8,
       10,
       0,
       '~~~',
       0,
       'dummy',
       1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SERIAL_PORT_DETAIL WHERE NAME LIKE 'indicator');
INSERT INTO SERIAL_PORT_DETAIL
SELECT 'display',
       1200,
       8,
       10,
       0,
       '~~~',
       0,
       'dummy',
       1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SERIAL_PORT_DETAIL WHERE NAME LIKE 'display');

INSERT INTO WEB_CAM_DETAIL
SELECT 'dummy', 5, true, 5, 0, 0
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM WEB_CAM_DETAIL WHERE NAME LIKE 'dummy');