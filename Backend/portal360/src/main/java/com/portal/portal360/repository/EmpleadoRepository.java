package com.portal.portal360.repository;

import com.portal.portal360.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {

    Optional<Empleado> findByIdUser(Integer idUser);

}