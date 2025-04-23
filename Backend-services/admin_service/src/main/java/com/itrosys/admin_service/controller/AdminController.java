package com.itrosys.admin_service.controller;


import com.itrosys.admin_service.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/verify-and-create/{id}")
    public ResponseEntity<?> verifyAndCreate(@PathVariable Long id) {
        try {
            String password = adminService.verifyAndCreateStudent(id);
            return ResponseEntity.ok("Student verified, Keycloak user created, and registered in student-service. Password: " + password);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Verification failed: " + e.getMessage());
        }
    }


}
