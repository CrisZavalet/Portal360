package com.portal.portal360.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.portal360.dto.NominaDTO;
import com.portal.portal360.model.Archivo;
import com.portal.portal360.model.Documento;
import com.portal.portal360.repository.ArchivoRepository;
import com.portal.portal360.repository.DocumentoRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/paysheet")
@CrossOrigin(origins = "*")
public class NominaController {

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private ArchivoRepository archivoRepository;

    @GetMapping("/paysheet/me")
    public ResponseEntity<Map<String, Object>> getNominas(
            @RequestParam(required = false) Integer idEmpleado) {

        Integer idFiltro = (idEmpleado == null) ? 2 : idEmpleado;

        List<Documento> documentos = documentoRepository.findByIdEmpleadoAndIdTipoOrderByCreatedAtDesc(idFiltro, 2);

        List<NominaDTO> listaFinal = documentos.stream().map(doc -> {
            // Formateamos la fecha (created_at) para la columna 'Fecha Emisión'
            String fechaFormateada = doc.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

            // El 'Periodo' se extrae del título
            String periodo = doc.getTitulo();

            return new NominaDTO(
                    doc.getIdArchivo(), // ID para el mostrar y descargar el archivo
                    doc.getTitulo(), // Nombre que aparecerá en la primera columna
                    periodo,
                    "Ordinaria", // Valor fijo de ejemplo
                    fechaFormateada,
                    "Disponible" // Valor fijo de ejemplo
            );
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("nominas", listaFinal);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/paysheet/download-year")
    public void descargarNominasAnio(
            @RequestParam Integer anio,
            @RequestParam(required = false) Integer idEmpleado,
            HttpServletResponse response) throws IOException {

        Integer idFiltro = (idEmpleado == null) ? 2 : idEmpleado;

        // Buscamos los documentos de ese empleado, tipo nómina (2) y del año seleccionado
        List<Documento> documentos = documentoRepository.findByIdEmpleadoAndIdTipoOrderByCreatedAtDesc(idFiltro, 2);

        // Filtramos por año en Java para no complicar la query
        List<Documento> nominasAnio = documentos.stream()
                .filter(d -> d.getCreatedAt().getYear() == anio)
                .collect(Collectors.toList());

        // Configuramos la respuesta como un archivo ZIP
        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=\"Nominas_" + anio + ".zip\"");

        // Creamos el ZIP
        try (ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream())) {
            for (Documento doc : nominasAnio) {
                // Buscamos la info del archivo para obtener la ruta física (storage_key)
                Archivo archivoInfo = archivoRepository.findById(doc.getIdArchivo()).orElse(null);

                if (archivoInfo != null) {
                    Path path = Paths.get(archivoInfo.getStorageKey());
                    if (Files.exists(path)) {
                        // Añadimos una "entrada" al ZIP (un archivo dentro del paquete)
                        ZipEntry zipEntry = new ZipEntry(archivoInfo.getNombreArchivo());
                        zipOut.putNextEntry(zipEntry);
                        Files.copy(path, zipOut);
                        zipOut.closeEntry();
                    }
                }
            }
        }
    }

}
