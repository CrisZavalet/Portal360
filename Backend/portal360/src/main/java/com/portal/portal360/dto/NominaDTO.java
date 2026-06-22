package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NominaDTO {
    private Long idFile;
    private String nameFile; // Columna 'ARCHIVO' y también 'TITULO'
    private String period;       // "Enero 2026" (se puede formatear la fecha)
    private String typePaysheet;    // "Ordinaria" (o simplemente "Nómina")
    private String dateEmission; // Formateada como dd/mm/aaaa 
    private String state;        // "Disponible" o "No disponible" 
}
