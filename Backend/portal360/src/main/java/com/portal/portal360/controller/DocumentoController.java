package com.portal.portal360.controller;

import com.portal.portal360.model.Documento;
import com.portal.portal360.repository.DocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documento")
public class DocumentoController {

    @Autowired
    private DocumentoRepository documentoRepository;

    @GetMapping
    public List<Documento> getAllDocumentos() {
        return documentoRepository.findAll();
    }
}