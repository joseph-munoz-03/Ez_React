package com.example.ez.service.payment;

import com.example.ez.model.contract.Payment;
import com.example.ez.model.enums.PaymentStatus;
import com.example.ez.model.user.User;
import com.example.ez.repository.contract.PaymentRepository;
import com.example.ez.repository.user.UserRepository;
import com.example.ez.service.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Servicio para gestionar pagos y saldo de usuarios
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    /**
     * Procesar depósito (recargar saldo)
     */
    public Payment procesarDeposito(Long usuarioId, BigDecimal monto, String referenciaMercadoPago) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Crear registro de pago
        Payment pago = new Payment();
        pago.setUsuario(usuario);
        pago.setMonto(monto);
        pago.setEstado(PaymentStatus.COMPLETADO);
        pago.setMercadoPagoPaymentId(referenciaMercadoPago);
        pago.setFechaCompletacion(LocalDateTime.now());

        // Agregar saldo al usuario
        userService.agregarSaldo(usuarioId, monto);

        return paymentRepository.save(pago);
    }

    /**
     * Procesar retiro (transferencia a cuenta bancaria)
     */
    public Payment procesarRetiro(Long usuarioId, BigDecimal monto) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Validar que tiene saldo suficiente
        if (usuario.getSaldo().compareTo(monto) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para retiro");
        }

        // Crear registro de pago
        Payment pago = new Payment();
        pago.setUsuario(usuario);
        pago.setMonto(monto.negate());  // Negativo para retiro
        pago.setEstado(PaymentStatus.PENDIENTE);

        // Restar saldo del usuario
        userService.restarSaldo(usuarioId, monto);

        return paymentRepository.save(pago);
    }

    /**
     * Obtener historial de pagos del usuario
     */
    public List<Payment> obtenerHistorialPagos(Long usuarioId) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        return paymentRepository.findByUsuario(usuario);
    }

    /**
     * Obtener pago por ID
     */
    public Payment obtenerPago(Long id) {
        return paymentRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Pago no encontrado"));
    }

    /**
     * Marcar pago como completado
     */
    public Payment marcarComoCompletado(Long id) {
        Payment pago = obtenerPago(id);
        pago.setEstado(PaymentStatus.COMPLETADO);
        pago.setFechaCompletacion(LocalDateTime.now());
        return paymentRepository.save(pago);
    }

    /**
     * Marcar pago como fallido
     */
    public Payment marcarComoFallido(Long id) {
        Payment pago = obtenerPago(id);
        pago.setEstado(PaymentStatus.FALLIDO);
        return paymentRepository.save(pago);
    }

    /**
     * Cancelar pago
     */
    public Payment cancelarPago(Long id) {
        Payment pago = obtenerPago(id);
        
        // Si el pago fue completado y era un depósito, devolver el saldo
        if (pago.getEstado() == PaymentStatus.COMPLETADO && pago.getMonto().compareTo(BigDecimal.ZERO) > 0) {
            userService.restarSaldo(pago.getUsuario().getIdUsers(), pago.getMonto());
        }

        pago.setEstado(PaymentStatus.CANCELADO);
        return paymentRepository.save(pago);
    }

    /**
     * Obtener pagos pendientes del usuario
     */
    public List<Payment> obtenerPagosPendientes(Long usuarioId) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        
        List<Payment> pagos = paymentRepository.findByUsuario(usuario);
        return pagos.stream()
            .filter(p -> p.getEstado() == PaymentStatus.PENDIENTE)
            .toList();
    }

    /**
     * Obtener pagos completados del usuario
     */
    public List<Payment> obtenerPagosCompletados(Long usuarioId) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        
        List<Payment> pagos = paymentRepository.findByUsuario(usuario);
        return pagos.stream()
            .filter(p -> p.getEstado() == PaymentStatus.COMPLETADO)
            .toList();
    }

    /**
     * Buscar pago por referencia Mercado Pago
     */
    public Payment obtenerPagoPorReferenciaMercadoPago(String paymentId) {
        List<Payment> pagos = paymentRepository.findByMercadoPagoPaymentId(paymentId);
        return pagos.isEmpty() ? null : pagos.get(0);
    }
}
