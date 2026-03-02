package com.example.ez.repository.contract;

import com.example.ez.model.contract.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {
    List<Entrega> findByContratoIdContrato(Long contratoId);
    List<Entrega> findByFechaPagoProgramadaBetween(LocalDate inicio, LocalDate fin);
}
