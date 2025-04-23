package com.itrosys.student_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

}
