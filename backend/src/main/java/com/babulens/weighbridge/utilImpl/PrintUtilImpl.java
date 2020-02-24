package com.babulens.weighbridge.utilImpl;

import com.babulens.weighbridge.model.Coordinate;
import com.babulens.weighbridge.model.Line;
import com.babulens.weighbridge.model.PrintReport;
import com.babulens.weighbridge.model.PrintWeight;
import com.babulens.weighbridge.model.entity.WebCamDetail;
import com.babulens.weighbridge.model.entity.Weight;
import com.babulens.weighbridge.repository.WebCamDetailDAO;
import com.babulens.weighbridge.service.SettingService;
import com.babulens.weighbridge.util.PrintUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.RasterFormatException;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.io.File;
import java.io.IOException;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


@Service
public class PrintUtilImpl implements PrintUtil {
	final
	SettingService settingService;
	final
	WebCamDetailDAO webCamDetailDAO;

	@Autowired
	public PrintUtilImpl(SettingService settingService, WebCamDetailDAO webCamDetailDAO) {
		this.settingService = settingService;
		this.webCamDetailDAO = webCamDetailDAO;
	}


	private static Coordinate drawString(Graphics g, String text, int x, int y) {
		int length = 0;
		for (String line : text.split("\n")) {
			g.drawString(line, x + 10, y += g.getFontMetrics().getHeight() - 1);
			length = g.getFontMetrics().stringWidth(line);
		}
		return new Coordinate(length, y + g.getFontMetrics().getHeight() - 1);
	}


	@SuppressWarnings("SameParameterValue")
	private void setPaper(PageFormat pageFormat, Paper paper, double paperWidth, double paperHeight, double paperWidthMargin, double paperHeightMargin) {
		paper.setSize(paperWidth, paperHeight);
		paper.setImageableArea(paperWidthMargin, paperHeightMargin, paperWidth - (2 * paperWidthMargin),
				paperHeight - (2 * paperHeightMargin));
		pageFormat.setPaper(paper);
	}

