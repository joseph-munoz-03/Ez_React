package com.example.ez.controller.cliente;

import com.example.ez.model.contract.Contract;
import com.example.ez.service.contract.ContractService;
import com.example.ez.service.email.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cliente/contratos")
public class ClienteContractController {

    private final ContractService contractService;
    private final EmailService emailService;

    public ClienteContractController(ContractService contractService, EmailService emailService) {
        this.contractService = contractService;
        this.emailService = emailService;
    }

    /**
     * Obtener todos los contratos del cliente autenticado
     */
    @GetMapping("/mis-contratos")
    public ResponseEntity<List<Contract>> obtenerMisContratos(Authentication authentication) {
        Long clienteId = Long.parseLong(authentication.getName());
        List<Contract> contratos = contractService.obtenerContratosCliente(clienteId);
        return ResponseEntity.ok(contratos);
    }

    /**
     * Obtener contrato específico por ID
     */
    @GetMapping("/{contratoId}")
    public ResponseEntity<Contract> obtenerContrato(@PathVariable Long contratoId) {
        Contract contrato = contractService.obtenerContrato(contratoId);
        return ResponseEntity.ok(contrato);
    }

    /**
     * Aceptar contrato (cambiar a ACEPTADO)
     */
    @PutMapping("/{contratoId}/aceptar")
    public ResponseEntity<Contract> aceptarContrato(
            @PathVariable Long contratoId,
            Authentication authentication) {
        Contract contrato = contractService.aceptarContrato(contratoId);
        return ResponseEntity.ok(contrato);
    }

    /**
     * Rechazar contrato (cambiar a RECHAZADO)
     */
    @PutMapping("/{contratoId}/rechazar")
    public ResponseEntity<String> rechazarContrato(
            @PathVariable Long contratoId,
            Authentication authentication) {
        contractService.rechazarContrato(contratoId);
        return ResponseEntity.ok("Contrato rechazado");
    }

    /**
     * Cancelar contrato
     */
    @DeleteMapping("/{contratoId}")
    public ResponseEntity<String> cancelarContrato(
            @PathVariable Long contratoId,
            Authentication authentication) {
        contractService.cancelarContrato(contratoId);
        return ResponseEntity.ok("Contrato cancelado");
    }

    /**
     * Obtener entregas del contrato
     */
    @GetMapping("/{contratoId}/entregas")
    public ResponseEntity<?> obtenerEntregas(@PathVariable Long contratoId) {
        var entregas = contractService.obtenerEntregas(contratoId);
        return ResponseEntity.ok(entregas);
    }
}
