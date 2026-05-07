package com.portal.portal360.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.portal360.dto.EventoCalendarioDTO;
import com.portal.portal360.model.Solicitud;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
@Query("SELECT new com.portal.portal360.dto.EventoCalendarioDTO(" +
       "CAST(s.startDate as string), " + 
       "CASE " +
       "  WHEN s.idType = 1 THEN 'Vacaciones' " +
       "  WHEN s.idType = 2 THEN 'Baja Boda' " +
       "  WHEN s.idType = 3 THEN 'Baja Larga' " +
       "  WHEN s.idType = 4 THEN 'Baja Paternidad' " +
       "  WHEN s.idType = 5 THEN 'Incapacidad Temporal' " +
       "  WHEN s.idType = 6 THEN 'Permiso de operación' " +
       "  ELSE 'Otro' END, " +         
       "s.title) " +
       "FROM Solicitud s " +
       "WHERE s.idEmployee = :idEmployee " + 
       "AND YEAR(s.startDate) = :year") 
List<EventoCalendarioDTO> findEventosByEmployeeAndYear(
    @Param("idEmployee") Integer idEmployee, 
    @Param("year") int year
);
}
