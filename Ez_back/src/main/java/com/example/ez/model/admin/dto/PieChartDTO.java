package com.example.ez.model.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PieChartDTO {
    
    private String type; // ADMIN, ENGINEER, CLIENT, INACTIVE
    private Long count;
}
