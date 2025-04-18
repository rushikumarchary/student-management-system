package com.itrosys.auth_user_service.service;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.itrosys.auth_user_service.dto.LoginRequest;
import com.itrosys.auth_user_service.entity.User;
import com.itrosys.auth_user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User authenticate(LoginRequest request) throws Exception {
        FirebaseToken token = FirebaseAuth.getInstance().verifyIdToken(request.getIdToken());
        String uid = token.getUid();
        String email = token.getEmail();

        // Check if user already exists
        Optional<User> existingUser = userRepository.findById(uid);
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // Save new user
        User user = new User();
        user.setUid(uid);
        user.setEmail(email);
        user.setName(token.getName());
        user.setApproved(false); // requires admin approval

        return userRepository.save(user);
    }

}