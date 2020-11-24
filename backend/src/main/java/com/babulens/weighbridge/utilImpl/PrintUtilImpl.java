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
import java.awt.BasicStroke;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.RasterFormatException;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;
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
		return NumberFormat.getCurrencyInstance(new Locale("en", "IN")).format(num).replaceAll("₹", "");
	}

	private int getPaddingForCentreAlign(Graphics graphics, String text, int space) {
		if (text.trim().equals("")) {
			text = "_";
		}
		return (int) ((space - graphics.getFontMetrics().getStringBounds(text.trim(), graphics).getWidth()) / 2);
	}

	@SuppressWarnings("SameParameterValue")
	private int getPaddingForRightAlign(Graphics graphics, String text, int space) {
		if (text.equals("")) {
			text = "_";
		}
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

	private void drawStringAsColumn(Graphics graphics, String text, int x, int y, int iterate, int width) {
		while (0 < iterate--) {
			drawString(graphics, text, x + iterate * width, y);
		}
	}

	private void setPaper(PageFormat pageFormat, Paper paper, double paperWidth, double paperHeight, double paperWidthMargin, double paperHeightMargin) {
		paper.setSize(paperWidth, paperHeight);
		paper.setImageableArea(paperWidthMargin, paperHeightMargin, paperWidth - (2 * paperWidthMargin), paperHeight - (2 * paperHeightMargin));
		pageFormat.setPaper(paper);
		pageFormat.setOrientation(PageFormat.PORTRAIT);
	}

	@Override
	public Book printPrePrint1(PrintWeight printWeight) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 6.1d * 72d, 0d * 72d, 0d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			graphics.setFont(new Font("Courier New", Font.PLAIN, 12));
			int space = 223;
			int margin = 40;
			int iterate = 3;
			int len = 64;
			int height = 24;
			drawStringAsColumn(graphics, "" + printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalDate(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, "" + printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalTime(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, "" + printWeight.getWeight().getSlipNo(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getMaterial(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getVehicleNo(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getCharges() == 0 ? "" : "" + (int) printWeight.getWeight().getCharges(), margin, len += height, iterate, space);
			graphics.setFont(new Font("Courier New", Font.BOLD, 14));
			drawStringAsColumn(graphics, printWeight.getWeight().getGrossWeight() + " Kg", margin, len += height - 2, iterate, space);
			height = 33;
			drawStringAsColumn(graphics, printWeight.getWeight().getTareWeight() + " Kg", margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getNettWeight() + " Kg", margin, len + height, iterate, space);
			return Printable.PAGE_EXISTS;
		}, pageFormat);

		return book;
	}

	@Override
	public Book printPrePrint2(PrintWeight printWeight) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 6d * 72d, 0d * 72d, 0d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			graphics.setFont(new Font("Courier New", Font.PLAIN, 12));
			int space = 220;
			int margin = 40;
			int iterate = 3;
			int len = 79;
			int height = 24;
			drawStringAsColumn(graphics, "" + printWeight.getWeight().getSlipNo(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getVehicleNo(), margin, len += height, iterate, space);
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
			simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
			drawStringAsColumn(graphics, "" + simpleDateFormat.format(printWeight.getWeight().getNettTime()), margin, len += height, iterate, space);
			simpleDateFormat = new SimpleDateFormat("HH:mm");
			simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
			drawStringAsColumn(graphics, "" + simpleDateFormat.format(printWeight.getWeight().getNettTime()), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getMaterial(), margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getCharges() == 0 ? "" : "" + (int) printWeight.getWeight().getCharges(), margin, len += height, iterate, space);
			graphics.setFont(new Font("Courier New", Font.BOLD, 14));
			drawStringAsColumn(graphics, printWeight.getWeight().getGrossWeight() + " Kg", margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getTareWeight() + " Kg", margin, len += height, iterate, space);
			drawStringAsColumn(graphics, printWeight.getWeight().getNettWeight() + " Kg", margin, len + height, iterate, space);
			return Printable.PAGE_EXISTS;
		}, pageFormat);

		return book;
	}

	@Override
	public Book printPlainPaper(PrintWeight printWeight) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 4d * 72d, .5d * 72d, .25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			final String format1 = "     %1$-9s: %2$-7s Kg               %3$-20s\n";
			final String format2 = " %1$-18s: %2$-30s\n";
			final String format3 = "     %1$-9s: %2$s";
			final String format4 = " %1$-13s: %2$-15s%3$-12s: %4$-20s\n";
			int len = 38;
			int margin = 60;

			graphics.setFont(new Font("Courier New", Font.BOLD, 20));
			drawString(graphics, StringUtils.center(printWeight.getWeighbridgeName(), 39), margin, len);

			graphics.setFont(new Font("Courier New", Font.ITALIC, 12));
			drawString(graphics, StringUtils.center(printWeight.getWeighbridgeAddress(), 65), margin, len = len + 29);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 12));
			drawString(graphics, "-----------------------------------------------------------------", margin, len = len + 14);
			drawString(graphics, String.format(format4, "Sl.No", printWeight.getWeight().getSlipNo(), "Date & Time", DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a").format(printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")))), margin, len = len + 14);
			drawString(graphics, String.format(format2, "Customer's Name", printWeight.getWeight().getCustomersName()), margin, len = len + 14);
			if (!printWeight.getWeight().getTransporterName().trim().equals("")) {
				drawString(graphics, String.format(format2, "Transpoter's Name", printWeight.getWeight().getTransporterName()), margin, len = len + 14);
			}
			drawString(graphics, String.format(format4, "Vehicle No", printWeight.getWeight().getVehicleNo(), "Material", printWeight.getWeight().getMaterial()), margin, len = len + 14);
			drawString(graphics, "-----------------------------------------------------------------", margin, len = len + 14);
			drawString(graphics, String.format(format1, "Gross Wt", StringUtils.leftPad(printWeight.getWeight().getGrossWeight() + "", 7, " "), printWeight.getWeight().getGrossTime() == null ? "" : DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a").format(printWeight.getWeight().getGrossTime().toInstant().atZone(ZoneId.of("UTC")))), margin, len = len + 14);
			drawString(graphics, String.format(format1, "Tare Wt", StringUtils.leftPad(printWeight.getWeight().getTareWeight() + "", 7, " "), printWeight.getWeight().getTareTime() == null ? "" : DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a").format(printWeight.getWeight().getTareTime().toInstant().atZone(ZoneId.of("UTC")))), margin, len = len + 14);
			drawString(graphics, String.format(format1, "Net Wt", StringUtils.leftPad(printWeight.getWeight().getNettWeight() + "", 7, " "), printWeight.getWeight().getCharges() == 0 ? "" : "Charges : Rs. " + (int) printWeight.getWeight().getCharges()), margin, len = len + 14);
			drawString(graphics, String.format(format3, "Remarks", printWeight.getWeight().getRemarks()), margin, len = len + 14);
			drawString(graphics, "-----------------------------------------------------------------", margin, len = len + 14);

			graphics.setFont(new Font("Courier New", Font.ITALIC, 12));
			drawString(graphics, StringUtils.rightPad(printWeight.getFooter(), 50, " ") + "Signature", margin, len + 14);

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

		book.append((graphics, _pageFormat, pageIndex) ->
				            Printable.PAGE_EXISTS
				, pageFormat);
		return book;
	}

	@Override
	public Book printPrePrint1(PrintInvoice printInvoice) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8.25d * 72d, 6d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			AffineTransform affineTransform = new AffineTransform();
			affineTransform.setToQuadrantRotation(3);
			graphics.drawLine(30, 25, 30, 385);
			graphics.drawLine(30, 25, 575, 25);
			graphics.drawLine(575, 25, 575, 385);
			graphics.drawLine(30, 385, 575, 385);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 7).deriveFont(affineTransform));
			graphics.drawString("GSTIN: " + printInvoice.getGstin(), 38, 382);

			graphics.setFont(new Font("Nirmala UI", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getInvoiceHeader().trim(), 40, 382 - getPaddingForCentreAlign(graphics, printInvoice.getInvoiceHeader(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 15).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getWeighbridgeName().trim(), 55, 382 - getPaddingForCentreAlign(graphics, printInvoice.getWeighbridgeName(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 10).deriveFont(affineTransform));
			String[] temp = printInvoice.getWeighbridgeAddress().trim().split("\\|");

			for (int i = 0; i < temp.length; i++) {
				graphics.drawString(temp[i].trim(), 68 + i * 10 + (temp.length == 1 ? 5 : 0), 382 - getPaddingForCentreAlign(graphics, temp[i], 354));
			}

			graphics.setFont(new Font("Courier New", Font.PLAIN, 10).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getContacts().trim(), 90, 382 - getPaddingForCentreAlign(graphics, printInvoice.getContacts(), 354));
			graphics.drawString(printInvoice.getPhone().trim(), 102, 382 - getPaddingForCentreAlign(graphics, printInvoice.getPhone(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 13).deriveFont(affineTransform));
			graphics.drawString("GST INVOICE", 118, 382 - getPaddingForCentreAlign(graphics, "GST Invoice", 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("Invoice No", 112, 382);

			graphics.drawLine(115, 382, 115, 333);

			graphics.drawString(printInvoice.getInvoiceIdentifier().trim() + printInvoice.getInvoice().getInvoiceNo(), 122, 382);

			graphics.drawLine(125, 25, 125, 385);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));
			graphics.drawString("Date: " + new SimpleDateFormat(" dd/MM/yyyy   ").format(printInvoice.getInvoice().getInvoiceTime()), 135, 380 - getPaddingForRightAlign(graphics, "Date: " + new SimpleDateFormat(" dd/MM/yyyy   ").format(printInvoice.getInvoice().getInvoiceTime()), 354));
			graphics.drawString("Time: " + new SimpleDateFormat(" hh:mm:ss aa  ").format(printInvoice.getInvoice().getInvoiceTime()), 150, 380 - getPaddingForRightAlign(graphics, "Time: " + new SimpleDateFormat(" hh:mm:ss aa  ").format(printInvoice.getInvoice().getInvoiceTime()), 354));

			graphics.drawLine(157, 25, 157, 127);
			graphics.drawLine(125, 127, 157, 127);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("To,", 135, 375);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));
			graphics.drawString("Party Name : " + StringUtils.rightPad(printInvoice.getInvoice().getCustomersName(), 37), 150, 375);
			graphics.drawString("Address    : " + StringUtils.rightPad(printInvoice.getInvoice().getAddress1(), 37), 164, 375);
			graphics.drawString("             " + StringUtils.rightPad(printInvoice.getInvoice().getAddress2(), 37), 178, 375);
			graphics.drawString("GSTIN      : " + StringUtils.rightPad(printInvoice.getInvoice().getGstin(), 37), 192, 375);
			graphics.drawString("Vehicle No : " + StringUtils.rightPad(printInvoice.getInvoice().getVehicleNo(), 37), 206, 375);
			graphics.drawString("Time Of Arrival(Approx) : " + StringUtils.rightPad(printInvoice.getInvoice().getTimeOfArrival(), 24), 220, 375);

			graphics.drawLine(226, 25, 226, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(StringUtils.center("Sl. No", 7) + StringUtils.center("Material", 24) + StringUtils.center("Quantity", 12) + StringUtils.leftPad("Unit Price", 12) + StringUtils.leftPad("Amount", 18), 239, 380);

			graphics.drawLine(249, 25, 249, 385);
			graphics.drawLine(226, 344, 314, 344);
			graphics.drawLine(226, 230, 314, 230);
			graphics.drawLine(226, 172, 314, 172);
			graphics.drawLine(226, 112, 379, 112);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));
			graphics.drawString(StringUtils.center("1.", 7) + StringUtils.center(printInvoice.getInvoice().getMaterial(), 24) + StringUtils.center(String.valueOf(printInvoice.getInvoice().getQuantity()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getUnitPrice()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getAmount()), 18), 274, 382);

			graphics.drawLine(314, 25, 314, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			if (printInvoice.getInvoice().getIgst() == 0) {
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("CGST @ " + printInvoice.getInvoice().get_cgst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getCgst()), 18), 329, 382);
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("SGST @ " + printInvoice.getInvoice().get_sgst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getSgst()), 18), 344, 382);
			} else {
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("IGST @ " + printInvoice.getInvoice().get_igst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getIgst()), 18), 336, 382);
			}

			graphics.drawLine(354, 25, 354, 190);

			graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("Total", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getTotal()), 18), 369, 382);

			graphics.drawLine(379, 25, 379, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 10).deriveFont(affineTransform));
			temp = WordUtils.wrap(" (Rs. " + numToWordUtil.convertNumber(printInvoice.getInvoice().getTotal()) + " Only)", 58).split("\n");
			for (int i = 0; i < temp.length; i++) {
				graphics.drawString(temp[i].trim(), 391 + i * 10 + (temp.length == 1 ? 6 : 0), 382 - getPaddingForCentreAlign(graphics, temp[i], 354));
			}

			graphics.drawLine(409, 25, 409, 385);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));

			temp = printInvoice.getAdditionalInformation().split("\n");
			for (int i = 0; i < temp.length && i < 5; i++) {
				graphics.drawString(temp[i], 419 + i * 10, 382);
			}

			graphics.drawLine(464, 25, 464, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("For " + printInvoice.getWeighbridgeName().trim(), 479, 205 - getPaddingForCentreAlign(graphics, "For " + printInvoice.getWeighbridgeName(), 180));

			graphics.drawString("(Party's Signature)", 550, 382 - getPaddingForCentreAlign(graphics, "(Party's Signature)", 180));
			graphics.drawString("(Authorised Signature)", 550, 205 - getPaddingForCentreAlign(graphics, "(Authorised Signature)", 180));

			graphics.drawLine(560, 25, 560, 385);
			graphics.drawLine(464, 205, 560, 205);

			graphics.setFont(new Font("Nirmala UI", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getInvoiceFooter().trim(), 570, 382 - getPaddingForCentreAlign(graphics, printInvoice.getInvoiceFooter(), 354));

			((Graphics2D) graphics).setStroke(new BasicStroke(1, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 0, new float[]{1, 2}, 0));

			graphics.drawLine(138, 95, 138, 30);
			graphics.drawLine(153, 95, 153, 30);

			graphics.drawLine(153, 314, 153, 135);
			graphics.drawLine(167, 314, 167, 135);
			graphics.drawLine(181, 314, 181, 135);
			graphics.drawLine(195, 314, 195, 135);
			graphics.drawLine(209, 314, 209, 135);
			graphics.drawLine(223, 251, 223, 135);

			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}

	@Override
	public Book printPrePrint2(PrintInvoice printInvoice) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8.25d * 72d, 6d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		book.append((graphics, _pageFormat, pageIndex) -> {
			AffineTransform affineTransform = new AffineTransform();
			affineTransform.setToQuadrantRotation(3);
			graphics.drawLine(30, 25, 30, 385);
			graphics.drawLine(30, 25, 575, 25);
			graphics.drawLine(575, 25, 575, 385);
			graphics.drawLine(30, 385, 575, 385);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 7).deriveFont(affineTransform));
			graphics.drawString("GSTIN: " + printInvoice.getGstin(), 38, 382);

			graphics.setFont(new Font("Nirmala UI", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getInvoiceHeader().trim(), 40, 382 - getPaddingForCentreAlign(graphics, printInvoice.getInvoiceHeader(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 15).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getWeighbridgeName().trim(), 55, 382 - getPaddingForCentreAlign(graphics, printInvoice.getWeighbridgeName(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 10).deriveFont(affineTransform));
			String[] temp = printInvoice.getWeighbridgeAddress().trim().split("\\|");

			for (int i = 0; i < temp.length; i++) {
				graphics.drawString(temp[i].trim(), 68 + i * 10 + (temp.length == 1 ? 5 : 0), 382 - getPaddingForCentreAlign(graphics, temp[i], 354));
			}

			graphics.setFont(new Font("Courier New", Font.PLAIN, 10).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getContacts().trim(), 90, 382 - getPaddingForCentreAlign(graphics, printInvoice.getContacts(), 354));
			graphics.drawString(printInvoice.getPhone().trim(), 102, 382 - getPaddingForCentreAlign(graphics, printInvoice.getPhone(), 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 13).deriveFont(affineTransform));
			graphics.drawString("GST INVOICE", 118, 382 - getPaddingForCentreAlign(graphics, "GST Invoice", 354));

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("Invoice No", 112, 382);

			graphics.drawLine(115, 382, 115, 333);

			graphics.drawString(printInvoice.getInvoiceIdentifier().trim() + printInvoice.getInvoice().getInvoiceNo(), 122, 382);

			graphics.drawLine(125, 25, 125, 385);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));
			graphics.drawString("Date: " + new SimpleDateFormat(" dd/MM/yyyy   ").format(printInvoice.getInvoice().getInvoiceTime()), 135, 123);
			graphics.drawString("Time: " + new SimpleDateFormat(" hh:mm:ss aa  ").format(printInvoice.getInvoice().getInvoiceTime()), 150, 123);
			graphics.drawString("Type: " + printInvoice.getInvoice().getModeOfPayment(), 165, 123);

			graphics.drawLine(172, 25, 172, 127);
			graphics.drawLine(125, 127, 172, 127);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("To,", 135, 375);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));
			graphics.drawString("Party Name : " + StringUtils.rightPad(printInvoice.getInvoice().getCustomersName(), 37), 150, 375);
			graphics.drawString("Address    : " + StringUtils.rightPad(printInvoice.getInvoice().getAddress1(), 37), 164, 375);
			graphics.drawString("             " + StringUtils.rightPad(printInvoice.getInvoice().getAddress2(), 37), 178, 375);
			graphics.drawString("GSTIN      : " + StringUtils.rightPad(printInvoice.getInvoice().getGstin(), 37), 192, 375);
			graphics.drawString("Vehicle No : " + StringUtils.rightPad(printInvoice.getInvoice().getVehicleNo(), 37), 206, 375);
			graphics.drawString("Driver Name: " + StringUtils.rightPad(printInvoice.getInvoice().getDriverName(), 37), 220, 375);

			graphics.drawLine(226, 25, 226, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(StringUtils.center("Sl. No", 7) + StringUtils.center("Material", 24) + StringUtils.center("Quantity", 12) + StringUtils.leftPad("Unit Price", 12) + StringUtils.leftPad("Amount", 18), 239, 380);

			graphics.drawLine(249, 25, 249, 385);
			graphics.drawLine(226, 344, 314, 344);
			graphics.drawLine(226, 230, 314, 230);
			graphics.drawLine(226, 172, 314, 172);
			graphics.drawLine(226, 112, 379, 112);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));
			graphics.drawString(StringUtils.center("1.", 7) + StringUtils.center(printInvoice.getInvoice().getMaterial(), 24) + StringUtils.center(String.valueOf(printInvoice.getInvoice().getQuantity()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getUnitPrice()), 12) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getAmount()), 18), 274, 382);

			graphics.drawLine(314, 25, 314, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			if (printInvoice.getInvoice().getIgst() == 0) {
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("CGST @ " + printInvoice.getInvoice().get_cgst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getCgst()), 18), 329, 382);
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("SGST @ " + printInvoice.getInvoice().get_sgst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getSgst()), 18), 344, 382);
			} else {
				graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("IGST @ " + printInvoice.getInvoice().get_igst() + "%", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getIgst()), 18), 336, 382);
			}

			graphics.drawLine(354, 25, 354, 190);

			graphics.drawString(StringUtils.leftPad("", 42) + StringUtils.rightPad("Total", 13) + StringUtils.leftPad(indianCurrency(printInvoice.getInvoice().getTotal()), 18), 369, 382);

			graphics.drawLine(379, 25, 379, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 10).deriveFont(affineTransform));
			temp = WordUtils.wrap(" (Rs. " + numToWordUtil.convertNumber(printInvoice.getInvoice().getTotal()) + " Only)", 58).split("\n");
			for (int i = 0; i < temp.length; i++) {
				graphics.drawString(temp[i].trim(), 391 + i * 10 + (temp.length == 1 ? 6 : 0), 382 - getPaddingForCentreAlign(graphics, temp[i], 354));
			}

			graphics.drawLine(409, 25, 409, 385);

			graphics.setFont(new Font("Courier New", Font.PLAIN, 8).deriveFont(affineTransform));

			temp = printInvoice.getAdditionalInformation().split("\n");
			for (int i = 0; i < temp.length && i < 5; i++) {
				graphics.drawString(temp[i], 419 + i * 10, 382);
			}

			graphics.drawLine(464, 25, 464, 385);

			graphics.setFont(new Font("Courier New", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString("For " + printInvoice.getWeighbridgeName().trim(), 479, 205 - getPaddingForCentreAlign(graphics, "For " + printInvoice.getWeighbridgeName(), 180));

			graphics.drawString("(Party's Signature)", 550, 382 - getPaddingForCentreAlign(graphics, "(Party's Signature)", 180));
			graphics.drawString("(Authorised Signature)", 550, 205 - getPaddingForCentreAlign(graphics, "(Authorised Signature)", 180));

			graphics.drawLine(560, 25, 560, 385);
			graphics.drawLine(464, 205, 560, 205);

			graphics.setFont(new Font("Nirmala UI", Font.BOLD, 8).deriveFont(affineTransform));
			graphics.drawString(printInvoice.getInvoiceFooter().trim(), 570, 382 - getPaddingForCentreAlign(graphics, printInvoice.getInvoiceFooter(), 354));

			((Graphics2D) graphics).setStroke(new BasicStroke(1, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 0, new float[]{1, 2}, 0));

			graphics.drawLine(138, 95, 138, 30);
			graphics.drawLine(153, 95, 153, 30);
			graphics.drawLine(168, 95, 168, 30);


			graphics.drawLine(153, 314, 153, 135);
			graphics.drawLine(167, 314, 167, 135);
			graphics.drawLine(181, 314, 181, 135);
			graphics.drawLine(195, 314, 195, 135);
			graphics.drawLine(209, 314, 209, 135);
			graphics.drawLine(223, 314, 223, 135);

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
