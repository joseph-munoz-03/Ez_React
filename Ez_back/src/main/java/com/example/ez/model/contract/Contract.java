package com.example.ez.model.contract;

import com.example.ez.model.enums.ContractStatus;
import com.example.ez.model.enums.PaymentType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "contrato_ez")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idContrato;

    private Integer idFormulario;
    private Integer idCliente;
    private Integer idIngeniero;

    @Enumerated(EnumType.STRING)
    private PaymentType tipoPago;

    private BigDecimal precioTotal;
    private BigDecimal porcentajeComision = BigDecimal.valueOf(10);
    private BigDecimal valorComision;
    private BigDecimal valorFinalIngeniero;

    @Enumerated(EnumType.STRING)
    private ContractStatus estado = ContractStatus.BORRADOR;

    private LocalDateTime fechaCreacion = LocalDateTime.now();
    private LocalDateTime fechaActualizacion = LocalDateTime.now();

    // Getters y Setters
}