package com.portal.portal360.controller;

import com.portal.portal360.dto.EmployeeDTO;
import com.portal.portal360.model.Empleado;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.dto.EmployeeRoleDTO;
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

    // Este es el GET que devuelve la lista de todos los empleados
    @GetMapping("/all")
    public List<Empleado> getAllEmployees() {
        return empleadoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Empleado> createEmployee(@RequestBody Empleado empleado) {
        return ResponseEntity.ok(empleadoRepository.save(empleado));
    }

    @GetMapping
    public List<EmployeeDTO> getEmployees() {

        return empleadoRepository.findAll()
                .stream()
                .map(e -> new EmployeeDTO(
                        e.getIdEmployee(),
                        e.getDni(),
                        e.getName(),
                        e.getLastName(),
                        e.getDateOfBirth(),
                        e.getPhone(),
                        e.getActive()))
                .toList();
    }



    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Integer id) {

        return empleadoRepository.findById(id)
                .map(e -> new EmployeeDTO(
                        e.getIdEmployee(),
                        e.getDni(),
                        e.getName(),
                        e.getLastName(),
                        e.getDateOfBirth(),
                        e.getPhone(),
                        e.getActive()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/roles")
    public List<EmployeeRoleDTO> getEmployeesWithRoles() {
    
        return empleadoRepository.findAll()
                .stream()
                .map(e -> {
    
                    String role = "SIN_ROL";
    
                    if (e.getUsuario() != null &&
                            e.getUsuario().getRoles() != null &&
                            !e.getUsuario().getRoles().isEmpty()) {
    
                        role = e.getUsuario()
                                .getRoles()
                                .get(0)
                                .getNombreRol();
                    }
    
                    return new EmployeeRoleDTO(
                            e.getIdEmployee(),
                            e.getDni(),
                            e.getName(),
                            e.getLastName(),
                            e.getUsuario() != null ? e.getUsuario().getUsername() : null,
                            e.getUsuario() != null ? e.getUsuario().getEmail() : null,
                            e.getDateOfBirth(),
                            e.getPhone(),
                            e.getAddress(),
                            e.getLocation(),
                            e.getIban(),
                            e.getDepartment(),
                            e.getStartDate(),
                            e.getActive(),
                            role
                    );
    
                })
                .toList();
    }
    
}