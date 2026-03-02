package com.example.ez.model.enums;

/**
 * Estados posibles de un pago
 */
public enum PaymentStatus {
    PENDIENTE("Pendiente"),       // Esperando procesamiento
    COMPLETADO("Completado"),     // Pago completado exitosamente
    FALLIDO("Fallido"),           // Pago fallido
    CANCELADO("Cancelado");       // Pago cancelado

    private final String descripcion;

    PaymentStatus(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
