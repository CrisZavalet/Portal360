package com.portal.portal360.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.portal.portal360.dto.CreateEmployeeDTO;
import com.portal.portal360.model.Empleado;
import com.portal.portal360.model.EmpleadoPuesto;
import com.portal.portal360.model.Puesto;
import com.portal.portal360.model.Rol;
import com.portal.portal360.model.Usuario;

import com.portal.portal360.repository.EmpleadoPuestoRepository;
import com.portal.portal360.repository.PuestoRepository;
import com.portal.portal360.repository.RolRepository;
import com.portal.portal360.repository.UsuarioRepository;

import com.portal.portal360.dto.CreateEmployeeDTO;
import com.portal.portal360.dto.EmployeeAllDTO;
import com.portal.portal360.dto.EmployeeDTO;
import com.portal.portal360.model.Empleado;
import com.portal.portal360.model.EmpleadoPuesto;
import com.portal.portal360.model.Puesto;
import com.portal.portal360.model.Rol;
import com.portal.portal360.model.Usuario;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.repository.PuestoRepository;
import com.portal.portal360.repository.RolRepository;
import com.portal.portal360.repository.UsuarioRepository;
import com.portal.portal360.dto.EmployeeRoleDTO;
import com.portal.portal360.dto.EmployeeAllDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.portal.portal360.repository.EmpleadoPuestoRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.portal.portal360.dto.ChangePasswordDTO;
import com.portal.portal360.model.Empleado;
import com.portal.portal360.model.Usuario;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

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

    private String generarUsername(
        String nombre,
        String apellidos) {

    String primeraParte =
            nombre.trim().toLowerCase();

    String apellidoLimpio =
            apellidos.trim().toLowerCase();

    String segundaParte =
            apellidoLimpio.length() >= 2
                    ? apellidoLimpio.substring(0, 2)
                    : apellidoLimpio;

    String username =
            primeraParte + segundaParte;

    username = java.text.Normalizer
            .normalize(
                    username,
                    java.text.Normalizer.Form.NFD
            )
            .replaceAll("\\p{M}", "");

    username = username
            .replaceAll("[^a-zA-Z0-9]", "");

    return username;
}
    

@Autowired
private UsuarioRepository usuarioRepository;

@Autowired
private RolRepository rolRepository;

@Autowired
private PuestoRepository puestoRepository;


@Autowired
private EmpleadoPuestoRepository empleadoPuestoRepository;

@Autowired
private PasswordEncoder passwordEncoder;

@PostMapping("/create-full")
@Transactional
public ResponseEntity<?> createFullEmployee(
                @RequestBody CreateEmployeeDTO dto) {

        try {

                // ============================
                // 1. VALIDACIONES
                // ============================

                if (dto.getName() == null || dto.getName().isBlank()) {
                        return ResponseEntity.badRequest()
                                        .body("El nombre es obligatorio");
                }

                if (dto.getLastName() == null || dto.getLastName().isBlank()) {
                        return ResponseEntity.badRequest()
                                        .body("Los apellidos son obligatorios");
                }

                if (dto.getDni() == null || dto.getDni().isBlank()) {
                        return ResponseEntity.badRequest()
                                        .body("El DNI es obligatorio");
                }

                if (dto.getEmail() == null || dto.getEmail().isBlank()) {
                        return ResponseEntity.badRequest()
                                        .body("El email es obligatorio");
                }

                if (dto.getPassword() == null || dto.getPassword().isBlank()) {
                        return ResponseEntity.badRequest()
                                        .body("La contraseña es obligatoria");
                }

                if (dto.getIdRole() == null) {
                        return ResponseEntity.badRequest()
                                        .body("El rol es obligatorio");
                }

                if (dto.getIdPosition() == null) {
                        return ResponseEntity.badRequest()
                                        .body("El puesto es obligatorio");
                }

                if (empleadoRepository.existsByDni(dto.getDni())) {
                        return ResponseEntity.badRequest()
                                        .body("Ya existe un empleado con ese DNI");
                }

                if (usuarioRepository.existsByEmail(dto.getEmail())) {
                        return ResponseEntity.badRequest()
                                        .body("Ya existe un usuario con ese email");
                }

                // ============================
                // 2. BUSCAR ROL
                // ============================

                Rol rol = rolRepository.findById(dto.getIdRole())
                                .orElse(null);

                if (rol == null) {
                        return ResponseEntity.badRequest()
                                        .body("El rol indicado no existe");
                }

                // ============================
                // 3. BUSCAR PUESTO
                // ============================

                Puesto puesto = puestoRepository.findById(dto.getIdPosition())
                                .orElse(null);

                if (puesto == null) {
                        return ResponseEntity.badRequest()
                                        .body("El puesto indicado no existe");
                }

                // ============================
                // 4. GENERAR USERNAME
                // ============================

                String username = generarUsername(
                                dto.getName(),
                                dto.getLastName());

                // Evitar username duplicado
                String usernameBase = username;
                int contador = 1;

                while (usuarioRepository.existsByUsername(username)) {
                        username = usernameBase + contador;
                        contador++;
                }

                // ============================
                // 5. CREAR USUARIO
                // ============================

                Usuario usuario = new Usuario();

                usuario.setEmail(dto.getEmail());
                usuario.setUsername(username);

                usuario.setPassword(
                                passwordEncoder.encode(dto.getPassword()));

                usuario.setActivo(
                                dto.getActive() != null
                                                ? dto.getActive()
                                                : true);

                usuario.setRoles(List.of(rol));

                Usuario usuarioGuardado = usuarioRepository.save(usuario);

                // ============================
                // 6. CREAR EMPLEADO
                // ============================

                Empleado empleado = new Empleado();

                empleado.setName(dto.getName());
                empleado.setLastName(dto.getLastName());

                empleado.setDni(dto.getDni());

                empleado.setAddress(dto.getAddress());
                empleado.setPhone(dto.getPhone());

                empleado.setDateOfBirth(dto.getDateOfBirth());

                empleado.setLocation(dto.getLocation());
                empleado.setIban(dto.getIban());

                empleado.setStartDate(dto.getStartDate());

                empleado.setActive(
                                dto.getActive() != null
                                                ? dto.getActive()
                                                : true);

                empleado.setIdUser(
                                usuarioGuardado.getIdUsuario());

                Empleado empleadoGuardado = empleadoRepository.save(empleado);

                // ============================
                // 7. ASIGNAR PUESTO
                // ============================

                EmpleadoPuesto empleadoPuesto = new EmpleadoPuesto();

                empleadoPuesto.setEmployee(empleadoGuardado);
                empleadoPuesto.setPuesto(puesto);
                empleadoPuesto.setFechaInicio(dto.getStartDate());
                empleadoPuesto.setFechaFin(null);

                empleadoPuestoRepository.save(empleadoPuesto);

                // ============================
                // 8. RESPUESTA
                // ============================

                Map<String, Object> response = new HashMap<>();

                response.put(
                                "message",
                                "Empleado creado correctamente");

                response.put(
                                "idEmployee",
                                empleadoGuardado.getIdEmployee());

                response.put(
                                "idUser",
                                usuarioGuardado.getIdUsuario());

                response.put(
                                "name",
                                empleadoGuardado.getName());

                response.put(
                                "lastName",
                                empleadoGuardado.getLastName());

                response.put(
                                "email",
                                usuarioGuardado.getEmail());

                response.put(
                                "username",
                                usuarioGuardado.getUsername());

                response.put(
                                "role",
                                rol.getNombreRol());

                response.put(
                                "position",
                                puesto.getNombre());

                response.put(
                                "active",
                                empleadoGuardado.getActive());

                return ResponseEntity.ok(response);

        } catch (Exception e) {

                return ResponseEntity
                                .internalServerError()
                                .body(
                                                "Error al crear el empleado: "
                                                                + e.getMessage());
        }
}

