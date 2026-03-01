package com.example.ez.service.contract;

import com.example.ez.model.contract.Contract;
import com.example.ez.repository.contract.ContractRepository;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    private final ContractRepository repository;

    public ContractService(ContractRepository repository) {
        this.repository = repository;
    }

    public Contract save(Contract contract) {
        return repository.save(contract);
    }
}