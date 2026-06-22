package com.portal.portal360.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarioResponseDTO {
    private Integer year;
    private List<EventoCalendarioDTO> events;

    
}