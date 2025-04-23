package com.itrosys.student_service.service;

import com.itrosys.student_service.dto.VerifiedStudentDto;
import com.itrosys.student_service.entity.Student;
import com.itrosys.student_service.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public VerifiedStudentDto save(Student student) {
        Student savedStudent = repository.save(student);
        VerifiedStudentDto dto = VerifiedStudentDto.fromEntity(savedStudent);
        return dto;
    }

    public Student getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Student> getAll() {
        return repository.findAll();
    }
}
