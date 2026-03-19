package com.ezplatform.controller;

import com.ezplatform.payments.PaymentVerificationService;
import com.ezplatform.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentVerificationService verificationService;

    @PostMapping("/contract/{contractId}")
    public void payContract(@PathVariable Long contractId){

        paymentService.markContractPaid(contractId);

    }

    @PostMapping("/webhook/{contractId}")
    public void webhook(@PathVariable Long contractId){

        verificationService.verifyPayment(contractId);

    }

}