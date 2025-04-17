package com.itrosys.auth_user_service.service;

import com.itrosys.auth_user_service.entity.User;
import com.itrosys.auth_user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUnapprovedUsers() {
        return userRepository.findAll().stream()
                .filter(user -> !user.isApproved())
                .toList();
    }

    public Optional<User> approveUser(String uid) {
        return userRepository.findById(uid).map(user -> {
            user.setApproved(true);
            return userRepository.save(user);
        });
    }
}
