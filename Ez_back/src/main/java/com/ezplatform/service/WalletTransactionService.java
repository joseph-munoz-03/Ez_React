package com.ezplatform.service;

import com.ezplatform.entity.Wallet;
import com.ezplatform.entity.WalletTransaction;
import com.ezplatform.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WalletTransactionService {

    private final WalletTransactionRepository repository;

    public WalletTransaction registerTransaction(
            Wallet wallet,
            Double amount,
            String type){

        WalletTransaction tx = new WalletTransaction();

        tx.setWallet(wallet);
        tx.setAmount(amount);
        tx.setType(type);
        tx.setCreatedAt(LocalDateTime.now());

        return repository.save(tx);
    }

}