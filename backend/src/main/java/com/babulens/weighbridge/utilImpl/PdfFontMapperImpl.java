package com.babulens.weighbridge.utilImpl;

import com.itextpdf.awt.FontMapper;
import com.itextpdf.text.pdf.BaseFont;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class PdfFontMapperImpl implements FontMapper {

    private BaseFont getBaseFontFromFile(String directory, String filename) throws Exception {
        try (InputStream inputStream = new FileInputStream(new File(getClass().getClassLoader().getResource(directory + filename).getFile()))) {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] bytes = new byte[1024];
            while (true) {
                int size = inputStream.read(bytes);
                if (size < 0) {
                    break;
                }
                byteArrayOutputStream.write(bytes, 0, size);
            }
            bytes = byteArrayOutputStream.toByteArray();
            return BaseFont.createFont(filename, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED, BaseFont.NOT_CACHED,
                    bytes, null);
        }
    }

    @Override
    public BaseFont awtToPdf(Font font) {
        try {
            if (font.isBold()) {
                if (font.isItalic()) {
                    return this.getBaseFontFromFile("Fonts" + File.separator
                            , "courbi.ttf");
                }
                return this.getBaseFontFromFile("Fonts" + File.separator
                        , "courbd.ttf");
            } else if (font.isItalic()) {
                return this.getBaseFontFromFile("Fonts" + File.separator
                        , "couri.ttf");
            } else {
                return this.getBaseFontFromFile("Fonts" + File.separator
                        , "cour.ttf");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Font pdfToAwt(BaseFont baseFont, int size) {
        throw new UnsupportedOperationException();
    }
}
