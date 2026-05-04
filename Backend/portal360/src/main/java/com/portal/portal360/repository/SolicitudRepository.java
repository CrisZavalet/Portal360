package com.portal.portal360.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.portal360.dto.EventoCalendarioDTO;
import com.portal.portal360.model.Solicitud;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
@Query("SELECT new com.portal.portal360.dto.EventoCalendarioDTO(" +
       "CAST(s.fechaInicio as string), " + 
       "CASE " +
       "  WHEN s.idTipo = 1 THEN 'Vacaciones' " +
       "  WHEN s.idTipo = 2 THEN 'Baja Boda' " +
       "  WHEN s.idTipo = 3 THEN 'Baja Larga' " +
       "  WHEN s.idTipo = 4 THEN 'Baja Paternidad' " +
       "  WHEN s.idTipo = 5 THEN 'Incapacidad Temporal' " +
       "  WHEN s.idTipo = 6 THEN 'Permiso de operación' " +
       "  ELSE 'Otro' END, " +         
       "s.titulo) " +
       "FROM Solicitud s " +
       "WHERE s.idEmpleado = :idEmpleado " + // :idEmpleado debe ser Integer
       "AND YEAR(s.fechaInicio) = :anio") 
List<EventoCalendarioDTO> findEventosByEmpleadoAndAnio(
    @Param("idEmpleado") Integer idEmpleado, 
    @Param("anio") int anio
);
}
