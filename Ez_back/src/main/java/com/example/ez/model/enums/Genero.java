package com.example.ez.model.enums;

/**
 * Géneros disponibles para perfil de usuario
 */
public enum Genero {
    MASCULINO("Masculino"),
    FEMENINO("Femenino"),
    PREFIERO_NO_DECIRLO("Prefiero no decirlo"),
    OTRO("Otro");

    private final String descripcion;

    Genero(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
