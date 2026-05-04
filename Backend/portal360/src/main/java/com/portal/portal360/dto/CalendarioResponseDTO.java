package com.portal.portal360.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarioResponseDTO {
    private Integer anio;
    private List<EventoCalendarioDTO> eventos;

    
}