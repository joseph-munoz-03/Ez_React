package com.example.ez.model.admin;

import com.example.ez.model.admin.dto.BarChartDTO;
import com.example.ez.model.admin.dto.PieChartDTO;
import com.example.ez.model.admin.dto.RecentActivityDTO;
import com.example.ez.model.admin.dto.RecentSalesDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAdminDTO {
    
    // Estadísticas generales
    private Long totalUsers;
    private Long totalEngineers;
    private Long totalClients;
    private Long totalInactiveUsers;
    
    // Estadísticas de negocio
    private Long totalContracts;
    private Long totalPublications;
    private Long totalReports;
    private Long totalChats;
    
    // Estadísticas financieras
    private BigDecimal ventasSemana;
    private Long reportesSemana;
    
    // Gráficas
    private List<BarChartDTO> ventasGrafica;
    private List<BarChartDTO> reportesGrafica;
    private List<PieChartDTO> usuariosPorTipo;
    
    // Actividades y ventas recientes
    private List<RecentActivityDTO> accionesRecientes;
    private List<RecentSalesDTO> ventasRecientes;
}
