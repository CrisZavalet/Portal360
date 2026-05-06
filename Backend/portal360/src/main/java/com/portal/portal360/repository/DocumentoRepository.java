package com.portal.portal360.repository;

import com.portal.portal360.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.portal360.model.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    // Filtramos por empleado e id_tipo = 2 (Nóminas)
    List<Documento> findByIdEmployeeAndIdTypeOrderByCreatedAtDesc(Integer idEmployee, Integer idType);
}
