package com.example.ez.repository.contract;

import com.example.ez.model.contract.Payment;
import com.example.ez.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUsuario(User usuario);
    List<Payment> findByMercadoPagoPaymentId(String paymentId);
    List<Payment> findByMercadoPagoPreferenceId(String preferenceId);
}
