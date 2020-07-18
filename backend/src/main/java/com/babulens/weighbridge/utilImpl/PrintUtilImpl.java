package com.babulens.weighbridge.utilImpl;

import com.babulens.weighbridge.model.Coordinate;
import com.babulens.weighbridge.model.Line;
import com.babulens.weighbridge.model.PrintInvoice;
import com.babulens.weighbridge.model.PrintInvoiceReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.PrintWeightReport;
import com.babulens.weighbridge.model.entity.WebCamDetail;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.repository.WebCamDetailDAO;
import com.babulens.weighbridge.service.SettingService;
import com.babulens.weighbridge.util.NumToWordUtil;
import com.babulens.weighbridge.util.PrintUtil;
import com.ibm.icu.text.NumberFormat;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.font.TextAttribute;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.RasterFormatException;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.io.File;
import java.io.IOException;
import java.text.AttributedString;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class PrintUtilImpl implements PrintUtil {
	final SettingService settingService;
	final WebCamDetailDAO webCamDetailDAO;
	final NumToWordUtil numToWordUtil;

	@Autowired
	public PrintUtilImpl(SettingService settingService, WebCamDetailDAO webCamDetailDAO, NumToWordUtil numToWordUtil) {
		this.settingService = settingService;
		this.webCamDetailDAO = webCamDetailDAO;
		this.numToWordUtil = numToWordUtil;
	}

	private String indianCurrency(double num) {
		return NumberFormat.getCurrencyInstance(new Locale("en", "IN")).format(num).replace("₹", "");
	}

	private int getPaddingForCentreAlign(Graphics graphics, String text, int space) {
		return (int) ((space - graphics.getFontMetrics().getStringBounds(text.trim(), graphics).getWidth()) / 2);
	}

	private int getPaddingForRightAlign(Graphics graphics, String text, int space) {
		return (int) (space - graphics.getFontMetrics().getStringBounds(text, graphics).getWidth());
	}

	private Coordinate drawString(Graphics graphics, String text, int x, int y) {
		int length = 0;
		for (String line : text.split("\n")) {
			graphics.drawString(line, x, y += graphics.getFontMetrics().getHeight() - 1);
			length = graphics.getFontMetrics().stringWidth(line);
		}
		return new Coordinate(length, y + graphics.getFontMetrics().getHeight() - 1);
	}

	@SuppressWarnings("SameParameterValue")
	private void setPaper(PageFormat pageFormat, Paper paper, double paperWidth, double paperHeight,
	                      double paperWidthMargin, double paperHeightMargin) {
		paper.setSize(paperWidth, paperHeight);
		paper.setImageableArea(paperWidthMargin, paperHeightMargin, paperWidth - (2 * paperWidthMargin),
				paperHeight - (2 * paperHeightMargin));
		pageFormat.setPaper(paper);
		pageFormat.setOrientation(PageFormat.PORTRAIT);
	}

	@Override
	public Book printPrePrint(PrintWeight printWeight) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 11.5d * 72d, 0d * 72d, 0d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			// TODO: 29-07-2019 Pre Print
			final String initString = "";
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			drawString(graphics, initString, 10, 0);
			graphics.drawLine(56, 129, 544, 129);

			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}

	@Override
	public Book printWebCamPrint(PrintWeight printWeight) {

		WebCamDetail webCamDetail = webCamDetailDAO.findFirstByMyPrimaryIsTrue();

		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 6d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			final String format = "%1$-5s%2$-20s: ";

			String initString = "\n\n" + StringUtils.center(printWeight.getWeighbridgeName(), 62);
			graphics.setFont(new Font("Courier New", Font.BOLD, 15));

			Coordinate coordinate = drawString(graphics, initString, 10, 0);
			initString = StringUtils.center(printWeight.getWeighbridgeAddress(), 73);
			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 13));
			coordinate = drawString(graphics, initString, 10, coordinate.getY());

			initString = StringUtils.center("WEIGHMENT RECEIPT", 79) + "\n";
			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 12));
			coordinate = drawString(graphics, initString, 10, coordinate.getY());

			initString = String.format(format, "", "Sl.No") + printWeight.getWeight().getSlipNo() + "\n\n"
					             + String.format(format, "", "Date")
					             + printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalDate() + "\n\n"
					             + String.format(format, "", "Time")
					             + printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalTime() + "\n\n"
					             + String.format(format, "", "Vehicle No") + printWeight.getWeight().getVehicleNo() + "\n\n"
					             + String.format(format, "", "Material") + printWeight.getWeight().getMaterial() + "\n\n"
					             + String.format(format, "", "Customer Name") + printWeight.getWeight().getCustomersName() + "\n\n"
					             + String.format(format, "", "Charges") + "Rs. " + (int) printWeight.getWeight().getCharges()
					             + "\n\n";
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			coordinate = drawString(graphics, initString, 10, coordinate.getY());

			initString = String.format(format, "", "Gross Wt");
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			int yTemp = coordinate.getY();
			coordinate = drawString(graphics, initString, 10, coordinate.getY());
			int y = coordinate.getY();

			initString = StringUtils.rightPad("" + printWeight.getWeight().getGrossWeight(), 7) + "Kg";
			graphics.setFont(new Font("Courier New", Font.BOLD, 12));
			drawString(graphics, initString, coordinate.getX() + 10, yTemp);

			initString = String.format(format, "", "Tare Wt");
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			yTemp = y;
			coordinate = drawString(graphics, initString, 10, y);
			y = coordinate.getY();

			initString = StringUtils.rightPad("" + printWeight.getWeight().getTareWeight(), 7) + "Kg";
			graphics.setFont(new Font("Courier New", Font.BOLD, 12));
			drawString(graphics, initString, coordinate.getX() + 10, yTemp);

			initString = String.format(format, "", "Net Wt");
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			yTemp = y;
			coordinate = drawString(graphics, initString, 10, y);

			initString = StringUtils.rightPad("" + printWeight.getWeight().getNettWeight(), 7) + "Kg";
			graphics.setFont(new Font("Courier New", Font.BOLD, 12));
			coordinate = drawString(graphics, initString, coordinate.getX() + 10, yTemp);

			initString = "\n\n\n" + "     " + StringUtils.rightPad(printWeight.getFooter(), 70, " ") + "Signature";
			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 10));
			drawString(graphics, initString, 10, coordinate.getY());

			try {
				BufferedImage printImage = ImageIO.read(new File("WebCamOutput" + File.separator
						                                                 + printWeight.getWeight().getProfile() + "_" + printWeight.getWeight().getSlipNo() + ".jpeg"));
				BufferedImage cropImage;
				if (webCamDetail.getHeight() < 1 || webCamDetail.getWidth() < 1) {
					cropImage = printImage.getSubimage(webCamDetail.getX_Axis(), webCamDetail.getY_Axis(), 1, 1);
				} else {
					cropImage = printImage.getSubimage(webCamDetail.getX_Axis(), webCamDetail.getY_Axis(),
							webCamDetail.getWidth(), webCamDetail.getHeight());
				}
				graphics.drawImage(cropImage, 250, 125, 300,
						(int) (300.00 / cropImage.getWidth() * cropImage.getHeight()), null);
			} catch (IOException | NullPointerException | RasterFormatException ex) {
				Logger.getLogger(getClass().getName()).log(Level.SEVERE,
						printWeight.getWeight().getSlipNo() + ".jpeg Image not availabel");
			}
			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}

	@Override
	public Book printReport(PrintWeightReport printWeightReport) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 11.5d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		final String format = " %1$-5s %2$-19s %3$-15s %4$-15s %5$-8s %6$-8s %7$-8s";

		List<Line> lines = new ArrayList<>();

		lines.add(new Line(StringUtils.center(printWeightReport.getWeighbridgeName(), 73),
				new Font("Courier New", Font.BOLD, 12)));
		lines.add(new Line(StringUtils.center(printWeightReport.getWeighbridgeAddress(), 86),
				new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line(StringUtils.center(printWeightReport.getReportTitle(), 86),
				new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("----------------------------------------------------------------------------------------",
				new Font("Courier New", Font.PLAIN, 10)));
		lines.add(new Line(String.format(format, StringUtils.center("Sl.no", 5), StringUtils.center("Date & Time", 19),
				StringUtils.center("Vehicle No", 15), StringUtils.center("Material", 15),
				StringUtils.center("Gross Wt", 8), StringUtils.center("Tare Wt", 8), StringUtils.center("Net Wt", 8)),
				new Font("Courier New", Font.PLAIN, 10)));
		lines.add(new Line("----------------------------------------------------------------------------------------",
				new Font("Courier New", Font.PLAIN, 10)));
		for (Weight weight : printWeightReport.getWeights()) {
			lines.add(
					new Line(
							String.format(format, StringUtils.center("" + weight.getSlipNo(), 5),
									StringUtils.center(weight.getNettTime() != null
											                   ? weight.getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalDate()
													                     + " "
													                     + weight.getNettTime().toInstant().atZone(ZoneId.of("UTC"))
															                       .toLocalTime()
											                   : "", 19),
									StringUtils.center(weight.getVehicleNo(), 15),
									StringUtils.center(weight.getMaterial(), 15),
									StringUtils.leftPad("" + weight.getGrossWeight(), 8, " "),
									StringUtils.leftPad("" + weight.getTareWeight(), 8, " "),
									StringUtils.leftPad("" + weight.getNettWeight(), 8, " ")),
							new Font("Courier New", Font.PLAIN, 10)));
		}
		lines.add(new Line("----------------------------------------------------------------------------------------",
				new Font("Courier New", Font.PLAIN, 10)));
		lines.add(new Line("\tTotal Records     : " + printWeightReport.getTotalRecords(),
				new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("\tTotal Nett Weight : " + printWeightReport.getTotalWeight() + " Kg",
				new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("\tTotal Charge      : Rs." + printWeightReport.getTotalCharge(),
				new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSignature", new Font("Courier New", Font.BOLD, 10)));
		lines.add(new Line(printWeightReport.getFooter(), new Font("Courier New", Font.ITALIC, 10)));

		final int LIMIT = 35;
		book.append((graphics, _pageFormat, pageIndex) -> {
			Coordinate coordinate = new Coordinate(25, 0);
			graphics.setFont(new Font("Courier New", Font.BOLD, 20));
			coordinate = drawString(graphics, "\n\n\n", 35, coordinate.getY());
			if (pageIndex < lines.size() / LIMIT + 1) {
				for (int i = 0; i < LIMIT && i + LIMIT * pageIndex < lines.size(); i++) {
					graphics.setFont(lines.get(i + LIMIT * pageIndex).getFont());
					coordinate = drawString(graphics, lines.get(i + LIMIT * pageIndex).getLine(), 35, coordinate.getY());
				}
				return Printable.PAGE_EXISTS;
			} else {
				return Printable.NO_SUCH_PAGE;
			}
		}, pageFormat, lines.size() / LIMIT + 1);
		return book;
	}

	@Override
	public Book printReport(PrintInvoiceReport printInvoiceReport) {

		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 6d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {

			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}

	@Override
	public Book printPrePrint(PrintInvoice printInvoice) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8.25d * 72d, 6d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			AffineTransform affineTransform = new AffineTransform();
			affineTransform.setToQuadrantRotation(3);
			graphics.drawLine(30, 35, 30, 395);
			graphics.drawLine(30, 35, 575, 35);
			graphics.drawLine(575, 35, 575, 395);
			graphics.drawLine(30, 395, 575, 395);

			graphics.setFont(new Font("Nirmala UI", Font.BOLD | Font.ITALIC, 8).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getInvoiceHeader().trim(), 40, 392 - getPaddingForCentreAlign(graphics, printInvoice.getInvoiceHeader(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 15).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getWeighbridgeName().trim(), 55, 392 - getPaddingForCentreAlign(graphics, printInvoice.getWeighbridgeName(), 354));

			graphics.setFont(new Font("Courier New", Font.ITALIC | Font.BOLD, 10).deriveFont(affineTransform));
			String[] temp = printInvoice.getWeighbridgeAddress().trim().split("\\|");

			for (int i = 0; i < temp.length; i++) {
				graphics.drawString(temp[i].trim(), 68 + i * 10 + (temp.length == 1 ? 5 : 0), 392 - getPaddingForCentreAlign(graphics, temp[i], 354));
			}

			graphics.setFont(new Font("Courier New", Font.ITALIC, 10).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getContacts().trim(), 90, 392 - getPaddingForCentreAlign(graphics, printInvoice.getContacts(), 354));

			graphics.setFont(new Font("Courier New", Font.ITALIC, 10).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getPhone().trim(), 102, 392 - getPaddingForCentreAlign(graphics, printInvoice.getPhone(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 13).deriveFont(affineTransform));
			graphics.drawString("GST INVOICE", 118, 392 - getPaddingForCentreAlign(graphics, "GST Invoice", 354));

			AttributedString attributedString = new AttributedString("Invoice No");
			Font font = new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform);
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
			graphics.drawString(attributedString.getIterator(), 112, 392);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getInvoiceIdentifier().trim() + printInvoice.getInvoice().getInvoiceNo(), 122, 392);
			graphics.drawString("GSTIN: " + printInvoice.getGstin(), 122, 392 - getPaddingForRightAlign(graphics, "GSTIN: " + printInvoice.getGstin().trim(), 354));

			graphics.drawLine(125, 35, 125, 395);

			attributedString = new AttributedString("Date: " + new SimpleDateFormat(" dd/MM/yyyy   ").format(printInvoice.getInvoice().getInvoiceTime()));
			font = new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform);
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 6, 19);
			graphics.drawString(attributedString.getIterator(), 135, 390 - getPaddingForRightAlign(graphics, "Date: " + new SimpleDateFormat(" dd/MM/yyyy   ").format(printInvoice.getInvoice().getInvoiceTime()), 354));

			attributedString = new AttributedString("Time: " + new SimpleDateFormat(" hh:mm:ss aa  ").format(printInvoice.getInvoice().getInvoiceTime()));
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 6, 19);
			graphics.drawString(attributedString.getIterator(), 150, 390 - getPaddingForRightAlign(graphics, "Time: " + new SimpleDateFormat(" hh:mm:ss aa  ").format(printInvoice.getInvoice().getInvoiceTime()), 354));

			graphics.drawLine(157, 35, 157, 137);
			graphics.drawLine(125, 137, 157, 137);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("To,", 135, 385);

			attributedString = new AttributedString("Party Name : " + StringUtils.rightPad(printInvoice.getInvoice().getCustomersName(), 37));
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 13, 50);
			graphics.drawString(attributedString.getIterator(), 150, 385);

			attributedString = new AttributedString("Address    : " + StringUtils.rightPad(printInvoice.getInvoice().getAddress1(), 37));
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 13, 50);
			graphics.drawString(attributedString.getIterator(), 164, 385);

			attributedString = new AttributedString("             " + StringUtils.rightPad(printInvoice.getInvoice().getAddress2(), 37));
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 13, 50);
			graphics.drawString(attributedString.getIterator(), 178, 385);

			attributedString = new AttributedString("Vehicle No : " + StringUtils.rightPad(printInvoice.getInvoice().getVehicleNo(), 37));
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 13, 50);
			graphics.drawString(attributedString.getIterator(), 192, 385);

			attributedString = new AttributedString("Time Of Arrival(Approx) : " + StringUtils.rightPad(printInvoice.getInvoice().getTimeOfArrival(), 24));
			attributedString.addAttribute(TextAttribute.FONT, font);
			attributedString.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_LOW_DOTTED, 26, 50);
			graphics.drawString(attributedString.getIterator(), 206, 385);

			graphics.drawLine(212, 35, 212, 395);

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 8).deriveFont(affineTransform));
			graphics.drawString(StringUtils.center("Sl. No", 7) + StringUtils.center("Material", 24) + StringUtils.center("Quantity", 12) + StringUtils.leftPad("Unit Price", 12) + StringUtils.leftPad("Amount", 18), 225, 390);

			graphics.drawLine(235, 35, 235, 395);
			graphics.drawLine(212, 354, 300, 354);
			graphics.drawLine(212, 240, 300, 240);
			graphics.drawLine(212, 182, 300, 182);
			graphics.drawLine(212, 122, 365, 122);

			graphics.setFont(new Font("Courier New", Font.ITALIC, 8).deriveFont(affineTransform));
			graphics.drawString(StringUtils.center("1.", 7) + StringUtils.center(printInvoice.getInvoice().getMaterial(), 24) + StringUtils.center(String.valueOf(printInvoice.getInvoice().getQuantity()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getUnitPrice()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getAmount()), 18), 260, 392);

			graphics.drawLine(300, 35, 300, 395);

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 8).deriveFont(affineTransform));
			if (printInvoice.getInvoice().getIgst() == 0) {
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("CGST @ " + printInvoice.getInvoice().get_cgst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getCgst()), 18), 315, 392);
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("SGST @ " + printInvoice.getInvoice().get_sgst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getSgst()), 18), 330, 392);
			} else {
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("IGST @ " + printInvoice.getInvoice().get_igst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getIgst()), 18), 322, 392);
			}

			graphics.drawLine(340, 35, 340, 200);

			graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("Total", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getTotal()), 18), 355, 392);

			graphics.drawLine(365, 35, 365, 395);

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 10).deriveFont(affineTransform));
			temp = WordUtils.wrap(" (Rs. " + numToWordUtil.convertNumber(printInvoice.getInvoice().getTotal()) + " Only)", 58).split("\n");
			for (int i = 0; i < temp.length; i++) {
				graphics.drawString(temp[i].trim(), 377 + i * 10 + (temp.length == 1 ? 6 : 0), 392 - getPaddingForCentreAlign(graphics, temp[i], 354));
			}

			graphics.drawLine(395, 35, 395, 395);

			graphics.setFont(new Font("Courier New", Font.ITALIC, 8).deriveFont(affineTransform));

			temp = printInvoice.getAdditionalInformation().split("\n");
			for (int i = 0, z = 0; i < temp.length && z < 5; i++) {
				String[] line = WordUtils.wrap(temp[i], 73).split("\n");
				for (int j = 0; j < line.length && z < 5; j++, z++) {
					graphics.drawString(line[j], 405 + z * 10, 392);
				}
			}

			graphics.drawLine(450, 35, 450, 395);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("For " + printInvoice.getWeighbridgeName().trim(), 465, 215 - getPaddingForCentreAlign(graphics, "For " + printInvoice.getWeighbridgeName(), 180));

			graphics.drawString("(Party's Signature)", 550, 392 - getPaddingForCentreAlign(graphics, "(Party's Signature)", 180));
			graphics.drawString("(Authorised Signature)", 550, 215 - getPaddingForCentreAlign(graphics, "(Authorised Signature)", 180));

			graphics.drawLine(560, 35, 560, 395);
			graphics.drawLine(450, 215, 560, 215);

			graphics.setFont(new Font("Nirmala UI", Font.BOLD | Font.ITALIC, 10).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getFooter().trim(), 570, 392 - getPaddingForCentreAlign(graphics, printInvoice.getFooter(), 354));

			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}

	@Override
	public Book printStandard(PrintInvoice printInvoice) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 6d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {

			graphics.setFont(new Font("Courier New", Font.BOLD, 20));
			graphics.drawString(StringUtils.center(printInvoice.getWeighbridgeName(), 51), 40, 25);

			String[] temp = WordUtils.wrap(printInvoice.getWeighbridgeAddress().trim(), 54).split("\n");

			graphics.setFont(new Font("Courier New", Font.ITALIC, 15));
			if (temp.length == 2) {
				graphics.drawString(StringUtils.center(temp[0].trim(), 64), 40, 55);
				graphics.drawString(StringUtils.center(temp[1].trim(), 64), 40, 75);
			} else {
				graphics.drawString(StringUtils.center(temp[0].trim(), 64), 40, 60);
			}

			graphics.setFont(new Font("Courier New", Font.ITALIC, 12));
			graphics.drawString("Invoice No : " + printInvoice.getInvoice().getInvoiceNo(), 50, 110);

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 15));
			graphics.drawString(StringUtils.center("GST Invoice", 64), 40, 105);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 12));
			graphics.drawString("----------------------------------------------------------------------", 50, 120);

			graphics.setFont(new Font("Courier New", Font.ITALIC, 12));
			graphics.drawString("Date : " + new SimpleDateFormat("dd/MM/yyyy").format(printInvoice.getInvoice().getInvoiceTime()), 420, 130);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 12));
			graphics.drawString("Party Name : " + printInvoice.getInvoice().getCustomersName(), 60, 150);
			graphics.drawString("Address    : " + printInvoice.getInvoice().getAddress1(), 60, 170);
			graphics.drawString("             " + printInvoice.getInvoice().getAddress2(), 60, 190);
			graphics.drawString("----------------------------------------------------------------------", 50, 200);
			graphics.drawString("----------------------------------------------------------------------", 50, 225);
			graphics.drawString("----------------------------------------------------------------------", 50, 260);
			graphics.drawString("                                               -----------------------", 50, 310);
			graphics.drawString("----------------------------------------------------------------------", 50, 335);
			graphics.drawString("----------------------------------------------------------------------", 50, 400);

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 10));

			graphics.drawString(StringUtils.center("Sl. No", 8) + StringUtils.center("Material", 38) + StringUtils.center("Quantity", 12) + StringUtils.leftPad("Unit Price", 12) + StringUtils.leftPad("Amount", 12), 51, 215);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 10));

			graphics.drawString(StringUtils.center("1.", 8) + StringUtils.center(printInvoice.getInvoice().getMaterial(), 38) + StringUtils.center(String.valueOf(printInvoice.getInvoice().getQuantity()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getUnitPrice()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getAmount()), 12), 51, 245);

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 10));

			if (printInvoice.getInvoice().getIgst() == 0) {
				graphics.drawString(StringUtils.leftPad("", 58) + StringUtils.rightPad("CGST " + printInvoice.getInvoice().get_cgst() + "%", 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getCgst()), 12), 51, 280);
				graphics.drawString(StringUtils.leftPad("", 58) + StringUtils.rightPad("SGST " + printInvoice.getInvoice().get_sgst() + "%", 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getSgst()), 12), 51, 300);

			} else {
				graphics.drawString(StringUtils.leftPad("", 58) + StringUtils.rightPad("IGST " + printInvoice.getInvoice().get_igst() + "%", 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getIgst()), 12), 51, 290);
			}

			graphics.drawString(StringUtils.leftPad("", 58) + StringUtils.rightPad("Total", 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getTotal()), 12), 51, 325);

			temp = WordUtils.wrap(" (Rs. " + numToWordUtil.convertNumber(printInvoice.getInvoice().getTotal()) + " Only)", 52).split("\n");
			for (int i = temp.length; i > 0; i--) {
				graphics.drawString(temp[i - 1], 52, 330 - ((temp.length - i) * 15));
			}

			graphics.setFont(new Font("Courier New", Font.BOLD | Font.ITALIC, 12));
			graphics.drawString(StringUtils.center("Party's Signature", 20) + StringUtils.leftPad("", 29) + StringUtils.center("Authorized Signatory", 20), 51, 395);

			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}
}
