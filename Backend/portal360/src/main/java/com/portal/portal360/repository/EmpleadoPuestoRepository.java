package com.portal.portal360.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portal.portal360.model.EmpleadoPuesto;

@Repository
public interface EmpleadoPuestoRepository
        extends JpaRepository<EmpleadoPuesto, Integer> {
}