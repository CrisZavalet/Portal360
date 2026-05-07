package com.portal.portal360.repository;

import com.portal.portal360.model.Archivo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArchivoRepository extends JpaRepository<Archivo, Long> {
}