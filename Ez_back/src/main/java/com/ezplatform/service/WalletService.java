package com.ezplatform.service;

import com.ezplatform.entity.User;
import com.ezplatform.entity.Wallet;
import com.ezplatform.repository.UserRepository;
import com.ezplatform.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public Wallet getWallet(String email){

        User user = userRepository.findByEmail(email).orElseThrow();

        return walletRepository.findByUser(user)
                .orElseGet(() -> createWallet(user));
    }

    public Wallet createWallet(User user){

        Wallet wallet = new Wallet();

        wallet.setUser(user);
        wallet.setBalance(0.0);

        return walletRepository.save(wallet);
    }

    public Wallet addBalance(User user, Double amount){

        Wallet wallet = walletRepository.findByUser(user).orElseThrow();

        wallet.setBalance(wallet.getBalance() + amount);

        return walletRepository.save(wallet);
    }

}