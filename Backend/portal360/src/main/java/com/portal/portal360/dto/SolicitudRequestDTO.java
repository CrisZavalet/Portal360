package com.portal.portal360.dto;

import lombok.Data;
import java.util.Date;

@Data
public class SolicitudRequestDTO {
    private String idType;      // El valor del Select
    private String comments;  // Del Textarea
    private String typeDuration; // "hours", "day", "days"
    private Date date;         // Para "horas" o "un día"
    private Integer hours;      // Solo para "horas"
    private Date startDate;   // Para "varios días"
    private Date endDate;      // Para "varios días"
}