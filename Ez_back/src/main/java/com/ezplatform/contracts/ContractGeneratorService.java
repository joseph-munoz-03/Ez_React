package com.ezplatform.contracts;

import com.ezplatform.entity.Contract;
import com.ezplatform.entity.User;
import com.ezplatform.entity.ContractStatus;
import com.ezplatform.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ContractGeneratorService {

    private final ContractRepository repository;

    public Contract generateContract(
            User client,
            User engineer,
            Double price) {

        Contract contract = new Contract();

        contract.setClient(client);
        contract.setEngineer(engineer);
        contract.setPrice(price);

        // ✅ CORREGIDO
        contract.setStatus(ContractStatus.PENDING_PAYMENT);

        contract.setStartDate(LocalDate.now());

        return repository.save(contract);
    }
}