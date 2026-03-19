package com.ezplatform.controller;

import com.ezplatform.entity.Contract;
import com.ezplatform.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/{engineerId}")
    public Contract createContract(
            @PathVariable Long engineerId,
            @RequestParam Double price,
            Principal principal){

        return contractService.createContract(
                principal.getName(),
                engineerId,
                price);

    }

    @GetMapping
    public List<Contract> getContracts(){

        return contractService.getContracts();

    }

}