package com.itrosys.admissions_service.repository;

import com.itrosys.admissions_service.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
