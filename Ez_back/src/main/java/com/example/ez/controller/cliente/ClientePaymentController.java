package com.example.ez.controller.cliente;

import com.example.ez.service.payment.MercadoPagoService;
import com.example.ez.service.payment.PaymentService;
import com.example.ez.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cliente/pagos")
public class ClientePaymentController {

    private final PaymentService paymentService;
    private final MercadoPagoService mercadoPagoService;
    private final UserService userService;

    public ClientePaymentController(PaymentService paymentService, 
                                   MercadoPagoService mercadoPagoService,
                                   UserService userService) {
        this.paymentService = paymentService;
        this.mercadoPagoService = mercadoPagoService;
        this.userService = userService;
    }

    /**
     * Obtener saldo actual del usuario
     */
    @GetMapping("/saldo")
    public ResponseEntity<Map<String, Object>> obtenerSaldo(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        BigDecimal saldo = userService.obtenerSaldo(usuarioId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("usuarioId", usuarioId);
        response.put("saldo", saldo);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Recargar saldo (crear preferencia de pago)
     */
    @PostMapping("/recargar")
    public ResponseEntity<Map<String, String>> recargarSaldo(
            @RequestBody RecargarRequest request,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        String preferenceId = mercadoPagoService.crearPreferenciaPago(
            usuarioId,
            "Recarga de Saldo",
            request.getMonto(),
            "https://tu-dominio.com/cliente/pagos/exito"
        );
        
        String enlacePago = mercadoPagoService.generarEnlacePago(preferenceId);
        
        Map<String, String> response = new HashMap<>();
        response.put("preferenceId", preferenceId);
        response.put("enlacePago", enlacePago);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Retirar saldo
     */
    @PostMapping("/retirar")
    public ResponseEntity<String> retirarSaldo(
            @RequestBody RetirarRequest request,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        
        paymentService.procesarRetiro(usuarioId, request.getMonto());
        
        return ResponseEntity.ok("Retiro procesado");
    }

    /**
     * Obtener historial de pagos
     */
    @GetMapping("/historial")
    public ResponseEntity<?> obtenerHistorial(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        var pagos = paymentService.obtenerHistorialPagos(usuarioId);
        return ResponseEntity.ok(pagos);
    }

    /**
     * Obtener pagos pendientes
     */
    @GetMapping("/pendientes")
    public ResponseEntity<?> obtenerPendientes(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        var pagos = paymentService.obtenerPagosPendientes(usuarioId);
        return ResponseEntity.ok(pagos);
    }

    /**
     * Obtener pagos completados
     */
    @GetMapping("/completados")
    public ResponseEntity<?> obtenerCompletados(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        var pagos = paymentService.obtenerPagosCompletados(usuarioId);
        return ResponseEntity.ok(pagos);
    }

    /**
     * DTO para recargar saldo
     */
    public static class RecargarRequest {
        private BigDecimal monto;

        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { this.monto = monto; }
    }

    /**
     * DTO para retirar saldo
     */
    public static class RetirarRequest {
        private BigDecimal monto;

        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { this.monto = monto; }
    }
}
