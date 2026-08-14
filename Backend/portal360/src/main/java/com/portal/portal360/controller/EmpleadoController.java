package com.portal.portal360.controller;

import com.portal.portal360.dto.EmployeeAllDTO;
import com.portal.portal360.dto.EmployeeDTO;
import com.portal.portal360.dto.EmployeeRoleDTO;
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


    // =========================================================
    // GET - TODOS LOS EMPLEADOS
    // =========================================================

    @GetMapping("/all")
    public List<EmployeeAllDTO> getAllEmployees() {

        return empleadoRepository.findAll()
                .stream()
                .map(e -> new EmployeeAllDTO(
                        e.getIdEmployee(),
                        e.getDni(),
                        e.getName(),
                        e.getLastName(),
                        e.getDateOfBirth(),
                        e.getPhone(),
                        e.getAddress(),
                        e.getLocation(),
                        e.getIban(),
                        e.getDepartment(),
                        e.getStartDate(),
                        e.getActive()
                ))
                .toList();
    }


    // =========================================================
    // POST - CREAR EMPLEADO
    // =========================================================

    @PostMapping
    public ResponseEntity<Empleado> createEmployee(
            @RequestBody Empleado empleado) {

        return ResponseEntity.ok(
                empleadoRepository.save(empleado)
        );
    }


    // =========================================================
    // GET - LISTA SIMPLE DE EMPLEADOS
    // =========================================================

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
                        e.getActive()
                ))
                .toList();
    }


    // =========================================================
    // GET - EMPLEADO POR ID
    // GET /api/employees/id/2
    // =========================================================

    @GetMapping("/id/{idEmployee}")
    public ResponseEntity<EmployeeRoleDTO> getEmployeeById(
            @PathVariable Integer idEmployee) {

        return empleadoRepository.findById(idEmployee)
                .map(e -> {

                    // -----------------------------
                    // Obtener ROLE
                    // -----------------------------

                    String role = "SIN_ROL";

                    if (e.getUsuario() != null &&
                            e.getUsuario().getRoles() != null &&
                            !e.getUsuario().getRoles().isEmpty()) {

                        role = e.getUsuario()
                                .getRoles()
                                .get(0)
                                .getNombreRol();
                    }


                    // -----------------------------
                    // Obtener PUESTO ACTUAL
                    // -----------------------------

                    String position = "SIN_PUESTO";

                    if (e.getEmployeePositions() != null) {

                        position = e.getEmployeePositions()
                                .stream()
                                .filter(ep -> ep.getFechaFin() == null)
                                .map(ep -> ep.getPuesto().getNombre())
                                .findFirst()
                                .orElse("SIN_PUESTO");
                    }


                    // -----------------------------
                    // Crear DTO
                    // -----------------------------

                    EmployeeRoleDTO dto = new EmployeeRoleDTO(

                            e.getIdEmployee(),

                            e.getDni(),

                            e.getName(),

                            e.getLastName(),

                            e.getUsuario() != null
                                    ? e.getUsuario().getUsername()
                                    : null,

                            e.getUsuario() != null
                                    ? e.getUsuario().getEmail()
                                    : null,

                            e.getDateOfBirth(),

                            e.getPhone(),

                            e.getAddress(),

                            e.getLocation(),

                            e.getIban(),

                            e.getDepartment(),

                            e.getStartDate(),

                            position,

                            e.getActive(),

                            role
                    );

                    return dto;
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // =========================================================
    // GET - TODOS LOS EMPLEADOS CON ROLE Y PUESTO
    // GET /api/employees/roles
    // =========================================================

    @GetMapping("/roles")
    public List<EmployeeRoleDTO> getEmployeesWithRoles() {

        return empleadoRepository.findAll()
                .stream()
                .map(e -> {

                    // -----------------------------
                    // Obtener ROLE
                    // -----------------------------

                    String role = "SIN_ROL";

                    if (e.getUsuario() != null &&
                            e.getUsuario().getRoles() != null &&
                            !e.getUsuario().getRoles().isEmpty()) {

                        role = e.getUsuario()
                                .getRoles()
                                .get(0)
                                .getNombreRol();
                    }


                    // -----------------------------
                    // Obtener PUESTO ACTUAL
                    // -----------------------------

                    String position = "SIN_PUESTO";

                    if (e.getEmployeePositions() != null) {

                        position = e.getEmployeePositions()
                                .stream()
                                .filter(ep -> ep.getFechaFin() == null)
                                .map(ep -> ep.getPuesto().getNombre())
                                .findFirst()
                                .orElse("SIN_PUESTO");
                    }


                    return new EmployeeRoleDTO(

                            e.getIdEmployee(),

                            e.getDni(),

                            e.getName(),

                            e.getLastName(),

                            e.getUsuario() != null
                                    ? e.getUsuario().getUsername()
                                    : null,

                            e.getUsuario() != null
                                    ? e.getUsuario().getEmail()
                                    : null,

                            e.getDateOfBirth(),

                            e.getPhone(),

                            e.getAddress(),

                            e.getLocation(),

                            e.getIban(),

                            e.getDepartment(),

                            e.getStartDate(),

                            position,

                            e.getActive(),

                            role
                    );

                })
                .toList();
    }
}