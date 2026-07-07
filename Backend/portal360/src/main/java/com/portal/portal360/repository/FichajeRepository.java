package com.portal.portal360.repository;

import com.portal.portal360.model.Fichaje;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import java.util.Optional;
public interface FichajeRepository extends JpaRepository<Fichaje, Integer> {
    
    // Ahora puedes usar el nombre corto que querías
    List<Fichaje> findByIdEmployee(Integer idEmployee);

    // Y aquí usamos 'Date' porque así se llama tu variable en Fichaje.java
    List<Fichaje> findByIdEmployeeAndDateBetween(Integer idEmployee, LocalDate startDate, LocalDate endDate);

    List<Fichaje> findByIdEmployeeOrderByDateDescStartHourDesc(Integer idEmployee);

    Optional<Fichaje> findFirstByIdEmployeeAndEndHourIsNullOrderByDateDescStartHourDesc(Integer idEmployee);

    
    @Query("""
SELECT f
FROM Fichaje f
JOIN FETCH f.employee
WHERE f.date = :date
""")
List<Fichaje> findTodayClockings(LocalDate date);


}