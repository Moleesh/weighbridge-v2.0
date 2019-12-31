package com.babulens.weighbridge.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {
	@Override
	public String getErrorPath() {
		return "/error";
	}
}