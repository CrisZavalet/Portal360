package com.portal.portal360.repository;

import com.portal.portal360.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentoRepository extends JpaRepository<Documento, Integer> {
    List<Documento> findByEmpleado_IdEmpleado(Integer empleadoId);
}