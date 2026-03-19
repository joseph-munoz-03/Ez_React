package com.ezplatform.controller;

import com.ezplatform.entity.Wallet;
import com.ezplatform.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @GetMapping
    public Wallet getWallet(Principal principal){

        return walletService.getWallet(principal.getName());

    }

}