package com.portal.portal360.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documento")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_documento")
    private Integer idDocumento;

    @ManyToOne
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado empleado;

    @Column(name = "id_tipo", nullable = false)
    private Integer idTipo;

    @Column(name = "id_archivo", nullable = false)
    private Integer idArchivo;

    private String titulo;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}