package com.example.ez.model.contract;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "entrega_ez")
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEntrega;

    private Integer idContrato;
    private String descripcion;
    private LocalDateTime fechaEntrega;

    // Getters y Setters
}