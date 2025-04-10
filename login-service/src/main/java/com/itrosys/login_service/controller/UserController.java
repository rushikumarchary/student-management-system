package com.itrosys.login_service.controller;

import com.itrosys.login_service.entity.User;
import com.itrosys.login_service.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    private final UserService userService;



    public UserController(UserService userService) {
        this.userService = userService;

    }


    @PostMapping("/auth/signUp")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/auth/signIn")
    public String singIn(@RequestBody User user) {
        return userService.verify(user);
    }




}
