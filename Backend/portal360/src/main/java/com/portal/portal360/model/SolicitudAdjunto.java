package com.portal.portal360.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "solicitud_adjunto")
@Data
public class SolicitudAdjunto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adjunto")
    private Integer idAdjunto;

    @Column(name = "id_solicitud")
    private Integer idSolicitud;

    @Column(name = "id_archivo")
    private Long idArchivo;
}