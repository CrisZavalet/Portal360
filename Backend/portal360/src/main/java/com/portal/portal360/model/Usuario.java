package com.portal.portal360.model;
import java.util.List;
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
    private Long idUsuario;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "username", unique = true)
private String username;

    @Column(name = "password_hash")
    private String password;
    @Column(name = "activo")
    private Boolean activo;

    @ManyToMany(fetch = FetchType.EAGER)
@JoinTable(
    name = "usuario_rol",
    joinColumns = @JoinColumn(name = "id_usuario"),
    inverseJoinColumns = @JoinColumn(name = "id_rol")
)
private List<Rol> roles;
}
