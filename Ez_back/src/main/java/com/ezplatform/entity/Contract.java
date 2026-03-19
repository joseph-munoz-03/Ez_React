package com.ezplatform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Double amount;

    private Double price;

    // 🔥 CAMBIO CLAVE (ANTES ERA String)
    @Enumerated(EnumType.STRING)
    private ContractStatus status;

    private LocalDate startDate;
    private LocalDate endDate;

    // 🔥 NUEVOS (los usa tu backend)
    private Double totalAmount;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne
    @JoinColumn(name = "engineer_id")
    private User engineer;
}