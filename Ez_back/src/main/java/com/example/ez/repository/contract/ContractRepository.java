package com.example.ez.repository.contract;

import com.example.ez.model.contract.Contract;
import com.example.ez.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByCliente(User cliente);
    List<Contract> findByIngeniero(User ingeniero);
    List<Contract> findByClienteOrIngeniero(User cliente, User ingeniero);
    Optional<Contract> findByIdContrato(Long id);
}
