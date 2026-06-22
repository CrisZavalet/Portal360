package com.portal.portal360.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portal.portal360.dto.EventoCalendarioDTO;
import com.portal.portal360.dto.SolicitudRequestDTO;
import com.portal.portal360.repository.ArchivoRepository;
import com.portal.portal360.repository.SolicitudAdjuntoRepository;
import com.portal.portal360.model.Archivo;
import com.portal.portal360.model.Solicitud;
import com.portal.portal360.model.SolicitudAdjunto;
import com.portal.portal360.repository.SolicitudRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")

public class SolicitudController {

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    private ArchivoRepository archivoRepository;

    @Autowired
    private SolicitudAdjuntoRepository solicitudAdjuntoRepository;

    // Este es el GET que devuelve la lista de todas las solicitudes
    @GetMapping("/all")
    public List<Solicitud> getAll() {
        return solicitudRepository.findAll();
    }

    @GetMapping("/calendar/me")
    public ResponseEntity<Map<String, Object>> getCalendario(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer idEmployee) { 

        int yearSearch = (year == null) ? LocalDate.now().getYear() : year;

        // Si no viene ID, usamos el 2 que es el empleado de ejemplo. En un caso real, se obtendría del token de autenticación.
        Integer idFiltro = (idEmployee == null) ? 2 : idEmployee;

        List<EventoCalendarioDTO> events = solicitudRepository.findEventosByEmployeeAndYear(idFiltro, yearSearch);

        Map<String, Object> response = new HashMap<>();
        response.put("year", yearSearch);
        response.put("events", events);

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/create", consumes = { "multipart/form-data" }) // OJO: Esta API habría que mirarla bien
    @Transactional // IMPORTANTE: Si algo falla, no se guarda nada en ninguna tabla
    public ResponseEntity<Map<String, Object>> crearSolicitud(
            @RequestPart("data") SolicitudRequestDTO dto,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        Map<String, Object> response = new HashMap<>();

        try {
            // --- Lógica para mapear el DTO a la entidad 'Solicitud' ---
            Solicitud solicitud = new Solicitud();
            solicitud.setIdEmployee(2); // Valor de ejemplo (ID del empleado logueado)
            solicitud.setIdType(Integer.parseInt(dto.getIdType()));
            solicitud.setIdState(1); // 'Pendiente'
            solicitud.setTitle(dto.getIdType()); // Se podría mejorar usando un mapeo real de tipo a título
            solicitud.setDescription(dto.getComments());
            solicitud.setStartDate(dto.getStartDate());
            solicitud.setEndDate(dto.getEndDate());

            // --- Guardar la solicitud en la base de datos ---
            // Esto genera el 'id_solicitud' necesario para el adjunto
            Solicitud solicitudGuardada = solicitudRepository.save(solicitud);

            // --- 3. Lógica para guardar el archivo si existe (tablas 'archivo' y
            // 'solicitud_adjunto') ---
            if (file != null && !file.isEmpty()) {

                // A. Insertar en la tabla 'archivo'
                Archivo entidadArchivo = new Archivo();
                entidadArchivo.setNameFile(file.getOriginalFilename());
                entidadArchivo.setMimeType(file.getContentType());
                entidadArchivo.setSizeBytes(file.getSize());
                // El storage_key es la ruta física o identificador único del archivo
                entidadArchivo.setStorageKey(
                        "portal360/ausencias/" + UUID.randomUUID() + "_" + file.getOriginalFilename());
                entidadArchivo.setCreatedBy(2); // Relacionado con id_empleado

                Archivo archivoGuardado = archivoRepository.save(entidadArchivo);

                // Relación en la tabla 'solicitud_adjunto'
                // Esta tabla une la solicitud recién creada con el archivo guardado
                SolicitudAdjunto relacion = new SolicitudAdjunto();
                relacion.setIdRequest(solicitudGuardada.getIdRequest());
                relacion.setIdFile(archivoGuardado.getIdFile());

                solicitudAdjuntoRepository.save(relacion);

                // Código para guardar el archivo físico en el disco/nube
                // file.transferTo(new File("/ruta/al/servidor/" +
                // entidadArchivo.getStorageKey()));
            }

            response.put("mensaje", "Solicitud y adjunto procesados con éxito");
            response.put("idSolicitud", solicitudGuardada.getIdRequest());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("error", "Error crítico al guardar: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
