package com.portal.portal360.controller;

import com.portal.portal360.model.Empleado;
import com.portal.portal360.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping
    public List<Empleado> getAllEmployees() {
        return empleadoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Empleado> createEmployee(@RequestBody Empleado empleado) {
        return ResponseEntity.ok(empleadoRepository.save(empleado));
    }
}