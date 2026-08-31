package com.portal.portal360.controller;

import com.portal.portal360.dto.EmployeeAllDTO;
import com.portal.portal360.dto.EmployeeDTO;
import com.portal.portal360.model.Empleado;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.dto.EmployeeRoleDTO;
import com.portal.portal360.dto.EmployeeAllDTO;
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
    public ResponseEntity<EmployeeRoleDTO> getEmployeeById(@PathVariable Integer id) {

            return empleadoRepository.findById(id)
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
                                                    role);
                            })
                            .map(ResponseEntity::ok)
                            .orElse(ResponseEntity.notFound().build());
    }

  // =====================================================
// PATCH - Desactivar empleado
// =====================================================

@PatchMapping("/{id}/deactivate")
public ResponseEntity<?> deactivateEmployee(
        @PathVariable Integer id) {

    return empleadoRepository.findById(id)
            .map(employee -> {

                employee.setActive(false);

                Empleado employeeUpdated =
                        empleadoRepository.save(employee);

                return ResponseEntity.ok(employeeUpdated);

            })
            .orElse(ResponseEntity.notFound().build());
}


// =====================================================
// PATCH - Activar empleado
// =====================================================

@PatchMapping("/{id}/activate")
public ResponseEntity<?> activateEmployee(
        @PathVariable Integer id) {

    return empleadoRepository.findById(id)
            .map(employee -> {

                employee.setActive(true);

                Empleado employeeUpdated =
                        empleadoRepository.save(employee);

                return ResponseEntity.ok(employeeUpdated);

            })
            .orElse(ResponseEntity.notFound().build());
}

    @GetMapping("/roles")
    public List<EmployeeRoleDTO> getEmployeesWithRoles() {
    
        return empleadoRepository.findAll()
                .stream()
                .map(e -> {
    
                    // Rol
                    String role = "SIN_ROL";
    
                    if (e.getUsuario() != null &&
                            e.getUsuario().getRoles() != null &&
                            !e.getUsuario().getRoles().isEmpty()) {
    
                        role = e.getUsuario()
                                .getRoles()
                                .get(0)
                                .getNombreRol();
                    }
    
                    // Puesto actual
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
                            e.getUsuario() != null ? e.getUsuario().getUsername() : null,
                            e.getUsuario() != null ? e.getUsuario().getEmail() : null,
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