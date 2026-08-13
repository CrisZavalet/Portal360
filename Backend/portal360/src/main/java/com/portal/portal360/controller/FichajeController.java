package com.portal.portal360.controller;

import com.portal.portal360.model.Fichaje;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.repository.FichajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.portal.portal360.dto.ClockingHistoryDTO;
import com.portal.portal360.dto.ClockingResponseDTO;
import com.portal.portal360.dto.ClockingTodayDTO;
import com.portal.portal360.dto.ClockingAllHistoryDTO;
import com.portal.portal360.dto.ClockingApprovalDTO;
import com.portal.portal360.dto.ClockingApprovalResponseDTO;

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

    @GetMapping("/history")
public List<ClockingAllHistoryDTO> getAllHistory() {

    return fichajeRepository.findAllHistory()
            .stream()
            .map(f -> new ClockingAllHistoryDTO(
                    f.getIdFichaje(),
                    f.getEmployee().getIdEmployee(),
                    f.getEmployee().getName(),
                    f.getEmployee().getLastName(),
                    f.getDate(),
                    f.getStartHour(),
                    f.getEndHour(),
                    f.getEndHour() == null ? "EN_CURSO" : "FINALIZADO"
            ))
            .toList();
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

                // Nuevo fichaje = todavía no aprobado
                fichaje.setAprobado(null);

                Fichaje fichajeGuardado = fichajeRepository.save(fichaje);

                ClockingResponseDTO response = new ClockingResponseDTO(
                        fichajeGuardado.getIdFichaje(),
                        empleado.getIdEmployee(),
                        empleado.getName(),
                        empleado.getLastName(),
                        fichajeGuardado.getDate(),
                        fichajeGuardado.getStartHour(),
                        fichajeGuardado.getEndHour(),
                        fichajeGuardado.getAprobado(),
                        "EN_CURSO"
                );

                return ResponseEntity.ok(response);

            })
            .orElse(ResponseEntity.notFound().build());
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

   @GetMapping("/employee/{idEmployee}/history")
public List<ClockingHistoryDTO> getClockingHistory(@PathVariable Integer idEmployee) {

    return fichajeRepository
            .findByIdEmployeeOrderByDateDescStartHourDesc(idEmployee)
            .stream()
            .map(f -> new ClockingHistoryDTO(
                    f.getIdFichaje(),
                    f.getDate(),
                    f.getStartHour(),
                    f.getEndHour(),
                    f.getEndHour() == null ? "EN_CURSO" : "FINALIZADO",
                    f.getAprobado()
            ))
            .toList();
}
    @GetMapping("/today")
    public List<ClockingTodayDTO> getTodayClockings() {

        return fichajeRepository.findTodayClockings(LocalDate.now())
                .stream()
                .map(f -> new ClockingTodayDTO(
                        f.getEmployee().getIdEmployee(),
                        f.getEmployee().getName(),
                        f.getEmployee().getLastName(),
                        f.getStartHour(),
                        f.getEndHour(),
                        f.getEndHour() == null,
                        f.getAprobado()))
                .toList();

    }


    @PutMapping("/{idFichaje}/approval")
    public ResponseEntity<?> updateApproval(
            @PathVariable Integer idFichaje,
            @RequestBody ClockingApprovalDTO request) {
    
        // Validar que, si viene informado, sea un estado válido
        if (request.getAprobado() != null &&
                !request.getAprobado().equals("APROBADO") &&
                !request.getAprobado().equals("NO_APROBADO")) {
    
            return ResponseEntity.badRequest().body(
                    "El campo aprobado debe ser APROBADO, NO_APROBADO o null"
            );
        }
    
        return fichajeRepository.findById(idFichaje)
                .map(fichaje -> {
    
                    fichaje.setAprobado(request.getAprobado());
    
                    Fichaje actualizado = fichajeRepository.save(fichaje);
    
                    ClockingApprovalResponseDTO response =
                            new ClockingApprovalResponseDTO(
                                    actualizado.getIdFichaje(),
                                    actualizado.getAprobado()
                            );
    
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}