@PatchMapping("/{idEmployee}/change-password")
@Transactional
public ResponseEntity<?> changePassword(
        @PathVariable Integer idEmployee,
        @RequestBody ChangePasswordDTO dto) {

    try {

        // 1. Buscar empleado
        Empleado empleado = empleadoRepository
                .findById(idEmployee)
                .orElse(null);

        if (empleado == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }


        // 2. Comprobar que tiene usuario asociado
        if (empleado.getIdUser() == null) {

            return ResponseEntity
                    .badRequest()
                    .body("El empleado no tiene un usuario asociado");
        }


        // 3. Buscar usuario
        Usuario usuario = usuarioRepository
                .findById(empleado.getIdUser())
                .orElse(null);

        if (usuario == null) {

            return ResponseEntity
                    .badRequest()
                    .body("No se encontró el usuario asociado");
        }


        // 4. Validar contraseña actual
        if (dto.getCurrentPassword() == null ||
            dto.getCurrentPassword().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("La contraseña actual es obligatoria");
        }


        // 5. Validar nueva contraseña
        if (dto.getNewPassword() == null ||
            dto.getNewPassword().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("La nueva contraseña es obligatoria");
        }


        // 6. Validar confirmación
        if (dto.getConfirmPassword() == null ||
            dto.getConfirmPassword().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Debe confirmar la nueva contraseña");
        }


        // 7. Comprobar que coinciden
        if (!dto.getNewPassword()
                .equals(dto.getConfirmPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body("Las nuevas contraseñas no coinciden");
        }


        // 8. Comprobar contraseña actual con BCrypt
        boolean passwordCorrecta =
                passwordEncoder.matches(
                        dto.getCurrentPassword(),
                        usuario.getPassword()
                );

        if (!passwordCorrecta) {

            return ResponseEntity
                    .badRequest()
                    .body("La contraseña actual es incorrecta");
        }


        // 9. Comprobar longitud mínima
        if (dto.getNewPassword().length() < 8) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        "La nueva contraseña debe tener al menos 8 caracteres"
                    );
        }


        // 10. No permitir misma contraseña
        if (passwordEncoder.matches(
                dto.getNewPassword(),
                usuario.getPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        "La nueva contraseña no puede ser igual a la actual"
                    );
        }


        // 11. Encriptar nueva contraseña
        String nuevaPasswordHash =
                passwordEncoder.encode(
                        dto.getNewPassword()
                );


        // 12. Guardarla en usuario
        usuario.setPassword(
                nuevaPasswordHash
        );

        usuarioRepository.save(usuario);


        // 13. Respuesta simple
        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Contraseña actualizada correctamente"
        );

        response.put(
                "idEmployee",
                empleado.getIdEmployee()
        );

        response.put(
                "idUser",
                usuario.getIdUsuario()
        );

        return ResponseEntity.ok(response);


    } catch (Exception e) {

        return ResponseEntity
                .internalServerError()
                .body(
                    "Error al cambiar la contraseña: "
                    + e.getMessage()
                );
    }
}

}