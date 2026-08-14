package com.portal.portal360.dto;

import java.time.LocalDate;

public interface EmpleadoProjection {

    Integer getIdEmployee();

    String getDni();

    String getName();

    String getLastName();

    String getUsername();

    String getEmail();

    LocalDate getDateOfBirth();

    String getPhone();

    String getAddress();

    String getLocation();

    String getIban();

    String getDepartment();

    LocalDate getStartDate();

    String getPosition();

    Boolean getActive();

    String getRole();
}