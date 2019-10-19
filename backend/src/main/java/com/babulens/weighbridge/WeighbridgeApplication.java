package com.babulens.weighbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class WeighbridgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeighbridgeApplication.class, args);
    }

//    @Configuration
//    @EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
//    static class MinimalConfiguration {
//    }
}
