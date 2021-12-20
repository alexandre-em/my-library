package com.daar.mylibrary.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@org.springframework.stereotype.Controller
public class Controller {
    @RequestMapping("/")
    public void redirect(HttpServletResponse res) throws IOException {
        res.sendRedirect("/apidocs.html");
    }
}
