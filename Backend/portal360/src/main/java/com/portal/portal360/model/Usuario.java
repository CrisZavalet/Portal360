package com.portal.portal360.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data // Genera getters, setters, toString, equals y hashCode
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    private Long idUsuario;
=======
    private Long id_usuario;
>>>>>>> 03aa3be (antes de un pull)

    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "password_hash")
    private String password;
    @Column(name = "activo")
    private Boolean activo;
}
