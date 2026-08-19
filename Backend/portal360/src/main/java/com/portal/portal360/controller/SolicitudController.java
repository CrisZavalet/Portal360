package com.portal.portal360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.portal.portal360.dto.SolicitudRequestDTO;
import com.portal.portal360.model.Solicitud;
import com.portal.portal360.repository.SolicitudRepository;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class SolicitudController {

    @Autowired
    private SolicitudRepository solicitudRepository;


    // =====================================================
    // GET - Todas las solicitudes
    // =====================================================

    @GetMapping("/all")
    public List<Solicitud> getAll() {

        return solicitudRepository.findAll();
    }


    // =====================================================
    // GET - Solicitud por ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Solicitud> getById(
            @PathVariable Integer id) {

        return solicitudRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // =====================================================
// GET - Solicitudes de un empleado
// =====================================================

@GetMapping("/employee/{idEmployee}")
public ResponseEntity<List<Solicitud>> getRequestsByEmployee(
        @PathVariable Integer idEmployee) {

    List<Solicitud> solicitudes =
            solicitudRepository.findByIdEmployee(idEmployee);

    return ResponseEntity.ok(solicitudes);
}


    // =====================================================
    // POST - Crear solicitud
    // =====================================================

    @PostMapping("/create")
    public ResponseEntity<?> crearSolicitud(
            @RequestBody SolicitudRequestDTO dto) {

        try {

            // =================================================
            // VALIDAR TIPO DE SOLICITUD
            // =================================================

            if (dto.getIdType() == null) {

                return ResponseEntity.badRequest()
                        .body("El tipo de solicitud es obligatorio");
            }


            // =================================================
            // VALIDAR DURACIÓN
            // =================================================

            if (dto.getDurationType() == null ||
                dto.getDurationType().isBlank()) {

                return ResponseEntity.badRequest()
                        .body("El tipo de duración es obligatorio");
            }


            // =================================================
            // VALIDAR FECHA DE INICIO
            // =================================================

            if (dto.getStartDate() == null) {

                return ResponseEntity.badRequest()
                        .body("La fecha de inicio es obligatoria");
            }


            // =================================================
            // CREAR SOLICITUD
            // =================================================

            Solicitud solicitud = new Solicitud();


            // =================================================
            // EMPLEADO
            // =================================================

            // Temporalmente usamos el empleado 2.
            // Posteriormente lo obtendremos del usuario autenticado.

            solicitud.setIdEmployee(dto.getIdEmployee());


            // =================================================
            // TIPO
            // =================================================

            solicitud.setIdType(dto.getIdType());


            // =================================================
            // ESTADO
            // =================================================

            // 1 = Pendiente

            solicitud.setIdState(1);


            // =================================================
            // COMENTARIO
            // =================================================

            solicitud.setDescription(dto.getComments());


            // =================================================
            // DURACIÓN
            // =================================================

            switch (dto.getDurationType()) {


                // =============================================
                // HORAS
                // =============================================

                case "HORAS":

                    if (dto.getStartTime() == null ||
                        dto.getEndTime() == null) {

                        return ResponseEntity.badRequest()
                                .body(
                                    "Para una solicitud por horas debes indicar " +
                                    "la hora de inicio y la hora de fin"
                                );
                    }

                    solicitud.setStartDate(dto.getStartDate());

                    solicitud.setEndDate(dto.getStartDate());

                    solicitud.setStartTime(dto.getStartTime());

                    solicitud.setEndTime(dto.getEndTime());

                    break;


                // =============================================
                // UN DÍA
                // =============================================

                case "UN_DIA":

                    solicitud.setStartDate(dto.getStartDate());

                    solicitud.setEndDate(dto.getStartDate());

                    solicitud.setStartTime(null);

                    solicitud.setEndTime(null);

                    break;


                // =============================================
                // VARIOS DÍAS
                // =============================================

                case "VARIOS_DIAS":

                    if (dto.getEndDate() == null) {

                        return ResponseEntity.badRequest()
                                .body(
                                    "Para una solicitud de varios días " +
                                    "debes indicar la fecha de fin"
                                );
                    }


                    if (dto.getEndDate()
                            .isBefore(dto.getStartDate())) {

                        return ResponseEntity.badRequest()
                                .body(
                                    "La fecha de fin no puede ser " +
                                    "anterior a la fecha de inicio"
                                );
                    }


                    solicitud.setStartDate(dto.getStartDate());

                    solicitud.setEndDate(dto.getEndDate());

                    solicitud.setStartTime(null);

                    solicitud.setEndTime(null);

                    break;


                // =============================================
                // DURACIÓN NO VÁLIDA
                // =============================================

                default:

                    return ResponseEntity.badRequest()
                            .body(
                                "durationType debe ser HORAS, " +
                                "UN_DIA o VARIOS_DIAS"
                            );
            }


            // =================================================
            // GUARDAR
            // =================================================

            Solicitud solicitudGuardada =
                    solicitudRepository.save(solicitud);


            // =================================================
            // RESPUESTA
            // =================================================

            return ResponseEntity.ok(solicitudGuardada);


        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                        "Error al crear la solicitud: "
                        + e.getMessage()
                    );
        }
    }
}