package com.portal.portal360.controller;

import com.portal.portal360.model.Fichaje;
import com.portal.portal360.model.Usuario;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.repository.FichajeRepository;
import com.portal.portal360.repository.UsuarioRepository;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.portal.portal360.dto.KioskLoginResponseDTO;

import java.util.Optional;



@RestController
@RequestMapping("/api/kiosk")
@CrossOrigin(origins = "*")
public class KioskController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private FichajeRepository fichajeRepository;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
    
        return usuarioRepository.findByEmailAndPassword(
                usuario.getEmail(),
                usuario.getPassword())
                .map(u -> empleadoRepository.findByIdUser(u.getIdUsuario().intValue())
                        .<ResponseEntity<?>>map(empleado -> {
    
                            // Obtener el rol del usuario
                            String role = u.getRoles().isEmpty()
                                    ? "SIN_ROL"
                                    : u.getRoles().get(0).getNombreRol();
    
                            // Si es RRHH, no realiza fichaje
                            if ("RRHH".equalsIgnoreCase(role)) {
                                return ResponseEntity.ok(
                                        new KioskLoginResponseDTO(
                                                null,
                                                empleado.getIdEmployee(),
                                                role
                                        )
                                );
                            }
    
                            // Buscar si existe un fichaje abierto
                            Optional<Fichaje> fichajeAbierto =
                                    fichajeRepository
                                            .findFirstByIdEmployeeAndEndHourIsNullOrderByDateDescStartHourDesc(
                                                    empleado.getIdEmployee());
    
                            // Si existe, registrar salida
                            if (fichajeAbierto.isPresent()) {
    
                                Fichaje fichaje = fichajeAbierto.get();
                                fichaje.setEndHour(LocalTime.now());
    
                                fichajeRepository.save(fichaje);
    
                                return ResponseEntity.ok(
                                        new KioskLoginResponseDTO(
                                                "Salida registrada",
                                                empleado.getIdEmployee(),
                                                role
                                        )
                                );
    
                            }
    
                            // Si no existe, registrar entrada
                            Fichaje fichaje = new Fichaje();
                            fichaje.setEmployee(empleado);
                            fichaje.setType(Fichaje.TipoFichaje.ENTRADA);
                            fichaje.setDate(LocalDate.now());
                            fichaje.setStartHour(LocalTime.now());
    
                            fichajeRepository.save(fichaje);
    
                            return ResponseEntity.ok(
                                    new KioskLoginResponseDTO(
                                            "Entrada registrada",
                                            empleado.getIdEmployee(),
                                            role
                                    )
                            );
    
                        })
                        .orElse(ResponseEntity.notFound().build()))
                .orElse(ResponseEntity.status(401).build());
    }
}