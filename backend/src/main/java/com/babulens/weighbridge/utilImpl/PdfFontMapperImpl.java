package com.babulens.weighbridge.utilImpl;

import com.itextpdf.awt.FontMapper;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.BaseFont;
import org.springframework.core.io.ClassPathResource;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PdfFontMapperImpl implements FontMapper {

	private BaseFont getBaseFontFromFile(String directory, String filename) {
		try (InputStream inputStream = new ClassPathResource(directory + filename).getInputStream()) {
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
		} catch (DocumentException | IOException | NullPointerException ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
		}
		return null;
	}

	@Override
	public BaseFont awtToPdf(Font font) {
		String directory = "Fonts" + File.separator;
		if (font.isBold()) {
			if (font.isItalic()) {
				return getBaseFontFromFile(directory, "courbi.ttf");
			}
			return getBaseFontFromFile(directory, "courbd.ttf");
		} else if (font.isItalic()) {
			return getBaseFontFromFile(directory, "couri.ttf");
		} else {
			return getBaseFontFromFile(directory, "cour.ttf");
		}
	}

	@Override
	public Font pdfToAwt(BaseFont baseFont, int size) {
		throw new UnsupportedOperationException();
	}
}
