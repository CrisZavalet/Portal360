package com.portal.portal360.controller;

import com.portal.portal360.model.Usuario;
import com.portal.portal360.repository.EmpleadoRepository;
import com.portal.portal360.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
private EmpleadoRepository empleadoRepository;

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Usuario usuario) {

    return usuarioRepository.findByEmailAndPassword(
            usuario.getEmail(),
            usuario.getPassword()
    ).map(u -> empleadoRepository.findByIdUser(u.getIdUsuario().intValue())
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build())
    ).orElse(ResponseEntity.status(401).build());
}
}