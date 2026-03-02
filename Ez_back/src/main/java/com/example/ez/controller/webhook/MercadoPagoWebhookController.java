package com.example.ez.controller.webhook;

import com.example.ez.service.payment.PaymentService;
import com.example.ez.service.payment.MercadoPagoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/mercadopago")
public class MercadoPagoWebhookController {

    private final PaymentService paymentService;
    private final MercadoPagoService mercadoPagoService;

    public MercadoPagoWebhookController(PaymentService paymentService, 
                                       MercadoPagoService mercadoPagoService) {
        this.paymentService = paymentService;
        this.mercadoPagoService = mercadoPagoService;
    }

    /**
     * Webhook para notificaciones de Mercado Pago
     * Recibe notificaciones cuando un pago es completado, rechazado, pendiente, etc.
     */
    @PostMapping("/webhook")
    public ResponseEntity<Map<String, String>> procesarWebhook(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long data_id,
            @RequestBody(required = false) Map<String, Object> payload) {
        
        try {
            // Validar que sea notificación de pago
            if ("payment".equals(type) && data_id != null) {
                String paymentId = data_id.toString();
                
                // Procesar webhook
                mercadoPagoService.procesarWebhook(paymentId, null);
                
                // Obtener estado del pago
                String estado = mercadoPagoService.obtenerEstadoPago(paymentId);
                
                // Si está completado, marcar como pagado
                if ("approved".equals(estado)) {
                    paymentService.marcarComoCompletado(Long.parseLong(paymentId));
                } else if ("rejected".equals(estado)) {
                    paymentService.marcarComoFallido(Long.parseLong(paymentId));
                }
                
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Webhook procesado correctamente"
                ));
            }
            
            return ResponseEntity.ok(Map.of(
                "status", "ignored",
                "message", "Tipo de notificación no procesada"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error procesando webhook: " + e.getMessage()
            ));
        }
    }
}
