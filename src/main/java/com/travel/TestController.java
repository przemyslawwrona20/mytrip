package com.travel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/app/test")
    public String testMethod() {
        return "Test method resolved";
    }
}
