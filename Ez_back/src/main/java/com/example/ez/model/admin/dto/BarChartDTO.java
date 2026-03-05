package com.example.ez.model.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BarChartDTO {
    
    private String day;
    private BigDecimal totalSales;
    private Long totalReports;
}
