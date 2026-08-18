package com.portal.portal360.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tipo_solicitud")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoSolicitud {

    @Id
    @Column(name = "id_tipo")
    private Integer idType;

    @Column(name = "nombre", nullable = false)
    private String name;
}