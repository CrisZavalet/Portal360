package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventoCalendarioDTO {
    private String date;  // Formato "yyyy-MM-dd" 
    private String type;   
    private String name; // Título de la solicitud 
}
