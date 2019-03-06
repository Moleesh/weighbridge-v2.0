package com.babulens.weighbridge;

import org.panda_lang.pandomium.Pandomium;
import org.panda_lang.pandomium.settings.PandomiumSettings;
import org.panda_lang.pandomium.wrapper.PandomiumBrowser;
import org.panda_lang.pandomium.wrapper.PandomiumClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.swing.*;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

@SpringBootApplication
public class WeighbridgeApplication {
    
    public static void main(String[] args) {
//        Pandomium pandomium = new Pandomium(PandomiumSettings.getDefaultSettings());
//        pandomium.initialize();
//
//        PandomiumClient client = pandomium.createClient();
//
        SpringApplication.run(WeighbridgeApplication.class, args);
//        PandomiumBrowser browser = client.loadURL("localhost:8080");
//
//        JFrame frame = new JFrame();
//        frame.getContentPane().add(browser.toAWTComponent(), BorderLayout.CENTER);
//
//        frame.setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
//        frame.addWindowListener(new WindowAdapter() {
//            @Override
//            public void windowClosing(WindowEvent e) {
//                frame.dispose();
//            }
//        });
//
//        frame.setTitle("Pandomium");
//        frame.setSize(1720, 840);
//        frame.setVisible(true);
    }
    
}
