package com.itrosys.admin_service.service;

import com.itrosys.admin_service.dto.StudentDTO;
import com.itrosys.admin_service.dto.VerifiedStudentDto;
import com.itrosys.admin_service.entity.User;
import com.itrosys.admin_service.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final KeycloakUserService keycloakUserService;
    private final UserService userService;
    private final RestTemplate restTemplate;

    public AdminService(UserRepository userRepository,
                        KeycloakUserService keycloakUserService,
                        UserService userService,
                        RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.keycloakUserService = keycloakUserService;
        this.userService = userService;
        this.restTemplate = restTemplate;
    }

    private String generateCustomPassword(User user) {
        String firstName = user.getFirstName().toLowerCase();
        String mobile = user.getMobile();

        String lastFourDigits = mobile.length() >= 4
                ? mobile.substring(mobile.length() - 4)
                : mobile;

        return firstName + "@" + lastFourDigits;
    }

    public String verifyAndCreateStudent(Long id) {
        // 1. Fetch student from admissions-service
        StudentDTO student = restTemplate.getForObject(
                "http://localhost:8080/api/admissions/student/" + id,
                StudentDTO.class
        );

        if (student == null) {
            throw new RuntimeException("Student not found in admissions-service");
        }

        // 2. Prepare User entity
        User user = new User();
        user.setFirstName(student.getFirstName());
        user.setLastName(student.getLastName());
        user.setEmail(student.getEmail());
        user.setMobile(student.getMobile());
        user.setDob(student.getDob());
        user.setRole("Student");

        String emailPart = student.getEmail().split("@")[0];
        String mobileLast4 = student.getMobile().substring(student.getMobile().length() - 4);
        String generatedUsername = emailPart + mobileLast4;
        user.setUsername(generatedUsername);

        // 3. Create Keycloak user
        String customPassword = generateCustomPassword(user);
        String keycloakId = keycloakUserService.createUser(
                user.getUsername(),
                customPassword,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );

        // 4. Prepare and send to student-service
        VerifiedStudentDto verifiedStudent = VerifiedStudentDto.fromEntity(student, keycloakId);

        VerifiedStudentDto studentVerifiedResponse = restTemplate.postForObject(
                "http://localhost:8080/api/student/register",
                verifiedStudent,
                VerifiedStudentDto.class
        );

        // 5. Save user only if student registered successfully
        if (studentVerifiedResponse != null && studentVerifiedResponse.getKeycloakId() != null) {
            user.setVerified(true);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Failed to register student in student-service.");
        }

        return customPassword;
    }
}
