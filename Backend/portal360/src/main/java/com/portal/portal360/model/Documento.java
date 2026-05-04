package com.portal.portal360.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "documento")
@Data

public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_documento")
    private Long idDocumento;

    @Column(name = "id_empleado")
    private Integer idEmpleado; 

    @Column(name = "id_tipo")
    private Integer idTipo; // Tipo 2 para nóminas

    @Column(name = "id_archivo")
    private Long idArchivo; 

    private String titulo;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt; // Para fecha de emisión
    
}
