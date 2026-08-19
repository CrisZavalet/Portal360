package com.portal.portal360.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.portal360.model.Solicitud;

public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {

    List<Solicitud> findByIdEmployee(Integer idEmployee);

}