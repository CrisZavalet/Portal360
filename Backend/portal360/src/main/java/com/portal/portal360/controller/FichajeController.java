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

    @GetMapping("/employee/{idEmployee}")
    public List<Fichaje> getClockingsByEmployee(@PathVariable Integer idEmployee) {
        return fichajeRepository.findByIdEmployee(idEmployee);
    }

    @PostMapping("/check-in")
    public ResponseEntity<?> checkIn(@RequestBody Fichaje fichaje) {
        fichaje.setType(Fichaje.TipoFichaje.ENTRADA);
        fichaje.setStartHour(LocalTime.now());
        fichaje.setDate(LocalDate.now());
        return ResponseEntity.ok(fichajeRepository.save(fichaje));
    }

    @PostMapping("/check-out/{id}")
    public ResponseEntity<?> checkOut(@PathVariable Integer id) {
        return fichajeRepository.findById(id).map(f -> {
            f.setType(Fichaje.TipoFichaje.SALIDA);
            f.setEndHour(LocalTime.now());
            return ResponseEntity.ok(fichajeRepository.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employee/{idEmployee}/range")
    public List<Fichaje> getClockingsByDateRange(
            @PathVariable Integer idEmployee,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return fichajeRepository.findByIdEmployeeAndDateBetween(idEmployee, startDate, endDate);
    }
}