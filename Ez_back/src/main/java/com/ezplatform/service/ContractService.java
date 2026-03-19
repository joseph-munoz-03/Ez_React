package com.ezplatform.service;

import com.ezplatform.contracts.ContractGeneratorService;
import com.ezplatform.contracts.ContractCalendarService;
import com.ezplatform.entity.Contract;
import com.ezplatform.entity.User;
import com.ezplatform.repository.ContractRepository;
import com.ezplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContractService {

    private final ContractRepository contractRepository;
    private final UserRepository userRepository;

    private final ContractGeneratorService generatorService;
    private final ContractCalendarService calendarService;

    public Contract createContract(
            String clientEmail,
            Long engineerId,
            Double price){

        User client = userRepository
                .findByEmail(clientEmail)
                .orElseThrow();

        User engineer = userRepository
                .findById(engineerId)
                .orElseThrow();

        Contract contract = generatorService.generateContract(client, engineer, price);

        calendarService.createEvent(contract);

        return contract;

    }

    public List<Contract> getContracts(){

        return contractRepository.findAll();

    }

}