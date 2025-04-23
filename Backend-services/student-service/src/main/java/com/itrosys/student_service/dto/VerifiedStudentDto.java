package com.itrosys.student_service.dto;

import com.itrosys.student_service.entity.Student;
import lombok.Data;

@Data
public class VerifiedStudentDto {
    private Long id;
    private String keycloakId;
    private String name;
    private String email;
    private String branch;
    private String dob;
    private String mobile;
    private String course;
    private String firstName;
    private String lastName;

    // Factory method to build from StudentDTO + keycloakId
    public static VerifiedStudentDto fromEntity (Student student) {
        VerifiedStudentDto dto = new VerifiedStudentDto();
        dto.setKeycloakId(student.getKeycloakId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setName(student.getFirstName() + " " + student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setMobile(student.getMobile());
        dto.setDob(student.getDob());
        dto.setBranch(student.getBranch());
        dto.setCourse(student.getCourse());
        return dto;
    }
}
