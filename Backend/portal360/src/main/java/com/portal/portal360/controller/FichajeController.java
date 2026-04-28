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
@RequestMapping("/api/clockings")
@CrossOrigin(origins = "*")
public class FichajeController {

    @Autowired
    private FichajeRepository fichajeRepository;

    @GetMapping
    public List<Fichaje> getAllClockings() {
        return fichajeRepository.findAll();
    }

    @GetMapping("/employee/{empleadoId}")
    public List<Fichaje> getClockingsByEmployee(@PathVariable Integer empleadoId) {
        return fichajeRepository.findByEmpleado_IdEmpleado(empleadoId);
    }

    @PostMapping("/check-in")
    public ResponseEntity<?> checkIn(@RequestBody Fichaje fichaje) {
        fichaje.setTipo(Fichaje.TipoFichaje.ENTRADA);
        fichaje.setHoraInicio(LocalTime.now());
        fichaje.setFecha(LocalDate.now());
        return ResponseEntity.ok(fichajeRepository.save(fichaje));
    }

    @PostMapping("/check-out/{id}")
    public ResponseEntity<?> checkOut(@PathVariable Integer id) {
        return fichajeRepository.findById(id).map(f -> {
            f.setTipo(Fichaje.TipoFichaje.SALIDA);
            f.setHoraFin(LocalTime.now());
            return ResponseEntity.ok(fichajeRepository.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employee/{empleadoId}/range")
    public List<Fichaje> getClockingsByDateRange(
            @PathVariable Integer empleadoId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return fichajeRepository.findByEmpleado_IdEmpleadoAndFechaBetween(empleadoId, startDate, endDate);
    }
}