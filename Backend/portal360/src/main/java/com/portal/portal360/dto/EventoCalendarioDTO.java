package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventoCalendarioDTO {
    private String fecha;  // Formato "yyyy-MM-dd" 
    private String tipo;   
    private String nombre; // Título de la solicitud 
}
