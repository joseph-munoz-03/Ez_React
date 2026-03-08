package com.example.ez.service.admin;

import com.example.ez.model.admin.DashboardAdminDTO;
import com.example.ez.model.admin.dto.BarChartDTO;
import com.example.ez.model.admin.dto.PieChartDTO;
import com.example.ez.model.admin.dto.RecentActivityDTO;
import com.example.ez.model.admin.dto.RecentSalesDTO;
import com.example.ez.model.enums.Role;
import com.example.ez.model.enums.PaymentStatus;
import com.example.ez.repository.user.UserRepository;
import com.example.ez.repository.contract.ContractRepository;
import com.example.ez.repository.marketplace.PublicationRepository;
import com.example.ez.repository.chat.ChatRepository;
import com.example.ez.repository.report.ReportRepository;
import com.example.ez.repository.contract.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminDashboardService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ContractRepository contractRepository;
    
    @Autowired
    private PublicationRepository publicationRepository;
    
    @Autowired
    private ChatRepository chatRepository;
    
    @Autowired
    private ReportRepository reportRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    public DashboardAdminDTO getDashboardStats() {
        DashboardAdminDTO dashboard = new DashboardAdminDTO();
        
        // Estadísticas de usuarios
        dashboard.setTotalUsers(userRepository.count());
        dashboard.setTotalEngineers(userRepository.countByRole(Role.INGENIERO));
        dashboard.setTotalClients(userRepository.countByRole(Role.CLIENTE));
        dashboard.setTotalInactiveUsers(userRepository.countByRole(Role.ADMIN));
        
        // Estadísticas de negocio
        dashboard.setTotalContracts(contractRepository.count());
        dashboard.setTotalPublications(publicationRepository.count());
        dashboard.setTotalReports(reportRepository.count());
        dashboard.setTotalChats(chatRepository.count());
        
        // Estadísticas financieras de la semana
        LocalDateTime weekAgo = LocalDateTime.now().minusWeeks(1);
        BigDecimal weeklySales = calculateWeeklySales(weekAgo);
        dashboard.setVentasSemana(weeklySales);
        dashboard.setReportesSemana(reportRepository.countByStatus(
            com.example.ez.model.enums.ReportStatus.OPEN
        ));
        
        // Gráficas
        dashboard.setVentasGrafica(generateWeeklySalesChart());
        dashboard.setReportesGrafica(generateWeeklyReportsChart());
        dashboard.setUsuariosPorTipo(generateUserTypeChart());
        
        // Actividades recientes
        dashboard.setAccionesRecientes(getRecentActivities());
        dashboard.setVentasRecientes(getRecentSales());
        
        return dashboard;
    }
    
    /**
     * Calcula el total de ventas de la última semana
     */
    private BigDecimal calculateWeeklySales(LocalDateTime since) {
        try {
            List<Object> result = paymentRepository.findTotalSalesAmountSince(since);
            if (!result.isEmpty() && result.get(0) != null) {
                return (BigDecimal) result.get(0);
            }
            return BigDecimal.ZERO;
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }
    
    /**
     * Genera gráfica de ventas por día de la semana (últimos 7 días)
     */
    private List<BarChartDTO> generateWeeklySalesChart() {
        List<BarChartDTO> chart = new ArrayList<>();
        String[] days = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"};
        
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        
        // Obtener pagos completados de los últimos 7 días
        LocalDateTime sevenDaysAgo = now.minusDays(7);
        List<?> recentPayments = paymentRepository.findRecentPaymentsByDay(sevenDaysAgo);
        
        // Crear mapa de ventas por día
        Map<Integer, BigDecimal> salesByDay = new LinkedHashMap<>();
        for (int i = 0; i < 7; i++) {
            salesByDay.put(i, BigDecimal.ZERO);
        }
        
        // Procesar pagos (agrupar por día)
        LocalDate currentDay = today.minusDays(6);
        for (int i = 0; i < 7; i++) {
            int dayOfWeek = currentDay.getDayOfWeek().getValue() - 1;
            final LocalDate dayToFilter = currentDay;  // Variable final para la lambda
            
            // Sumar pagos para este día
            BigDecimal dayTotal = recentPayments.stream()
                .filter(p -> p instanceof Object[])
                .map(p -> (Object[]) p)
                .filter(p -> {
                    LocalDate payDate = ((java.sql.Timestamp) p[0]).toLocalDateTime().toLocalDate();
                    return payDate.equals(dayToFilter);
                })
                .map(p -> (BigDecimal) p[1])
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            BarChartDTO bar = new BarChartDTO();
            bar.setDay(days[dayOfWeek]);
            bar.setTotalSales(dayTotal);
            chart.add(bar);
            
            currentDay = currentDay.plusDays(1);
        }
        
        return chart;
    }
    
    /**
     * Genera gráfica de reportes por día de la semana
     */
    private List<BarChartDTO> generateWeeklyReportsChart() {
        List<BarChartDTO> chart = new ArrayList<>();
        String[] days = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"};
        
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        LocalDateTime sevenDaysAgo = now.minusDays(7);
        
        // Obtener reportes de los últimos 7 días
        List<?> recentReports = reportRepository.findRecentReportsByDay(sevenDaysAgo);
        
        LocalDate currentDay = today.minusDays(6);
        for (int i = 0; i < 7; i++) {
            int dayOfWeek = currentDay.getDayOfWeek().getValue() - 1;
            final LocalDate dayToFilter = currentDay;  // Variable final para la lambda
            
            // Contar reportes para este día
            long dayCount = recentReports.stream()
                .filter(r -> r instanceof Object[])
                .map(r -> (Object[]) r)
                .filter(r -> {
                    LocalDate reportDate = ((java.sql.Timestamp) r[0]).toLocalDateTime().toLocalDate();
                    return reportDate.equals(dayToFilter);
                })
                .count();
            
            BarChartDTO bar = new BarChartDTO();
            bar.setDay(days[dayOfWeek]);
            bar.setTotalReports(dayCount);
            chart.add(bar);
            
            currentDay = currentDay.plusDays(1);
        }
        
        return chart;
    }
    
    /**
     * Genera gráfica de usuarios por tipo
     */
    private List<PieChartDTO> generateUserTypeChart() {
        List<PieChartDTO> chart = new ArrayList<>();
        
        // Contar usuarios por rol
        long clientes = userRepository.countByRole(Role.CLIENTE);
        long ingenieros = userRepository.countByRole(Role.INGENIERO);
        long admins = userRepository.countByRole(Role.ADMIN);
        
        PieChartDTO pieCliente = new PieChartDTO();
        pieCliente.setType("CLIENTE");
        pieCliente.setCount(clientes);
        chart.add(pieCliente);
        
        PieChartDTO pieIngeniero = new PieChartDTO();
        pieIngeniero.setType("INGENIERO");
        pieIngeniero.setCount(ingenieros);
        chart.add(pieIngeniero);
        
        PieChartDTO pieAdmin = new PieChartDTO();
        pieAdmin.setType("ADMIN");
        pieAdmin.setCount(admins);
        chart.add(pieAdmin);
        
        return chart;
    }
    
    /**
     * Obtiene actividades recientes del sistema (últimas 10)
     */
    private List<RecentActivityDTO> getRecentActivities() {
        List<RecentActivityDTO> activities = new ArrayList<>();
        
        try {
            // Contratos recientes (últimos 5)
            List<?> recentContracts = contractRepository.findRecentContracts(
                LocalDateTime.now().minusDays(30)
            );
            
            recentContracts.stream().limit(5).forEach(c -> {
                Object[] contract = (Object[]) c;
                RecentActivityDTO activity = new RecentActivityDTO();
                activity.setType("CONTRATO");
                activity.setDescription("Nuevo contrato creado");
                activity.setUserName((String) contract[0]); // cliente name
                activity.setTimestamp((LocalDateTime) contract[1]);
                activities.add(activity);
            });
            
            // Reportes recientes (últimos 3)
            List<?> recentReports = reportRepository.findTop3ByOrderByCreatedAtDesc();
            recentReports.forEach(r -> {
                Object[] report = (Object[]) r;
                RecentActivityDTO activity = new RecentActivityDTO();
                activity.setType("REPORTE");
                activity.setDescription("Nuevo reporte creado");
                activity.setUserName((String) report[0]); // reporter name
                activity.setTimestamp((LocalDateTime) report[1]);
                activities.add(activity);
            });
            
            // Publicaciones recientes (últimas 2)
            List<?> recentPubs = publicationRepository.findTop2ByOrderByFechaCreacionDesc();
            recentPubs.stream().limit(2).forEach(p -> {
                Object[] pub = (Object[]) p;
                RecentActivityDTO activity = new RecentActivityDTO();
                activity.setType("PUBLICACIÓN");
                activity.setDescription("Nueva publicación");
                activity.setUserName((String) pub[0]); // usuario name
                activity.setTimestamp((LocalDateTime) pub[1]);
                activities.add(activity);
            });
            
        } catch (Exception e) {
            // Si hay error, retornar lista vacía
        }
        
        return activities.stream()
            .limit(10)
            .collect(Collectors.toList());
    }
    
    /**
     * Obtiene últimas 10 ventas completadas
     */
    private List<RecentSalesDTO> getRecentSales() {
        List<RecentSalesDTO> sales = new ArrayList<>();
        
        try {
            List<?> completedPayments = paymentRepository.findTop10ByEstadoOrderByFechaCreacionDesc();
            
            completedPayments.forEach(p -> {
                Object[] payment = (Object[]) p;
                RecentSalesDTO sale = new RecentSalesDTO();
                sale.setContractId((Long) payment[0]);
                sale.setContractTitle((String) payment[1]);
                sale.setEngineerName((String) payment[2]);
                sale.setClientName((String) payment[3]);
                sale.setAmount((BigDecimal) payment[4]);
                sale.setSaleDate((LocalDateTime) payment[5]);
                sales.add(sale);
            });
            
        } catch (Exception e) {
            // Si hay error, retornar lista vacía
        }
        
        return sales;
    }
}
