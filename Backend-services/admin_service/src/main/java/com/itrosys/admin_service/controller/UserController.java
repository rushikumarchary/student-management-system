package com.itrosys.admin_service.controller;

import com.itrosys.admin_service.dto.RequestUser;
import com.itrosys.admin_service.entity.User;
import com.itrosys.admin_service.repository.UserRepository;
import com.itrosys.admin_service.service.KeycloakUserService;
import com.itrosys.admin_service.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {


private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register-user")
    public ResponseEntity<User> register(@RequestBody RequestUser user){
        return ResponseEntity.ok(userService.register(user));
    }
}