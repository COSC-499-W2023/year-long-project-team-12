package com.exzbt.widget;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthPingController {

    @GetMapping("/healthPing")
    public String getHealthPing() {
        return "Healthy!";
    }
}
