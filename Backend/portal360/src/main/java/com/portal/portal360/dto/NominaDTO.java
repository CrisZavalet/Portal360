package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NominaDTO {
    private Long idArchivo;
    private String nombreArchivo; // Columna 'ARCHIVO' y también 'TITULO'
    private String periodo;       // "Enero 2026" (puedes formatear la fecha)
    private String tipoNomina;    // "Ordinaria" (o simplemente "Nómina")
    private String fechaEmision; // Formateada como dd/mm/aaaa 
    private String estado;        // "Disponible" o "No disponible" 
}
