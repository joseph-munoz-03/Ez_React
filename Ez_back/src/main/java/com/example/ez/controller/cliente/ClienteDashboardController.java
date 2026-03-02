package com.example.ez.controller.cliente;

import com.example.ez.service.contract.ContractService;
import com.example.ez.service.payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/cliente/dashboard")
public class ClienteDashboardController {

    private final ContractService contractService;
    private final PaymentService paymentService;

    public ClienteDashboardController(ContractService contractService, PaymentService paymentService) {
        this.contractService = contractService;
        this.paymentService = paymentService;
    }

    /**
     * Obtener estadísticas del cliente
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<DashboardEstadisticas> obtenerEstadisticas(
            @RequestParam(defaultValue = "MENSUAL") String periodo,
            Authentication authentication) {
        Long clienteId = Long.parseLong(authentication.getName());
        
        var contratos = contractService.obtenerContratosCliente(clienteId);
        var pagos = paymentService.obtenerHistorialPagos(clienteId);
        
        BigDecimal gastosTotales = pagos.stream()
            .filter(p -> p.getMonto().compareTo(BigDecimal.ZERO) < 0)
            .map(p -> p.getMonto().abs())
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        long contratosActivos = contratos.stream()
            .filter(c -> c.getEstado().toString().equals("EN_PROCESO"))
            .count();
        
        long contratosFinalizados = contratos.stream()
            .filter(c -> c.getEstado().toString().equals("FINALIZADO"))
            .count();
        
        DashboardEstadisticas stats = new DashboardEstadisticas(
            gastosTotales,
            contratos.size(),
            (int) contratosActivos,
            (int) contratosFinalizados
        );
        
        return ResponseEntity.ok(stats);
    }

    /**
     * Clase DTO para estadísticas
     */
    public static class DashboardEstadisticas {
        private BigDecimal gastosTotales;
        private int contratosTotal;
        private int contratosActivos;
        private int contratosFinalizados;

        public DashboardEstadisticas(BigDecimal gastosTotales, int contratosTotal, 
                                     int contratosActivos, int contratosFinalizados) {
            this.gastosTotales = gastosTotales;
            this.contratosTotal = contratosTotal;
            this.contratosActivos = contratosActivos;
            this.contratosFinalizados = contratosFinalizados;
        }

        public BigDecimal getGastosTotales() { return gastosTotales; }
        public int getContratosTotal() { return contratosTotal; }
        public int getContratosActivos() { return contratosActivos; }
        public int getContratosFinalizados() { return contratosFinalizados; }
    }
}