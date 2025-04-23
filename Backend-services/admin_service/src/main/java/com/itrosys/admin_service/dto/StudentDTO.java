package com.itrosys.admin_service.dto;

import lombok.Data;

@Data
public class StudentDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String dob;
    private String branch;
    private String course;

}