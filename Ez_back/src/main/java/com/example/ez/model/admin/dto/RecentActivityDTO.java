package com.example.ez.model.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityDTO {
    
    private String type; // REGISTRO, REPORTE, MENSAJE, PUBLICACION
    private String description;
    private String userName;
    private LocalDateTime timestamp;
}
