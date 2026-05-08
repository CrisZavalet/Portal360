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

    @Column(name = "nombre")
    private String name;

    @Column(name = "apellidos")
    private String lastName;

    @Column(name = "fecha_nacimiento")
    private LocalDate dateOfBirth;

    @Column(name = "telefono")
    private String phone;

    @Column(name = "activo")
    private Boolean active = true;

    @Column(name = "id_usuario")
    private Integer idUser; 

    @Column (name = "iban")
    private String iban;
}
