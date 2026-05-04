package com.portal.portal360.dto;

import lombok.Data;
import java.util.Date;

@Data
public class SolicitudRequestDTO {
    private String idTipo;      // El valor del Select
    private String comentario;  // Del Textarea
    private String tipoDuracion; // "hours", "day", "days"
    private Date fecha;         // Para "horas" o "un día"
    private Integer horas;      // Solo para "horas"
    private Date fechaInicio;   // Para "varios días"
    private Date fechaFin;      // Para "varios días"
}