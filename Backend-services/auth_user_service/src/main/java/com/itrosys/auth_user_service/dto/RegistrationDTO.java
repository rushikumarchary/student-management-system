package com.itrosys.auth_user_service.dto;

import com.itrosys.auth_user_service.entity.Role;
import lombok.Data;

@Data
public class RegistrationDTO {
    private String uid;
    private String name;
    private String email;
    private String phone;
    private Role role;

    private String branch;       // for students
    private String designation;  // for faculty
    private String department;
    private String address;
}

