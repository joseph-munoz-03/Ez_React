package com.example.ez.model.enums;

/**
 * Roles disponibles en el sistema
 */
public enum Role {
    ADMIN("Administrador"),          // Administrador del sistema
    INGENIERO("Ingeniero"),          // Usuario ingeniero/prestador
    CLIENTE("Cliente");              // Usuario cliente/contratante

    private final String descripcion;

    Role(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
