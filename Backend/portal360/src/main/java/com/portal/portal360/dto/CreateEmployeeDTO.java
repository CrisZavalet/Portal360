package com.portal.portal360.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateEmployeeDTO {

    private String name;
    private String lastName;

    private String dni;
    private String address;

    private String email;
    private String password;

    private String phone;
    private LocalDate dateOfBirth;

    private String location;
    private String iban;

    private Integer idRole;
    private Integer idPosition;

    private LocalDate startDate;

    private Boolean active;
}