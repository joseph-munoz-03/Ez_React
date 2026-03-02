package com.example.ez.model.contract;

import com.example.ez.model.enums.PaymentStatus;
import com.example.ez.model.enums.PaymentType;
import com.example.ez.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos_ez")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Long idPago;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private User usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_entrega", nullable = true)
    private Entrega entrega;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType tipo = PaymentType.POR_ENTREGA;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus estado = PaymentStatus.PENDIENTE;

    @Column(length = 100)
    private String mercadoPagoPaymentId;

    @Column(length = 100)
    private String mercadoPagoPreferenceId;

    @Column(length = 50)
    private String mercadoPagoStatus;

    @Column(length = 10)
    private String moneda = "COP";

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "fecha_completacion")
    private LocalDateTime fechaCompletacion;

    @PreUpdate
    protected void onUpdate() {
        if (estado == PaymentStatus.COMPLETADO && fechaCompletacion == null) {
            fechaCompletacion = LocalDateTime.now();
        }
    }
}
