package com.babulens.weighbridge.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
class Controller {

    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping("/error")
    public String error() {
        return "error";
    }

}
