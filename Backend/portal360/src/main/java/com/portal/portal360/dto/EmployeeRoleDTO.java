package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRoleDTO {

    private Integer idEmployee;
    private String dni;
    private String name;
    private String lastName;
    private String email;
    private LocalDate dateOfBirth;
    private String phone;
    private Boolean active;
    private String role;

}