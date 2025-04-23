package com.itrosys.student_service.repository;

import com.itrosys.student_service.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByKeycloakId(String keycloakId);
}

