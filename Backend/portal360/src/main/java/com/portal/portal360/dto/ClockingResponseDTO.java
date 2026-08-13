package com.portal.portal360.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClockingResponseDTO {

    private Integer idFichaje;
    private Integer idEmployee;
    private String name;
    private String lastName;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endHour;
    private String aprobado;
    private String estado;
}