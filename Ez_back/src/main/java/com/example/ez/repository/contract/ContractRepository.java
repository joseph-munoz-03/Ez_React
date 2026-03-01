package com.example.ez.repository.contract;

import com.example.ez.model.contract.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Integer> {
}