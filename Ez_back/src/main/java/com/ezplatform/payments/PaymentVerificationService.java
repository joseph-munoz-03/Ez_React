package com.ezplatform.payments;

import com.ezplatform.entity.Contract;
import com.ezplatform.entity.ContractStatus;
import com.ezplatform.entity.User;
import com.ezplatform.entity.Wallet;
import com.ezplatform.repository.ContractRepository;
import com.ezplatform.repository.UserRepository;
import com.ezplatform.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentVerificationService {

    private final ContractRepository contractRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public void verifyPayment(Long contractId){

        Contract contract = contractRepository.findById(contractId).orElseThrow();

        User engineer = contract.getEngineer();

        Wallet wallet = walletRepository.findByUser(engineer).orElseThrow();

        Double commission = contract.getPrice() * 0.1;

        Double engineerAmount = contract.getPrice() - commission;

        wallet.setBalance(wallet.getBalance() + engineerAmount);

        walletRepository.save(wallet);

        contract.setStatus(ContractStatus.COMPLETED); // ✅ enum

        contractRepository.save(contract);

    }

}