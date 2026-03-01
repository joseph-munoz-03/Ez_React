package com.example.ez.model.contract;

import com.example.ez.model.enums.PaymentStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos_ez")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPago;

    private Integer idPedido;
    private String mercadoPagoPaymentId;
    private String mercadoPagoPreferenceId;
    private String mercadoPagoStatus;

    private BigDecimal montoPagado;
    private String moneda = "COP";

    @Enumerated(EnumType.STRING)
    private PaymentStatus estado = PaymentStatus.PENDIENTE;

    private LocalDateTime fechaPago = LocalDateTime.now();

    // Getters y Setters
}