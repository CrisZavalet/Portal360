package com.portal.portal360.dto;

import java.time.LocalDate;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private Integer idEmployee;
    private String name;
    private String lastName;
    private String dni;
    private String phone;
    private LocalDate dateOfBirth;
    private String iban;
}