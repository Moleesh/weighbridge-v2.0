INSERT INTO PROFILE
SELECT 'Standard', true
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM PROFILE WHERE PROFILE_NAME like 'Standard');

INSERT INTO ADMIN_SETTING
SELECT 'REFRESH_TIME_WEIGHT', 500
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE KEY = 'REFRESH_TIME_WEIGHT');
INSERT INTO ADMIN_SETTING
SELECT 'RESET_SLIP_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE KEY = 'RESET_SLIP_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'RESET_INVOICE_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE KEY = 'RESET_INVOICE_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'MANUAL_ENTRY_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE KEY = 'MANUAL_ENTRY_PASSWORD');
INSERT INTO ADMIN_SETTING
SELECT 'EDIT_ENABLE_PASSWORD', '147085'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM ADMIN_SETTING WHERE KEY = 'EDIT_ENABLE_PASSWORD');

INSERT INTO SETTING
SELECT 'Standard_slipNo', 'slipNo', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'slipNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceNo', 'invoiceNo', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'invoiceNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_dummyInvoiceNo', 'dummyInvoiceNo', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'dummyInvoiceNo' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_weighbridgeName', 'weighbridgeName', 'Standard', 'Babulens Enterprises'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'weighbridgeName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_weighbridgeAddress', 'weighbridgeAddress', 'Standard', 'Nagercoil'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'weighbridgeAddress' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_contacts', 'contacts', 'Standard', 'babulens@yahoo.com'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'phone' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_phone', 'phone', 'Standard', '9789597007'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'phone' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_footer', 'footer', 'Standard', ''
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'footer' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceHeader', 'invoiceHeader', 'Standard', 'Welcome'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'invoiceHeader' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceIdentifier', 'invoiceIdentifier', 'Standard', 'BE - 19/20'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'invoiceIdentifier' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_gstin', 'gstin', 'Standard', '123456789123456789'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'gstin' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_invoiceFooter', 'invoiceFooter', 'Standard', 'Thank You Visit Again'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'invoiceFooter' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_additionalInformation', 'additionalInformation', 'Standard', 'Terms & Conditions'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'additionalInformation' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_cgst', 'cgst', 'Standard', 4.5
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'cgst' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_sgst', 'sgst', 'Standard', 4.5
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'sgst' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_igst', 'igst', 'Standard', 4.5
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'igst' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printerNameForWeighing', 'printerNameForWeighing', 'Standard', 'get as .pdf File'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'printerNameForWeighing' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_noOfCopiesForWeighing', 'noOfCopiesForWeighing', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'noOfCopiesForWeighing' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printFormatForWeighing', 'printFormatForWeighing', 'Standard', 'WebCam Print'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'printFormatForWeighing' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printerNameForInvoice', 'printerNameForInvoice', 'Standard', 'get as .pdf File'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'printerNameForInvoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_noOfCopiesForInvoice', 'noOfCopiesForInvoice', 'Standard', 1
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'noOfCopiesForInvoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_printFormatForInvoice', 'printFormatForInvoice', 'Standard', 'Pre Print'
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'printFormatForInvoice' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_automation', 'automation', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'automation' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideCharges', 'hideCharges', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'hideCharges' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideCustomerName', 'hideCustomerName', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'hideCustomerName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideTransporterName', 'hideTransporterName', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'hideTransporterName' AND PROFILE like 'Standard');
INSERT INTO SETTING
SELECT 'Standard_hideRemarks', 'hideRemarks', 'Standard', false
FROM DUAL
WHERE NOT EXISTS(SELECT * FROM SETTING WHERE KEY = 'hideRemarks' AND PROFILE like 'Standard');

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