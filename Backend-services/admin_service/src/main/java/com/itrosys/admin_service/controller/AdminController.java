package com.itrosys.admin_service.controller;


import com.itrosys.admin_service.dto.RequestUser;
import com.itrosys.admin_service.entity.User;
import com.itrosys.admin_service.repository.UserRepository;
import com.itrosys.admin_service.service.KeycloakUserService;
import com.itrosys.admin_service.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final KeycloakUserService keycloakUserService;
    private final UserService userService;

    public AdminController(UserRepository userRepository,
                           KeycloakUserService keycloakUserService,
                           UserService userService) {
        this.userRepository = userRepository;
        this.keycloakUserService = keycloakUserService;
        this.userService = userService;
    }

    private String generateCustomPassword(User user) {
        String firstName = user.getFirstName().toLowerCase();
        String mobile = user.getMobile(); // assuming mobile is stored as String

        String lastFourDigits = mobile.length() >= 4
                ? mobile.substring(mobile.length() - 4)
                : mobile;

        return firstName + "@" + lastFourDigits;
    }
    @PostMapping("/verify-and-create/{id}")
    public ResponseEntity<?> verifyAndCreate(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setVerified(true);
        userRepository.save(user);

        String customPassword = generateCustomPassword(user);

        keycloakUserService.createUser(
                user.getUsername(),
                customPassword,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok("User verified and created in Keycloak with password: " + customPassword);
    }
    @GetMapping("/unverified-users/{role}")
    public ResponseEntity<List<User>> getUnverifiedUsersByRole(@PathVariable String role) {
        List<User> unverifiedUsers = userService.getUnverifiedUsersByRole(role);
        return ResponseEntity.ok(unverifiedUsers);
    }
    @GetMapping("/user-by-role/{role}")
    public ResponseEntity<List<User>> getUserByRole(@PathVariable String role){
        List<User> unverifiedUsers = userService.getUserByRole(role);
        return ResponseEntity.ok(unverifiedUsers);
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody RequestUser dto) {
        // Generate username
        String emailPart = dto.getEmail().split("@")[0];
        String mobileLast4 = dto.getMobile().substring(dto.getMobile().length() - 4);
        String generatedUsername = emailPart + mobileLast4;

        // Create and save user in DB
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setMobile(dto.getMobile());
        user.setDob(dto.getDob());
        user.setRole(dto.getRole());
        user.setUsername(generatedUsername);
        user.setVerified(true); // directly verified

        userRepository.save(user);

        // Generate password
        String customPassword = generateCustomPassword(user);

        // Create user in Keycloak
        keycloakUserService.createUser(
                user.getUsername(),
                customPassword,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok("User created with username: " + user.getUsername() +
                " and password: " + customPassword);
    }


}
