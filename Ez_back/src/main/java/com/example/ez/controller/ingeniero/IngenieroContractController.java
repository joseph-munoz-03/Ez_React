package com.example.ez.controller.ingeniero;

import com.example.ez.model.contract.Contract;
import com.example.ez.service.contract.ContractService;
import com.example.ez.service.email.EmailService;
import com.example.ez.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ingeniero/contratos")
public class IngenieroContractController {

    private final ContractService contractService;
    private final UserService userService;
    private final EmailService emailService;

    public IngenieroContractController(ContractService contractService, 
                                      UserService userService,
                                      EmailService emailService) {
        this.contractService = contractService;
        this.userService = userService;
        this.emailService = emailService;
    }

    /**
     * Obtener todos los contratos del ingeniero autenticado
     */
    @GetMapping("/mis-contratos")
    public ResponseEntity<List<Contract>> obtenerMisContratos(Authentication authentication) {
        Long ingenieroId = Long.parseLong(authentication.getName());
        List<Contract> contratos = contractService.obtenerContratosIngeniero(ingenieroId);
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
     * Iniciar ejecución del contrato
     */
    @PutMapping("/{contratoId}/iniciar")
    public ResponseEntity<Contract> iniciarEjecucion(
            @PathVariable Long contratoId,
            Authentication authentication) {
        Contract contrato = contractService.iniciarEjecucion(contratoId);
        return ResponseEntity.ok(contrato);
    }

    /**
     * Finalizar contrato
     */
    @PutMapping("/{contratoId}/finalizar")
    public ResponseEntity<Contract> finalizarContrato(
            @PathVariable Long contratoId,
            Authentication authentication) {
        Contract contrato = contractService.finalizarContrato(contratoId);
        return ResponseEntity.ok(contrato);
    }

    /**
     * Obtener entregas del contrato
     */
    @GetMapping("/{contratoId}/entregas")
    public ResponseEntity<?> obtenerEntregas(@PathVariable Long contratoId) {
        var entregas = contractService.obtenerEntregas(contratoId);
        return ResponseEntity.ok(entregas);
    }

    /**
     * Completar una entrega
     */
    @PutMapping("/completar-entrega/{entregaId}")
    public ResponseEntity<String> completarEntrega(
            @PathVariable Long entregaId,
            Authentication authentication) {
        contractService.completarEntrega(entregaId);
        return ResponseEntity.ok("Entrega completada");
    }
}
