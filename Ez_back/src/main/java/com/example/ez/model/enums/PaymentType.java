package com.example.ez.model.enums;

/**
 * Tipos de pago disponibles en contratos
 */
public enum PaymentType {
    POR_ENTREGA("Por Entrega"),          // Pago dividido por entregas
    TOTAL_INMEDIATO("Total Inmediato");  // Pago total al inicio

    private final String descripcion;

    PaymentType(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
