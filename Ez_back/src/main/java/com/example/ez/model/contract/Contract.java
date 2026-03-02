package com.example.ez.model.contract;

import com.example.ez.model.enums.ContractStatus;
import com.example.ez.model.enums.PaymentType;
import com.example.ez.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "contrato_ez")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contrato")
    private Long idContrato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false)
    private User cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ingeniero", nullable = false)
    private User ingeniero;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal precioTotal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType tipoPago = PaymentType.POR_ENTREGA;

    @Column(precision = 5, scale = 2)
    private BigDecimal porcentajeComision = BigDecimal.valueOf(10.00);

    @Column(precision = 12, scale = 2)
    private BigDecimal valorComision;

    @Column(precision = 12, scale = 2)
    private BigDecimal valorFinalIngeniero;

    @Column(nullable = false)
    private Integer diasVigencia;

    @Column(nullable = false)
    private Integer numPagos;

    @Column(nullable = false)
    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContractStatus estado = ContractStatus.BORRADOR;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}
