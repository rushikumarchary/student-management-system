package com.itrosys.login_service.exception;

public class EmailAlreadyExists extends RuntimeException{

    public EmailAlreadyExists(String massage){
        super(massage);
    }
}
