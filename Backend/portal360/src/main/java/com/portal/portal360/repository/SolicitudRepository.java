package com.portal.portal360.repository;

import com.portal.portal360.model.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    
}
