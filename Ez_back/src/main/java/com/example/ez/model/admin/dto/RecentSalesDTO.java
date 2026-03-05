package com.example.ez.model.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentSalesDTO {
    
    private Long contractId;
    private String contractTitle;
    private String engineerName;
    private String clientName;
    private BigDecimal amount;
    private LocalDateTime saleDate;
}
