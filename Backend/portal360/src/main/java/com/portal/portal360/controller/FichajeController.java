package com.portal.portal360.controller;

import com.portal.portal360.model.Fichaje;
import com.portal.portal360.repository.EmpleadoRepository;
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
    @Autowired
private EmpleadoRepository empleadoRepository;

    @GetMapping
    public List<Fichaje> getAllClockings() {
        return fichajeRepository.findAll();
    }

    @GetMapping("/employee/{idEmployee}")
    public List<Fichaje> getClockingsByEmployee(@PathVariable Integer idEmployee) {
        return fichajeRepository.findByIdEmployee(idEmployee);
    }

    @PostMapping("/check-in/{idEmployee}")
    public ResponseEntity<?> checkIn(@PathVariable Integer idEmployee) {
    
        return empleadoRepository.findById(idEmployee)
                .map(empleado -> {
    
                    Fichaje fichaje = new Fichaje();
                    fichaje.setEmployee(empleado);
                    fichaje.setType(Fichaje.TipoFichaje.ENTRADA);
                    fichaje.setDate(LocalDate.now());
                    fichaje.setStartHour(LocalTime.now());
    
                    return ResponseEntity.ok(fichajeRepository.save(fichaje));
    
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/check-out/{idEmployee}")
    public ResponseEntity<?> checkOut(@PathVariable Integer idEmployee) {
    
        return fichajeRepository
                .findFirstByIdEmployeeAndEndHourIsNullOrderByDateDescStartHourDesc(idEmployee)
                .map(fichaje -> {
                    fichaje.setType(Fichaje.TipoFichaje.SALIDA);
                    fichaje.setEndHour(LocalTime.now());
    
                    return ResponseEntity.ok(fichajeRepository.save(fichaje));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/employee/{idEmployee}/range")
    public List<Fichaje> getClockingsByDateRange(
            @PathVariable Integer idEmployee,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return fichajeRepository.findByIdEmployeeAndDateBetween(idEmployee, startDate, endDate);
    }
}