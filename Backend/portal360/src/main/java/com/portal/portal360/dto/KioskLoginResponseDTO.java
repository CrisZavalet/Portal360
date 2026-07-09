package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KioskLoginResponseDTO {

    private String message;
    private Integer idEmployee;
    private String role;

}