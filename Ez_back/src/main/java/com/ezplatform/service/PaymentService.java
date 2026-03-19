package com.ezplatform.service;

import com.ezplatform.entity.Contract;
import com.ezplatform.entity.ContractStatus;
import com.ezplatform.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ContractRepository contractRepository;

    public Contract markContractPaid(Long contractId){

        Contract contract = contractRepository.findById(contractId).orElseThrow();

        // ✅ CORREGIDO
        contract.setStatus(ContractStatus.IN_PROGRESS);

        return contractRepository.save(contract);
    }
}