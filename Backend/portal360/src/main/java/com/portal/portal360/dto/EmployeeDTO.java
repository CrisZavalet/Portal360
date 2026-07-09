package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class EmployeeDTO {

    private Integer idEmployee;
    private String dni;
    private String name;
    private String lastName;
    private LocalDate dateOfBirth;
    private String phone;
    private Boolean active;

}