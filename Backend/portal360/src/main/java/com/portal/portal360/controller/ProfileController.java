package com.portal.portal360.controller;

import com.portal.portal360.dto.ProfileDTO;
import com.portal.portal360.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Integer id) {
        return empleadoRepository.findById(id)
                .map(e -> ResponseEntity.ok(new ProfileDTO(
                        e.getIdEmployee(),
                        e.getName(),
                        e.getLastName(),
                        e.getDni(),
                        e.getPhone(),
                        e.getDateOfBirth(),
                        e.getIban()
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileDTO> updateProfile(@PathVariable Integer id, @RequestBody ProfileDTO dto) {
        return empleadoRepository.findById(id).map(e -> {
            e.setName(dto.getName());
            e.setLastName(dto.getLastName());
            e.setPhone(dto.getPhone());
            e.setDateOfBirth(dto.getDateOfBirth());
            e.setIban(dto.getIban());
            empleadoRepository.save(e);
            return ResponseEntity.ok(dto);
        }).orElse(ResponseEntity.notFound().build());
    }
}