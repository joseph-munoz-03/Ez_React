package com.example.ez.controller.common;

import com.example.ez.model.contract.Payment;
import com.example.ez.model.user.User;
import com.example.ez.service.payment.PaymentService;
import com.example.ez.service.payment.MercadoPagoService;
import com.example.ez.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
public class PaymentController {

    private final PaymentService paymentService;
    private final MercadoPagoService mercadoPagoService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService, 
                           MercadoPagoService mercadoPagoService,
                           UserService userService) {
        this.paymentService = paymentService;
        this.mercadoPagoService = mercadoPagoService;
        this.userService = userService;
    }

    /**
     * Obtener saldo actual del usuario
     */
    @GetMapping("/mi-saldo")
    public ResponseEntity<SaldoResponse> obtenerMiSaldo(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        User usuario = userService.findById(usuarioId);
        return ResponseEntity.ok(new SaldoResponse(usuarioId, usuario.getSaldo()));
    }

    /**
     * Obtener historial de pagos del usuario
     */
    @GetMapping("/historial")
    public ResponseEntity<List<Payment>> obtenerHistorial(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        List<Payment> pagos = paymentService.obtenerHistorialPagos(usuarioId);
        return ResponseEntity.ok(pagos);
    }

    /**
     * Obtener pagos pendientes
     */
    @GetMapping("/pendientes")
    public ResponseEntity<List<Payment>> obtenerPendientes(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        List<Payment> pendientes = paymentService.obtenerPagosPendientes(usuarioId);
        return ResponseEntity.ok(pendientes);
    }

    /**
     * Obtener pagos completados
     */
    @GetMapping("/completados")
    public ResponseEntity<List<Payment>> obtenerCompletados(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        List<Payment> completados = paymentService.obtenerPagosCompletados(usuarioId);
        return ResponseEntity.ok(completados);
    }

    /**
     * Procesar depósito/recarga de saldo (Mercado Pago)
     */
    @PostMapping("/recargar")
    public ResponseEntity<Map<String, String>> procesarRecarga(
            @RequestBody RecargaRequest request,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        try {
            // Crear preferencia en Mercado Pago
            String preferenceId = mercadoPagoService.crearPreferenciaPago(
                usuarioId, 
                "Recarga de saldo - " + request.getMonto() + " COP",
                request.getMonto(),
                "https://tu-dominio.com/pagos/success"
            );
            
            // Generar enlace de pago
            String enlacePago = mercadoPagoService.generarEnlacePago(preferenceId);
            
            // Crear registro de pago pendiente
            Payment pago = paymentService.procesarDeposito(usuarioId, request.getMonto(), preferenceId);
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "enlace_pago", enlacePago,
                "preference_id", preferenceId,
                "message", "Enlace de pago generado correctamente"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error procesando recarga: " + e.getMessage()
            ));
        }
    }

    /**
     * Procesar retiro de saldo a Mercado Pago
     */
    @PostMapping("/retirar")
    public ResponseEntity<Map<String, String>> procesarRetiro(
            @RequestBody RetiroRequest request,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        try {
            User usuario = userService.findById(usuarioId);
            
            // Validar saldo suficiente
            if (usuario.getSaldo().compareTo(request.getMonto()) < 0) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Saldo insuficiente para realizar el retiro"
                ));
            }
            
            // Crear preferencia de retiro en Mercado Pago
            String retiroId = mercadoPagoService.crearPreferenciaRetiro(
                usuarioId,
                request.getMonto(),
                request.getCuenta_mercadopago()
            );
            
            // Procesar retiro
            Payment pago = paymentService.procesarRetiro(usuarioId, request.getMonto());
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "retiro_id", retiroId,
                "monto", request.getMonto().toString(),
                "message", "Retiro procesado correctamente"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error procesando retiro: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtener detalles de un pago
     */
    @GetMapping("/{pagoId}")
    public ResponseEntity<Payment> obtenerPago(@PathVariable Long pagoId) {
        Payment pago = paymentService.obtenerPago(pagoId);
        return ResponseEntity.ok(pago);
    }

    /**
     * Request DTO para recarga
     */
    public static class RecargaRequest {
        private BigDecimal monto;

        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { this.monto = monto; }
    }

    /**
     * Request DTO para retiro
     */
    public static class RetiroRequest {
        private BigDecimal monto;
        private String cuenta_mercadopago;

        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { this.monto = monto; }
        public String getCuenta_mercadopago() { return cuenta_mercadopago; }
        public void setCuenta_mercadopago(String cuenta_mercadopago) { this.cuenta_mercadopago = cuenta_mercadopago; }
    }

    /**
     * Response DTO para saldo
     */
    public static class SaldoResponse {
        private Long usuarioId;
        private BigDecimal saldo;

        public SaldoResponse(Long usuarioId, BigDecimal saldo) {
            this.usuarioId = usuarioId;
            this.saldo = saldo;
        }

        public Long getUsuarioId() { return usuarioId; }
        public BigDecimal getSaldo() { return saldo; }
    }
}