package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ClockingTodayDTO {

    private Integer idEmployee;

    private String name;

    private String lastName;

    private LocalTime startHour;

    private LocalTime endHour;

    private Boolean working;

}