package com.portal.portal360.repository;

import com.portal.portal360.model.Fichaje;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FichajeRepository extends JpaRepository<Fichaje, Integer> {
    List<Fichaje> findByEmpleado_IdEmpleado(Integer empleadoId);
}