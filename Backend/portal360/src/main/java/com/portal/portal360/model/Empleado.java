package com.portal.portal360.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
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

    @Column(name = "direccion")
private String address;

@Column(name = "ubicacion")
private String location;

@Column(name = "iban")
private String iban;

@Column(name = "departamento")
private String department;

@Column(name = "fecha_inicio")
private LocalDate startDate;

    @Column(name = "activo")
    private Boolean active = true;

    @Column(name = "id_usuario")
    private Long idUser;

    @ManyToOne
    @JoinColumn(name = "id_usuario", insertable = false, updatable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY)
private List<EmpleadoPuesto> employeePositions;
}
