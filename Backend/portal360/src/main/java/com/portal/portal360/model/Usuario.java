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
    private Long id;

    private String email;
    private String password;
    private Boolean activo;
}
