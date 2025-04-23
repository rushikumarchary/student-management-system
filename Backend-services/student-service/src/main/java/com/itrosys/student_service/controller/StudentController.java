package com.itrosys.student_service.controller;

import com.itrosys.student_service.dto.VerifiedStudentDto;
import com.itrosys.student_service.entity.Student;
import com.itrosys.student_service.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<VerifiedStudentDto> registerStudent(@RequestBody Student student) {

        return ResponseEntity.ok(service.save(student));
    }

    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping
    public List<Student> getAll() {
        return service.getAll();
    }
}

