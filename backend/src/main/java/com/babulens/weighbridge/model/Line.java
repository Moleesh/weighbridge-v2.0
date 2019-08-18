package com.babulens.weighbridge.model;

import java.awt.*;

public class Line {
    private String line;
    private Font font;

    public Line(String line, Font font) {
        this.line = line;
        this.font = font;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public Font getFont() {
        return font;
    }

    public void setFont(Font font) {
        this.font = font;
    }
}
