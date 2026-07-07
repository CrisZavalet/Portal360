package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ClockingAllHistoryDTO {

    private Integer idClocking;
    private Integer idEmployee;
    private String name;
    private String lastName;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endHour;
    private String status;
}