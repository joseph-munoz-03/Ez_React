package com.example.ez.model.user;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users_ez")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsers;

    private String nombre;
    private String apellido;

    @Column(unique = true)
    private Long documentoUser;

    @Column(unique = true)
    private String email;

    private String contrasena;
    private LocalDate fechaNacimiento;
    private String genero;
    private String telefono;

    @Column(columnDefinition = "ENUM('activo','inactivo','suspendido')")
    private String estado = "activo";

    private LocalDateTime fechaRegistro = LocalDateTime.now();
    private LocalDateTime fechaActualizacion = LocalDateTime.now();

    // Getters y Setters
}