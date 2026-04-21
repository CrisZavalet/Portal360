package com.portal.portal360.controller;

import com.portal.portal360.model.Empleado;
import com.portal.portal360.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*") // Esto es para que React pueda leerlo sin errores de CORS
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // Este es el GET que devuelve la lista de todos los empleados
    @GetMapping("/todos")
    public List<Empleado> listarTodos() {
        return empleadoRepository.findAll();
    }
}