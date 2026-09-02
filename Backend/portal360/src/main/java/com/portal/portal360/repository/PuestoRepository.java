package com.portal.portal360.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.portal360.model.Puesto;

public interface PuestoRepository extends JpaRepository<Puesto, Integer> {
}