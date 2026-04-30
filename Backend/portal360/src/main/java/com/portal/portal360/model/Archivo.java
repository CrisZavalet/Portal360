package com.portal.portal360.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "archivo")
@Data
public class Archivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_archivo")
    private Long idArchivo;

    @Column(name = "storage_key", nullable = false)
    private String storageKey;

    @Column(name = "nombre_archivo", nullable = false)
    private String nombreArchivo;

    @Column(name = "mime_type")
    private String mimeType;

    @Column(name = "tamano_bytes")
    private Long tamanoBytes;

    @Column(name = "creado_por")
    private Integer creadoPor; // id_empleado

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}