package com.example.ez.model.enums;

/**
 * Estados posibles de una entrega/pago programado
 */
public enum EntregaStatus {
    PENDIENTE("Pendiente"),       // Esperando la fecha de entrega/pago
    COMPLETADA("Completada"),    // Entrega/pago completado
    FALLIDA("Fallida"),          // Entrega/pago fallido
    CANCELADA("Cancelada");      // Entrega/pago cancelada

    private final String descripcion;

    EntregaStatus(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
