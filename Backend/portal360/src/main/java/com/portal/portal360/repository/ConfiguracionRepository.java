package com.portal.portal360.repository;

import com.portal.portal360.model.Configuracion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConfiguracionRepository extends JpaRepository<Configuracion, Integer> {
    Optional<Configuracion> findByIdUsuario(Integer idUsuario);
}