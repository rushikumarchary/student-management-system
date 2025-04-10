package com.itrosys.login_service.exception;

public class UsernameAlreadyExists extends RuntimeException {
    public UsernameAlreadyExists(String message) {
        super(message);
    }
}
