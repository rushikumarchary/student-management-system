package com.itrosys.auth_user_service.dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String idToken; // Firebase ID token
}