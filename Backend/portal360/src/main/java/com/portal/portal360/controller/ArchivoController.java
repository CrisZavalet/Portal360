package com.portal.portal360.controller;

import org.springframework.http.HttpHeaders;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.portal360.model.Archivo;
import com.portal.portal360.repository.ArchivoRepository;

@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins = "*")
public class ArchivoController {

    @Autowired
    private ArchivoRepository archivoRepository;

    @GetMapping("/{id}/show")
    public ResponseEntity<Resource> verArchivo(@PathVariable Long id) {
        return procesarArchivo(id, "inline");
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> descargarArchivo(@PathVariable Long id) {
        return procesarArchivo(id, "attachment");
    }

    private ResponseEntity<Resource> procesarArchivo(Long id, String modo) { // OJO: Esta API habría que mirarla bien
        // Buscamos los metadatos en la BD para saber el nombre y tipo (MIME)
        Archivo archivoInfo = archivoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado"));

        try {
            //  Cargamos el archivo físico del disco
            // Aquí usamos la 'storageKey' que guardamos al crear la solicitud
            Path path = Paths.get(archivoInfo.getStorageKey());
            Resource recurso = new UrlResource(path.toUri());

            // Configuramos la respuesta con los Headers adecuados para mostrar o descargar el archivo
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(archivoInfo.getMimeType())) // Ej: application/pdf
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            modo + "; filename=\"" + archivoInfo.getNombreArchivo() + "\"") // inline o attachment
                    .body(recurso);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
