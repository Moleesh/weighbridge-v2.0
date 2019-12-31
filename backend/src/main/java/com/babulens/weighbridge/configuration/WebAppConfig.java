package com.babulens.weighbridge.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAppConfig implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
		registry.addViewController("/error").setViewName("forward:/404.html");
		registry.addViewController("/404").setViewName("forward:/404.html");
		registry.addViewController("/loginForm").setViewName("forward:/loginForm.html");
	}
}