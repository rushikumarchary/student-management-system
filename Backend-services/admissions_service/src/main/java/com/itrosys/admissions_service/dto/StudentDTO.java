package com.itrosys.admissions_service.dto;

import com.itrosys.admissions_service.entity.Student;
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


    // Static method to convert Student entity to StudentDTO
    public static StudentDTO fromEntity(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setMobile(student.getMobile());
        dto.setDob(student.getDob());
        dto.setBranch(student.getBranch());
        dto.setCourse(student.getCourse());
        return dto;
    }

}