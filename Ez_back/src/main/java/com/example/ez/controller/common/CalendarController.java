package com.example.ez.controller.common;

import com.example.ez.service.contract.ContractService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

@RestController
@RequestMapping("/api/calendario")
public class CalendarController {

    private final ContractService contractService;

    public CalendarController(ContractService contractService) {
        this.contractService = contractService;
    }

    /**
     * Obtener eventos (entregas) para un mes específico
     */
    @GetMapping("/eventos")
    public ResponseEntity<EventosResponse> obtenerEventos(
            @RequestParam int mes,
            @RequestParam int anio,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        try {
            LocalDate inicio = LocalDate.of(anio, mes, 1);
            LocalDate fin = inicio.plusMonths(1).minusDays(1);
            
            // Obtener entregas programadas en el período
            var entregas = contractService.obtenerEntregasPorPeriodo(inicio, fin);
            
            Map<String, List<EventoData>> eventos = new HashMap<>();
            
            entregas.forEach(entrega -> {
                String fecha = entrega.getFechaPagoProgramada().toString();
                eventos.computeIfAbsent(fecha, k -> new ArrayList<>())
                    .add(new EventoData(
                        entrega.getIdEntrega(),
                        entrega.getContrato().getTitulo(),
                        entrega.getNumeroEntrega(),
                        entrega.getMonto(),
                        entrega.getEstado().toString(),
                        entrega.getDescripcion()
                    ));
            });
            
            return ResponseEntity.ok(new EventosResponse("success", eventos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new EventosResponse("error: " + e.getMessage(), new HashMap<>()));
        }
    }

    /**
     * Obtener evento específico de una fecha
     */
    @GetMapping("/evento/{fecha}")
    public ResponseEntity<Map<String, Object>> obtenerEvento(
            @PathVariable String fecha,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        try {
            LocalDate date = LocalDate.parse(fecha);
            var entregas = contractService.obtenerEntregasPorPeriodo(date, date);
            
            Map<String, Object> response = new HashMap<>();
            response.put("fecha", fecha);
            response.put("entregas", entregas);
            response.put("total_eventos", entregas.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Error obteniendo eventos: " + e.getMessage()
            ));
        }
    }

    /**
     * Marcar entrega como completada
     */
    @PostMapping("/marcar-completado/{entregaId}")
    public ResponseEntity<Map<String, String>> marcarCompletado(
            @PathVariable Long entregaId,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        try {
            contractService.completarEntrega(entregaId);
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Entrega marcada como completada"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error marcando entrega: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtener resumen de eventos para el mes
     */
    @GetMapping("/resumen")
    public ResponseEntity<ResumenEvento> obtenerResumen(
            @RequestParam int mes,
            @RequestParam int anio,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        try {
            LocalDate inicio = LocalDate.of(anio, mes, 1);
            LocalDate fin = inicio.plusMonths(1).minusDays(1);
            
            var entregas = contractService.obtenerEntregasPorPeriodo(inicio, fin);
            
            long pendientes = entregas.stream()
                .filter(e -> "PENDIENTE".equals(e.getEstado().toString()))
                .count();
            
            long completadas = entregas.stream()
                .filter(e -> "COMPLETADA".equals(e.getEstado().toString()))
                .count();
            
            return ResponseEntity.ok(new ResumenEvento(
                mes,
                anio,
                entregas.size(),
                (int) pendientes,
                (int) completadas
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Response DTO para eventos
     */
    public static class EventosResponse {
        private String status;
        private Map<String, List<EventoData>> eventos;

        public EventosResponse(String status, Map<String, List<EventoData>> eventos) {
            this.status = status;
            this.eventos = eventos;
        }

        public String getStatus() { return status; }
        public Map<String, List<EventoData>> getEventos() { return eventos; }
    }

    /**
     * Data para evento individual
     */
    public static class EventoData {
        private Long entregaId;
        private String titulo;
        private Integer numeroEntrega;
        private java.math.BigDecimal monto;
        private String estado;
        private String descripcion;

        public EventoData(Long entregaId, String titulo, Integer numeroEntrega, 
                         java.math.BigDecimal monto, String estado, String descripcion) {
            this.entregaId = entregaId;
            this.titulo = titulo;
            this.numeroEntrega = numeroEntrega;
            this.monto = monto;
            this.estado = estado;
            this.descripcion = descripcion;
        }

        public Long getEntregaId() { return entregaId; }
        public String getTitulo() { return titulo; }
        public Integer getNumeroEntrega() { return numeroEntrega; }
        public java.math.BigDecimal getMonto() { return monto; }
        public String getEstado() { return estado; }
        public String getDescripcion() { return descripcion; }
    }

    /**
     * Resumen de eventos del mes
     */
    public static class ResumenEvento {
        private int mes;
        private int anio;
        private int totalEventos;
        private int pendientes;
        private int completadas;

        public ResumenEvento(int mes, int anio, int totalEventos, int pendientes, int completadas) {
            this.mes = mes;
            this.anio = anio;
            this.totalEventos = totalEventos;
            this.pendientes = pendientes;
            this.completadas = completadas;
        }

        public int getMes() { return mes; }
        public int getAnio() { return anio; }
        public int getTotalEventos() { return totalEventos; }
        public int getPendientes() { return pendientes; }
        public int getCompletadas() { return completadas; }
    }
}