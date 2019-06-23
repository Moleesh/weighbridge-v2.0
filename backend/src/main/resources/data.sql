INSERT INTO SETTINGS SELECT 'weightbridgeName', 'Babulens Enterprises' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'weightbridgeName') ;
INSERT INTO SETTINGS SELECT 'weighbridgeAddress', 'Nagercoil' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'weighbridgeAddress');
INSERT INTO SETTINGS SELECT 'footer', '' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'footer');
INSERT INTO SETTINGS SELECT 'printerName', 'B' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'printerName');
INSERT INTO SETTINGS SELECT 'noOfCopies', 3 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'noOfCopies');
INSERT INTO SETTINGS SELECT 'printFormat', 'Monthly' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'printFormat');
INSERT INTO SETTINGS SELECT 'indicatorCOMPort', 'COM4' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'indicatorCOMPort');
INSERT INTO SETTINGS SELECT 'indicatorBaudRate', 1200 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'indicatorBaudRate');
INSERT INTO SETTINGS SELECT 'indicatorDataBits', 8 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'indicatorDataBits');
INSERT INTO SETTINGS SELECT 'indicatorParity', 'None' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'indicatorParity');
INSERT INTO SETTINGS SELECT 'indicatorStopBits', 1 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'indicatorStopBits');
INSERT INTO SETTINGS SELECT 'indicatorFlowControl', 'Hardware' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'indicatorFlowControl');
INSERT INTO SETTINGS SELECT 'displayCOMPort', 'COM1' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'displayCOMPort');
INSERT INTO SETTINGS SELECT 'displayBaudRate', 1200 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'displayBaudRate');
INSERT INTO SETTINGS SELECT 'displayDataBits', 8 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'displayDataBits');
INSERT INTO SETTINGS SELECT 'displayParity', 'None' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'displayParity');
INSERT INTO SETTINGS SELECT 'displayStopBits', 1 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'displayStopBits');
INSERT INTO SETTINGS SELECT 'displayFlowControl', 'Hardware' FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'displayFlowControl');
INSERT INTO SETTINGS SELECT 'slipNo', 1 FROM DUAL WHERE NOT EXISTS (SELECT * FROM SETTINGS WHERE KEY = 'slipNo');