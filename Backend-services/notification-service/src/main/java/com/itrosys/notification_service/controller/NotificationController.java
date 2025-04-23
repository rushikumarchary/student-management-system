package com.itrosys.notification_service.controller;

import com.itrosys.notification_service.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        try {
            notificationService.sendOtp(email);
            return ResponseEntity.ok("OTP sent successfully to " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send OTP: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean result = notificationService.verifyOtp(email, otp);
        if (result) {
            return ResponseEntity.ok("OTP Verified Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or Expired OTP");
        }
    }
}
