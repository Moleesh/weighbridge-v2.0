package com.babulens.weighbridge.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyErrorController implements ErrorController {
	@Override
	public String getErrorPath() {
		return "/error";
	}
}