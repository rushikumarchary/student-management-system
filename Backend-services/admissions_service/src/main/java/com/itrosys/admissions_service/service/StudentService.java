package com.itrosys.admissions_service.service;


import com.itrosys.admissions_service.dto.StudentDTO;
import com.itrosys.admissions_service.entity.Student;
import com.itrosys.admissions_service.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public Student save(Student student) {
        return repository.save(student);
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public StudentDTO getById(Long id) {


        Student student = repository.findById(id).orElseThrow();
        StudentDTO dto = StudentDTO.fromEntity(student);

        return dto;

    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}