package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAllDTO {

    private Integer idEmployee;
    private String dni;
    private String name;
    private String lastName;
    private LocalDate dateOfBirth;
    private String phone;
    private String address;
    private String location;
    private String iban;
    private String department;
    private LocalDate startDate;
    private Boolean active;

}