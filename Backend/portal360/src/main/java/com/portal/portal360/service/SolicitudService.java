package com.portal.portal360.service;

import com.portal.portal360.dto.SolicitudDTO;
import com.portal.portal360.model.Solicitud;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.repository.SolicitudRepository;
import com.portal.portal360.repository.TipoSolicitudRepository;

import org.springframework.stereotype.Service;

@Service
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final EmpleadoRepository empleadoRepository;
private final TipoSolicitudRepository tipoSolicitudRepository;

public SolicitudService(
    SolicitudRepository solicitudRepository,
    EmpleadoRepository empleadoRepository,
    TipoSolicitudRepository tipoSolicitudRepository) {

this.solicitudRepository = solicitudRepository;
this.empleadoRepository = empleadoRepository;
this.tipoSolicitudRepository = tipoSolicitudRepository;
}

    public Solicitud crearSolicitud(SolicitudDTO request) {

        // Comprobar que el empleado existe
if (!empleadoRepository.existsById(request.getIdEmpleado())) {
    throw new IllegalArgumentException(
            "El empleado indicado no existe"
    );
}

// Comprobar que el tipo de solicitud existe
if (!tipoSolicitudRepository.existsById(request.getIdTipo())) {
    throw new IllegalArgumentException(
            "El tipo de solicitud indicado no existe"
    );
}

        // Validar duración
        if (request.getDuracion() == null ||
                (!request.getDuracion().equals("HORAS")
                && !request.getDuracion().equals("UN_DIA")
                && !request.getDuracion().equals("VARIOS_DIAS"))) {

            throw new IllegalArgumentException(
                    "La duración debe ser HORAS, UN_DIA o VARIOS_DIAS"
            );
        }

        // Validaciones según la duración
        switch (request.getDuracion()) {

            case "HORAS":

                if (request.getFechaInicio() == null ||
                        request.getHoraInicio() == null ||
                        request.getHoraFin() == null) {

                    throw new IllegalArgumentException(
                            "Para una solicitud por horas debes indicar fecha, hora de inicio y hora de fin"
                    );
                }

                if (!request.getHoraFin().isAfter(request.getHoraInicio())) {

                    throw new IllegalArgumentException(
                            "La hora de fin debe ser posterior a la hora de inicio"
                    );
                }

                break;

            case "UN_DIA":

                if (request.getFechaInicio() == null) {

                    throw new IllegalArgumentException(
                            "Para una solicitud de un día debes indicar la fecha"
                    );
                }

                break;

            case "VARIOS_DIAS":

                if (request.getFechaInicio() == null ||
                        request.getFechaFin() == null) {

                    throw new IllegalArgumentException(
                            "Para varios días debes indicar fecha de inicio y fecha de fin"
                    );
                }

                if (request.getFechaFin().isBefore(request.getFechaInicio())) {

                    throw new IllegalArgumentException(
                            "La fecha de fin no puede ser anterior a la fecha de inicio"
                    );
                }

                break;
        }

        // Crear solicitud
        Solicitud solicitud = new Solicitud();

        solicitud.setIdEmployee(request.getIdEmpleado());
        solicitud.setIdType(request.getIdTipo());

        // Estado inicial: PENDIENTE
        solicitud.setIdState(1);

        // Guardamos el comentario
        solicitud.setDescription(request.getComentario());

        // Fechas
        solicitud.setStartDate(request.getFechaInicio());
        solicitud.setEndDate(request.getFechaFin());

        // Horas
        solicitud.setStartTime(request.getHoraInicio());
        solicitud.setEndTime(request.getHoraFin());

        return solicitudRepository.save(solicitud);
    }
}