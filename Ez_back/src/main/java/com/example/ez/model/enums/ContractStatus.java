package com.example.ez.model.enums;

/**
 * Estados posibles de un contrato
 */
public enum ContractStatus {
    BORRADOR("Borrador"),           // Creado pero no aceptado
    ACEPTADO("Aceptado"),           // Aceptado por ambas partes
    RECHAZADO("Rechazado"),         // Rechazado por alguna parte
    EN_PROCESO("En Proceso"),       // Contrato en ejecución
    FINALIZADO("Finalizado"),       // Completado exitosamente
    CANCELADO("Cancelado");         // Cancelado antes de terminar

    private final String descripcion;

    ContractStatus(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
