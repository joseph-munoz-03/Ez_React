package com.example.ez.repository.contract;

import com.example.ez.model.contract.Contract;
import com.example.ez.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByCliente(User cliente);
    List<Contract> findByIngeniero(User ingeniero);
    List<Contract> findByClienteOrIngeniero(User cliente, User ingeniero);
    Optional<Contract> findByIdContrato(Long id);
    
    /**
     * Encuentra contratos creados después de una fecha específica
     */
    @Query("SELECT c FROM Contract c WHERE c.fechaCreacion >= :from")
    List<Contract> findByCreatedAtGreaterThanEqual(@Param("from") LocalDateTime from);
    
    /**
     * Cuenta contratos con un estado específico
     */
    long countByEstado(String estado);
    
    /**
     * Encuentra contratos con un estado específico
     */
    List<Contract> findByEstado(String estado);
    
    /**
     * Encuentra contratos recientes (últimos 30 días) con datos del cliente
     */
    @Query("SELECT c.cliente.nombre, c.fechaCreacion FROM Contract c WHERE c.fechaCreacion >= :since ORDER BY c.fechaCreacion DESC")
    List<?> findRecentContracts(@Param("since") LocalDateTime since);
}
