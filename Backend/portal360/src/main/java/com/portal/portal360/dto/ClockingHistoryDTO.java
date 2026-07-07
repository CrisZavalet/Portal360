package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ClockingHistoryDTO {

    private Integer idClocking;

    private LocalDate date;

    private LocalTime startHour;

    private LocalTime endHour;

    private String status;
}