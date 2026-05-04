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
    private Integer idEmpleado;

    @Column(unique = true, nullable = false)
    private String dni;

    private String nombre;
    private String apellidos;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    private String telefono;

    private boolean activo = true;

    @Column(name = "id_usuario")
    private Integer idUsuario; 
}
