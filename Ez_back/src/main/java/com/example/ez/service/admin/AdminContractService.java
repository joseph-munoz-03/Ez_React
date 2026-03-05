package com.example.ez.service.admin;

import com.example.ez.model.contract.Contract;
import com.example.ez.repository.contract.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminContractService {
    
    @Autowired
    private ContractRepository contractRepository;
    
    public Page<Contract> getAllContracts(Pageable pageable) {
        return contractRepository.findAll(pageable);
    }
    
    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }
}
