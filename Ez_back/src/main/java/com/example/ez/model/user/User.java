package com.example.ez.model.user;

import com.example.ez.model.enums.Genero;
import com.example.ez.model.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users_ez")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_users")
    private Long idUsers;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(unique = true)
    private Long documentoUser;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String contrasena;

    private String fechaNacimiento;

    @Enumerated(EnumType.STRING)
    private Genero genero;

    private String telefono;

    @Column(columnDefinition = "ENUM('activo','inactivo','suspendido') DEFAULT 'activo'")
    private String estado = "activo";

    // Nuevos campos
    @Column(length = 100)
    private String apodo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 500)
    private String fotoPerfil;

    @Column(precision = 12, scale = 2)
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(length = 100)
    private String cuentaMercadoPago;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
        name = "usuarios_roles",
        joinColumns = @JoinColumn(name = "id_user")
    )
    @Column(name = "id_rol")
    private Set<Role> roles = new HashSet<>();

    @Column(name = "fecha_registro", nullable = false, updatable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}
