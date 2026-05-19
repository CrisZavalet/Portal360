package com.portal.portal360.controller;

import com.portal.portal360.model.Configuracion;
import com.portal.portal360.repository.ConfiguracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionRepository configuracionRepository;

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Configuracion> getSettings(@PathVariable Integer idUsuario) {
        return configuracionRepository.findByIdUsuario(idUsuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Configuracion> createSettings(@RequestBody Configuracion configuracion) {
        return ResponseEntity.ok(configuracionRepository.save(configuracion));
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<Configuracion> updateSettings(@PathVariable Integer idUsuario, @RequestBody Configuracion config) {
        return configuracionRepository.findByIdUsuario(idUsuario).map(c -> {
            c.setNotifEmail(config.getNotifEmail());
            c.setNotifFichaje(config.getNotifFichaje());
            c.setNotifAusencia(config.getNotifAusencia());
            c.setTwoFactorAuth(config.getTwoFactorAuth());
            return ResponseEntity.ok(configuracionRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }
}