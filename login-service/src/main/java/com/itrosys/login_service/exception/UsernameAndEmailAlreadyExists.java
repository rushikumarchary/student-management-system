package com.itrosys.login_service.exception;

public class UsernameAndEmailAlreadyExists extends  RuntimeException{

    public UsernameAndEmailAlreadyExists(String massage){
        super(massage);
    }
}
