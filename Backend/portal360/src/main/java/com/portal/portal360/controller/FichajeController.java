package com.portal.portal360.controller;

import com.portal.portal360.model.Fichaje;
import com.portal.portal360.repository.FichajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/fichaje")
public class FichajeController {

    @Autowired
    private FichajeRepository fichajeRepository;

    @PostMapping("/entrada")
    public ResponseEntity<?> entrada(@RequestBody Fichaje fichaje) {
        fichaje.setTipo(Fichaje.TipoFichaje.ENTRADA);
        fichaje.setHoraInicio(LocalTime.now());
        fichaje.setFecha(LocalDate.now());
        return ResponseEntity.ok(fichajeRepository.save(fichaje));
    }

    @PostMapping("/salida/{id}")
    public ResponseEntity<?> salida(@PathVariable Integer id) {
        return fichajeRepository.findById(id).map(f -> {
            f.setTipo(Fichaje.TipoFichaje.SALIDA);
            f.setHoraFin(LocalTime.now());
            return ResponseEntity.ok(fichajeRepository.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/historial/{empleadoId}")
    public List<Fichaje> historial(@PathVariable Integer empleadoId) {
        return fichajeRepository.findByEmpleado_IdEmpleado(empleadoId);
    }

    @GetMapping
    public List<Fichaje> getAllFichajes() {
        return fichajeRepository.findAll();
    }
}