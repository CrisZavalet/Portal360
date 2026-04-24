package com.portal.portal360.controller;

import com.portal.portal360.model.Solicitud;
import com.portal.portal360.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "*")

public class SolicitudController {

    @Autowired
    private SolicitudRepository solicitudRepository;

    // Este es el GET que devuelve la lista de todas las solicitudes
    @GetMapping("/todas")
    public List<Solicitud> listarTodas() {
        return solicitudRepository.findAll();
    }

}
