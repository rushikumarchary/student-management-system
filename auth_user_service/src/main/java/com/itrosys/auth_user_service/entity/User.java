package com.itrosys.auth_user_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String uid; // Firebase UID

    private String name;

    @Column(unique = true)
    private String email;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN, FACULTY, STUDENT

    private boolean approved = false;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "faculty_info_id")
    private FacultyInfo facultyInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_info_id")
    private StudentInfo studentInfo;
}

