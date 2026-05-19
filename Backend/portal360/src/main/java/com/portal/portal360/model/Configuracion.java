package com.portal.portal360.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "configuracion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Configuracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_configuracion")
    private Integer idConfiguracion;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

    @Column(name = "notif_email")
    private Boolean notifEmail = true;

    @Column(name = "notif_fichaje")
    private Boolean notifFichaje = true;

    @Column(name = "notif_ausencia")
    private Boolean notifAusencia = true;

    @Column(name = "two_factor_auth")
    private Boolean twoFactorAuth = false;
}