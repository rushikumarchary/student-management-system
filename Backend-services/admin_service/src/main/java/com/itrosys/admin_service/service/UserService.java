package com.itrosys.admin_service.service;

import com.itrosys.admin_service.dto.RequestUser;
import com.itrosys.admin_service.entity.User;
import com.itrosys.admin_service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RequestUser dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setMobile(dto.getMobile());
        user.setDob(dto.getDob());
        user.setRole("Student");
        user.setVerified(false);

        // Generate username
        String emailPart = dto.getEmail().split("@")[0];
        String mobileLast4 = dto.getMobile().substring(dto.getMobile().length() - 4);
        String generatedUsername = emailPart + mobileLast4;

        user.setUsername(generatedUsername);

        return userRepository.save(user);
    }

    public List<User> getUnverifiedUsersByRole(String role) {
        return userRepository.findByVerifiedAndRole(false, role);
    }

    public List<User> getUserByRole(String role) {

        return userRepository.findByRole(role);
    }
}
