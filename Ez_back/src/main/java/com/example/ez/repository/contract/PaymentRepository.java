package com.example.ez.repository.contract;

import com.example.ez.model.contract.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}