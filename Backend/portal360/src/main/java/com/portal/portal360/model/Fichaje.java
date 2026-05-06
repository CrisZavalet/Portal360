package com.portal.portal360.model;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fichaje")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fichaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fichaje")
    private Integer idFichaje;


    @ManyToOne
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado employee;

    @Enumerated(EnumType.STRING)
    private TipoFichaje type;

    @Column(name = "hora_inicio")
    private LocalTime startHour;

    @Column(name = "hora_fin")
    private LocalTime endHour;

    private LocalDate date;

    // El enum para asegurar que no haya errores de escritura
    public enum TipoFichaje {
        ENTRADA, SALIDA
    }
}