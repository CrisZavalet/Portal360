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
            .map(u ->

                empleadoRepository.findByIdUser(u.getIdUsuario().intValue())
                        .<ResponseEntity<?>>map(empleado -> {

                            Optional<Fichaje> fichajeAbierto =
                                    fichajeRepository.findFirstByIdEmployeeAndEndHourIsNullOrderByDateDescStartHourDesc(
                                            empleado.getIdEmployee());

                            if (fichajeAbierto.isPresent()) {

                                // Registrar salida
                                Fichaje fichaje = fichajeAbierto.get();
                                fichaje.setEndHour(LocalTime.now());

                            fichajeRepository.save(fichaje);
                            String role = u.getRoles().isEmpty()
                            ? "SIN_ROL"
                            : u.getRoles().get(0).getNombreRol();

                                return ResponseEntity.ok(
                                    new KioskLoginResponseDTO(
                                        "Salida registrada",
                                        empleado.getIdEmployee(),
                                        u.getRoles().get(0).getNombreRol()
                                    )
                                );

                            } else {

                                // Registrar entrada
                                Fichaje fichaje = new Fichaje();
                                fichaje.setEmployee(empleado);
                                fichaje.setType(Fichaje.TipoFichaje.ENTRADA);
                                fichaje.setDate(LocalDate.now());
                                fichaje.setStartHour(LocalTime.now());

                                fichajeRepository.save(fichaje);

                                String role = u.getRoles().isEmpty()
        ? "SIN_ROL"
        : u.getRoles().get(0).getNombreRol();
                                return ResponseEntity.ok(
                                    new KioskLoginResponseDTO(
                                        "Salida registrada",
                                        empleado.getIdEmployee(),
                                        u.getRoles().get(0).getNombreRol()
                                    )
                                );
                            }

                        })
                        .orElse(ResponseEntity.notFound().build())

            )
            .orElse(ResponseEntity.status(401).build());
}


}