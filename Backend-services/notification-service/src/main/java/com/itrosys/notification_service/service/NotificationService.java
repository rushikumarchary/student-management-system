package com.itrosys.notification_service.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
    private final JavaMailSender mailSender;
    private final RedisTemplate<String, String> redisTemplate;

    public NotificationService(JavaMailSender mailSender, RedisTemplate<String, String> redisTemplate) {
        this.mailSender = mailSender;
        this.redisTemplate = redisTemplate;
    }

    public void sendOtp(String toEmail) {
        String otp = generateOtp();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your OTP");
            message.setText("Your OTP is: " + otp);
            mailSender.send(message);
            logger.info("OTP sent to {}", toEmail);
            redisTemplate.opsForValue().set("OTP_" + toEmail, otp, Duration.ofMinutes(5));
        } catch (Exception e) {
            logger.error("Failed to send OTP to {}: {}", toEmail, e.getMessage());
            throw new RuntimeException("Failed to send OTP email");
        }
    }

    public boolean verifyOtp(String toEmail, String otp) {
        String cachedOtp = redisTemplate.opsForValue().get("OTP_" + toEmail);
        return cachedOtp != null && otp.equals(cachedOtp);
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(1000000));
    }
}
