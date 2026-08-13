package com.portal.portal360.dto;

public class ClockingApprovalResponseDTO {

    private Integer idFichaje;
    private String aprobado;

    public ClockingApprovalResponseDTO(Integer idFichaje, String aprobado) {
        this.idFichaje = idFichaje;
        this.aprobado = aprobado;
    }

    public Integer getIdFichaje() {
        return idFichaje;
    }

    public String getAprobado() {
        return aprobado;
    }
}