package com.example.ez.repository.contract;

import com.example.ez.model.contract.Payment;
import com.example.ez.model.enums.PaymentStatus;
import com.example.ez.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUsuario(User usuario);
    List<Payment> findByMercadoPagoPaymentId(String paymentId);
    List<Payment> findByMercadoPagoPreferenceId(String preferenceId);
    
    /**
     * Encuentra pagos completados después de una fecha específica
     */
    @Query("SELECT p FROM Payment p WHERE p.estado = 'COMPLETADO' AND p.fechaCreacion >= :since")
    List<Payment> findCompletedPaymentsSince(@Param("since") LocalDateTime since);
    
    /**
     * Suma total de pagos completados después de una fecha
     */
    @Query("SELECT COALESCE(SUM(p.monto), 0) FROM Payment p WHERE p.estado = 'COMPLETADO' AND p.fechaCreacion >= :since")
    List<Object> findTotalSalesAmountSince(@Param("since") LocalDateTime since);
    
    /**
     * Pagos recientes agrupados por día
     */
    @Query(value = "SELECT DATE(fecha_creacion) as fecha, SUM(monto) as total FROM pagos_ez WHERE fecha_creacion >= :since GROUP BY DATE(fecha_creacion)", 
           nativeQuery = true)
    List<?> findRecentPaymentsByDay(@Param("since") LocalDateTime since);
    
    /**
     * Últimos pagos completados ordenados por fecha
     */
    @Query("SELECT p.entrega.contrato.idContrato, p.entrega.contrato.titulo, p.entrega.contrato.ingeniero.nombre, p.entrega.contrato.cliente.nombre, p.monto, p.fechaCreacion FROM Payment p WHERE p.estado = 'COMPLETADO' ORDER BY p.fechaCreacion DESC LIMIT 10")
    List<?> findTop10ByEstadoOrderByFechaCreacionDesc();
}
