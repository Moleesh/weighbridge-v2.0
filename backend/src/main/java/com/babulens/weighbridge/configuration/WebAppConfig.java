package com.babulens.weighbridge.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Objects;

@Configuration
public class WebAppConfig implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		Objects.requireNonNull(registry).addViewController("/").setViewName("forward:/index.html");
		Objects.requireNonNull(registry).addViewController("/error").setViewName("forward:/error.html");
		Objects.requireNonNull(registry).addViewController("/loginForm").setViewName("forward:/loginForm.html");
	}
}