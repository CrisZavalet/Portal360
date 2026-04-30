package com.portal.portal360.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.portal360.model.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    // Filtramos por empleado e id_tipo = 2 (Nóminas) [cite: 1, 2]
    List<Documento> findByIdEmpleadoAndIdTipoOrderByCreatedAtDesc(Integer idEmpleado, Integer idTipo);
}
