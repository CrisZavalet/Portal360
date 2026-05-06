package com.portal.portal360.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "empleado")
@Data 
@AllArgsConstructor
@NoArgsConstructor
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empleado")
    private Integer idEmployee;

    @Column(unique = true, nullable = false)
    private String dni;

    private String name;
    private String lastName;

    @Column(name = "fecha_nacimiento")
    private LocalDate dateOfBirth;

    private String phone;

    private boolean active = true;

    @Column(name = "id_usuario")
    private Integer idUser; 
}