	@Override
	public Book printPrePrint(PrintWeight printWeight) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 11.5d * 72d, 0d * 72d, 0d * 72d);
		Book book = new Book();

		book.append((graphics, pageFormat1, pageIndex) -> {
			// TODO: 29-07-2019 Pre Print
			final String initString = "";
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			PrintUtilImpl.drawString(graphics, initString, 0, 0);
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

		book.append((graphics, pageFormat1, pageIndex) -> {
			final String format = "%1$-5s%2$-20s: ";

			String initString = "\n\n" + StringUtils.center(printWeight.getWeighbridgeName(), 62);
			graphics.setFont(new Font("Courier New", Font.BOLD, 15));

			Coordinate coordinate = PrintUtilImpl.drawString(graphics, initString, 0, 0);
			initString = StringUtils.center(printWeight.getWeighbridgeAddress(), 73);
			graphics.setFont(new Font("Courier New", Font.BOLD + Font.ITALIC, 13));
			coordinate = PrintUtilImpl.drawString(graphics, initString, 0, coordinate.getY());

			initString = StringUtils.center("WEIGHMENT RECEIPT", 79) + "\n";
			graphics.setFont(new Font("Courier New", Font.BOLD + Font.ITALIC, 12));
			coordinate = PrintUtilImpl.drawString(graphics, initString, 0, coordinate.getY());

			initString = String.format(format, "", "Sl.No") + printWeight.getWeight().getSlipNo() + "\n\n"
					             + String.format(format, "", "Date") + printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalDate()
					             + "\n\n" + String.format(format, "", "Time")
					             + printWeight.getWeight().getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalTime() + "\n\n" + String.format(format, "", "Vehicle No")
					             + printWeight.getWeight().getVehicleNo()
					             + "\n\n" + String.format(format, "", "Material") + printWeight.getWeight().getMaterial()
					             + "\n\n" + String.format(format, "", "Customer Name")
					             + printWeight.getWeight().getCustomersName() + "\n\n" + String.format(format, "", "Charges")
					             + "Rs. " + (int) printWeight.getWeight().getCharges() + "\n\n";
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			coordinate = PrintUtilImpl.drawString(graphics, initString, 0, coordinate.getY());

			initString = String.format(format, "", "Gross Wt");
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			int yTemp = coordinate.getY();
			coordinate = PrintUtilImpl.drawString(graphics, initString, 0, coordinate.getY());
			int y = coordinate.getY();

			initString = StringUtils.rightPad("" + printWeight.getWeight().getGrossWeight(), 7) + "Kg";
			graphics.setFont(new Font("Courier New", Font.BOLD, 12));
			PrintUtilImpl.drawString(graphics, initString, coordinate.getX(), yTemp);

			initString = String.format(format, "", "Tare Wt");
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			yTemp = y;
			coordinate = PrintUtilImpl.drawString(graphics, initString, 0, y);
			y = coordinate.getY();

			initString = StringUtils.rightPad("" + printWeight.getWeight().getTareWeight(), 7) + "Kg";
			graphics.setFont(new Font("Courier New", Font.BOLD, 12));
			PrintUtilImpl.drawString(graphics, initString, coordinate.getX(), yTemp);

			initString = String.format(format, "", "Net Wt");
			graphics.setFont(new Font("Courier New", Font.BOLD, 10));
			yTemp = y;
			coordinate = PrintUtilImpl.drawString(graphics, initString, 0, y);

			initString = StringUtils.rightPad("" + printWeight.getWeight().getNettWeight(), 7) + "Kg";
			graphics.setFont(new Font("Courier New", Font.BOLD, 12));
			coordinate = PrintUtilImpl.drawString(graphics, initString, coordinate.getX(), yTemp);

			initString = "\n\n\n" + "     " + StringUtils.rightPad(printWeight.getFooter(), 70, " ")
					             + "Signature";
			graphics.setFont(new Font("Courier New", Font.BOLD + Font.ITALIC, 10));
			PrintUtilImpl.drawString(graphics, initString, 0, coordinate.getY());

			try {
				BufferedImage printImage = ImageIO
						                           .read(new File("WebCamOutput" + File.separator + printWeight.getWeight().getProfile() + "_" + printWeight.getWeight().getSlipNo() +
								                                          ".jpeg"));
				BufferedImage cropImage;
				if (webCamDetail.getHeight() < 1 || webCamDetail.getWidth() < 1) {
					cropImage = printImage.getSubimage(webCamDetail.getX_Axis(), webCamDetail.getY_Axis(), 1, 1);
				} else {
					cropImage = printImage.getSubimage(webCamDetail.getX_Axis(), webCamDetail.getY_Axis(), webCamDetail.getWidth(), webCamDetail.getHeight());
				}
				graphics.drawImage(cropImage, 250, 125, 300,
						(int) (300.00 / cropImage.getWidth() * cropImage.getHeight()), null);
			} catch (IOException | NullPointerException | RasterFormatException ex) {
				Logger.getLogger(getClass().getName()).log(Level.SEVERE, printWeight.getWeight().getSlipNo() +
						                                                         ".jpeg Image not availabel");
			}
			return Printable.PAGE_EXISTS;
		}, pageFormat);
		return book;
	}

	@Override
	public Book printReport(PrintReport printReport) {
		PageFormat pageFormat = new PageFormat();
		Paper paper = pageFormat.getPaper();

		setPaper(pageFormat, paper, 8d * 72d, 11.5d * 72d, 0d * 72d, 0.25d * 72d);
		Book book = new Book();

		final String format = " %1$-5s %2$-19s %3$-15s %4$-15s %5$-8s %6$-8s %7$-8s";

		List<Line> lines = new ArrayList<>();

		lines.add(new Line(StringUtils.center(printReport.getWeighbridgeName(), 73), new Font("Courier New",
				Font.BOLD, 12)));
		lines.add(new Line(StringUtils.center(printReport.getWeighbridgeAddress(), 86), new Font("Courier New",
				Font.ITALIC, 10)));
		lines.add(new Line(StringUtils.center(printReport.getReportTitle(), 86), new Font("Courier New", Font.ITALIC,
				10)));
		lines.add(new Line("----------------------------------------------------------------------------------------",
				new Font("Courier New", Font.PLAIN, 10)));
		lines.add(new Line(String.format(format, StringUtils.center("Sl.no", 5), StringUtils.center("Date & Time", 19),
				StringUtils.center("Vehicle No", 15), StringUtils.center("Material", 15),
				StringUtils.center("Gross Wt", 8), StringUtils.center("Tare Wt", 8),
				StringUtils.center("Net Wt", 8)), new Font("Courier New", Font.PLAIN, 10)));
		lines.add(new Line("----------------------------------------------------------------------------------------",
				new Font("Courier New", Font.PLAIN, 10)));
		for (Weight weight : printReport.getWeights()) {
			lines.add(new Line(String.format(format,
					StringUtils.center("" + weight.getSlipNo(), 5),
					StringUtils.center(weight.getNettTime() != null ? weight.getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalDate() + " " + weight.getNettTime().toInstant().atZone(ZoneId.of("UTC")).toLocalTime() : "", 19),
					StringUtils.center(weight.getVehicleNo(), 15),
					StringUtils.center(weight.getMaterial(), 15),
					StringUtils.leftPad("" + weight.getGrossWeight(), 8, " "),
					StringUtils.leftPad("" + weight.getTareWeight(), 8, " "),
					StringUtils.leftPad("" + weight.getNettWeight(), 8, " ")), new Font("Courier New", Font.PLAIN,
					10)));
		}
		lines.add(new Line("----------------------------------------------------------------------------------------",
				new Font("Courier New", Font.PLAIN, 10)));
		lines.add(new Line("\tTotal Records     : " + printReport.getTotalRecords(), new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("\tTotal Nett Weight : " + printReport.getTotalNettWeight() + " Kg", new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("\tTotal Charge      : Rs." + printReport.getTotalTotalCharges(), new Font("Courier New", Font.ITALIC, 10)));
		lines.add(new Line("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSignature", new Font("Courier New", Font.BOLD, 10)));
		lines.add(new Line(printReport.getFooter(), new Font("Courier New", Font.ITALIC, 10)));

		final int LIMIT = 35;
		book.append((graphics, pageFormat1, pageIndex) -> {
			Coordinate coordinate = new Coordinate(25, 0);
			graphics.setFont(new Font("Courier New", Font.BOLD, 20));
			coordinate = PrintUtilImpl.drawString(graphics, "\n\n\n", 25, coordinate.getY());
			if (pageIndex < lines.size() / LIMIT + 1) {
				for (int i = 0; i < LIMIT && i + LIMIT * pageIndex < lines.size(); i++) {
					graphics.setFont(lines.get(i + LIMIT * pageIndex).getFont());
					coordinate = PrintUtilImpl.drawString(graphics, lines.get(i + LIMIT * pageIndex).getLine(), 25,
							coordinate.getY());
				}
				return Printable.PAGE_EXISTS;
			} else {
				return Printable.NO_SUCH_PAGE;
			}
		}, pageFormat, lines.size() / LIMIT + 1);
		return book;
	}
}
