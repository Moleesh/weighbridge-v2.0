package com.babulens.weighbridge.utilImpl;

import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.util.PrintUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import javax.print.PrintService;
import java.awt.*;
import java.awt.print.*;


@Service
public class PrintUtilImpl implements PrintUtil {

    @Override
    public void printPrePrint(Weight weight, PrintService printer) {
        PrinterJob pj = PrinterJob.getPrinterJob();
        PageFormat pf = new PageFormat();
        Paper paper = pf.getPaper();
        double width = 8d * 72d;
        double height = 11.5d * 72d;
        double widthmargin = 0d * 72d;
        double heightmargin = 0d * 72d;
        paper.setSize(width, height);
        paper.setImageableArea(widthmargin, heightmargin, width - (2 * widthmargin), height - (2 * heightmargin));
        pf.setPaper(paper);
        Book pBook = new Book();
        pBook.append(new Printable() {
            private void drawString(Graphics g, String text, int y) {
                for (String line : text.split("\n")) {
                    g.drawString(line, 0, y += g.getFontMetrics().getHeight() - 1);
                }
            }

            @Override
            public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) {
                String format1 = "           %-19s: %-25s   %-10s : %s\n";
                String format2 = "           %-10s:%7s Kg   %-10s : %-12s   %-10s : %s\n";
                String format3 = "           %-10s:%7s Kg \n";
                String[] temp1 = new String[2];
                String[] temp2 = new String[2];

                String initString =
                        "\n\n\n\n\n\n\n\n\n\n" + "         "
                                + String.format("%72s", "Weighment Slip No : ") + "\n\n" + "         "
                                + StringUtils.center("", 82) + "\n" + "          "
                                + StringUtils.center("", 82) + "\n" + "         "
                                + StringUtils.center("", 82) + "\n\n" + "           Name of Contractor : "
                                + "" + "\n\n"
                                + String.format(format1, "Department Name", "", "Vehicle No",
                                "")
                                + "\n"
                                + String.format(format1, "Site At", "", "Product",
                                "")
                                + "\n"
                                + String.format(
                                format2, "Gross Wt.", "", "Date", temp1[0], "Time", temp1[1])
                                + "\n"
                                + String.format(format2, "Tare Wt.", "", "Date", temp2[0], "Time",
                                temp2[1])
                                + "\n" + String.format(format3, "Nett Wt.", "") + "\n\n\n" + "         "
                                + "" + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + "         "
                                + String.format("%72s", "Weighment Slip No : " + "") + "\n\n" + "         "
                                + StringUtils.center("", 82) + "\n" + "          "
                                + StringUtils.center("", 82) + "\n" + "         "
                                + StringUtils.center("", 82) + "\n\n" + "           Name of Contractor : "
                                + "" + "\n\n"
                                + String.format(format1, "Department Name", "", "Vehicle No",
                                "")
                                + "\n"
                                + String.format(format1, "Site At", "", "Product",
                                "")
                                + "\n"
                                + String.format(
                                format2, "Gross Wt.", "", "Date", temp1[0], "Time", temp1[1])
                                + "\n"
                                + String.format(format2, "Tare Wt.", "", "Date", temp2[0], "Time",
                                temp2[1])
                                + "\n" + String.format(format3, "Nett Wt.", "") + "\n\n\n" + "         "
                                + "";

                graphics.setFont(new Font("Courier New", Font.BOLD, 10));
                drawString(graphics, initString, 0);
                graphics.drawLine(56, 129, 544, 129);
                graphics.drawLine(56, 173, 544, 173);
                graphics.drawLine(56, 195, 544, 195);
                graphics.drawLine(351, 195, 351, 239);
                graphics.drawLine(56, 239, 544, 239);
                graphics.drawLine(201, 239, 201, 283);
                graphics.drawLine(369, 239, 369, 283);
                graphics.drawLine(56, 283, 544, 283);
                graphics.drawLine(56, 305, 544, 305);
                graphics.drawLine(56, 129, 56, 305);
                graphics.drawLine(544, 129, 544, 305);

                graphics.drawLine(56, 547, 544, 547);
                graphics.drawLine(56, 591, 544, 591);
                graphics.drawLine(56, 613, 544, 613);
                graphics.drawLine(351, 613, 351, 657);
                graphics.drawLine(56, 657, 544, 657);
                graphics.drawLine(201, 657, 201, 702);
                graphics.drawLine(369, 657, 369, 702);
                graphics.drawLine(56, 702, 544, 702);
                graphics.drawLine(56, 724, 544, 724);
                graphics.drawLine(56, 547, 56, 724);
                graphics.drawLine(544, 547, 544, 724);

                return Printable.PAGE_EXISTS;
            }
        }, pf);
        pj.setPageable(pBook);
        try {
            pj.setPrintService(printer);
            pj.print();
        } catch (PrinterException ignored) {
        }
    }
}
