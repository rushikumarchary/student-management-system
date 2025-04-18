package com.itrosys.auth_user_service.controller;

import com.itrosys.auth_user_service.entity.User;
import com.itrosys.auth_user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/pending-users")
    public ResponseEntity<List<User>> getUnapprovedUsers() {
        return ResponseEntity.ok(userService.getAllUnapprovedUsers());
    }

    @PostMapping("/approve/{uid}")
    public ResponseEntity<User> approveUser(@PathVariable String uid) {
        return userService.approveUser(uid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
