package com.portal.portal360.controller;

import com.portal.portal360.model.Usuario;
import com.portal.portal360.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        return usuarioRepository.findByEmailAndPassword(usuario.getEmail(), usuario.getPassword())
                .map(u -> ResponseEntity.ok("Login correcto"))
                .orElse(ResponseEntity.status(401).build());
    }
}