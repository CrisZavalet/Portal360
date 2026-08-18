package com.portal.portal360.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.portal360.model.Solicitud;

public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {

}