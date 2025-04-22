package com.itrosys.admin_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestUser {


    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String dob;
    private String role;
}
