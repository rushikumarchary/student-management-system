package com.itrosys.admissions_service.controller;


import com.itrosys.admissions_service.dto.StudentDTO;
import com.itrosys.admissions_service.entity.Student;
import com.itrosys.admissions_service.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionsController {

    private final StudentService service;

    public AdmissionsController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/student/register")
    public Student register(@RequestBody Student student) {
        return service.save(student);
    }

    @GetMapping
    public List<Student> getAll() {
        return service.getAll();
    }

    @GetMapping("/student/{id}")
    public StudentDTO getById(@PathVariable Long id) {

        return service.getById(id);
    }

    @DeleteMapping("/student/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}

