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
    private Long idDocument;

    @Column(name = "id_empleado")
    private Integer idEmployee; 

    @Column(name = "id_tipo")
    private Integer idType; // Tipo 2 para nóminas

    @Column(name = "id_archivo")
    private Long idFile; 

    @Column(name = "titulo")
    private String title;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt; // Para fecha de emisión
    
}
