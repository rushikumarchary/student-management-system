package com.itrosys.login_service.exception;

public class BadCredentials extends RuntimeException{

    public BadCredentials(String massage){
        super(massage);
    }
}
