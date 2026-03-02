package com.example.ez.service.contract;

import com.example.ez.model.contract.Contract;
import com.example.ez.model.contract.Entrega;
import com.example.ez.model.contract.Payment;
import com.example.ez.model.enums.ContractStatus;
import com.example.ez.model.enums.EntregaStatus;
import com.example.ez.model.enums.PaymentStatus;
import com.example.ez.model.enums.PaymentType;
import com.example.ez.model.user.User;
import com.example.ez.repository.contract.ContractRepository;
import com.example.ez.repository.contract.EntregaRepository;
import com.example.ez.repository.contract.PaymentRepository;
import com.example.ez.repository.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

/**
 * Servicio para gestionar contratos y entregas
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ContractService {

    private final ContractRepository contractRepository;
    private final EntregaRepository entregaRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    /**
     * Crear nuevo contrato
     */
    public Contract crearContrato(Long clienteId, Long ingenieroId, Contract contrato) {
        User cliente = userRepository.findById(clienteId)
            .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));
        User ingeniero = userRepository.findById(ingenieroId)
            .orElseThrow(() -> new EntityNotFoundException("Ingeniero no encontrado"));

        contrato.setCliente(cliente);
        contrato.setIngeniero(ingeniero);
        contrato.setEstado(ContractStatus.BORRADOR);
        contrato.setFechaInicio(LocalDate.now());

        // Calcular fecha fin
        if (contrato.getDiasVigencia() != null) {
            contrato.setFechaFin(LocalDate.now().plusDays(contrato.getDiasVigencia()));
        }

        // Calcular comisión e ingeniero
        if (contrato.getPorcentajeComision() == null) {
            contrato.setPorcentajeComision(BigDecimal.valueOf(10));
        }

        BigDecimal comision = contrato.getPrecioTotal()
            .multiply(contrato.getPorcentajeComision())
            .divide(BigDecimal.valueOf(100));
        contrato.setValorComision(comision);
        contrato.setValorFinalIngeniero(contrato.getPrecioTotal().subtract(comision));

        Contract contratoGuardado = contractRepository.save(contrato);

        // Crear entregas automáticamente
        generarEntregas(contratoGuardado);

        return contratoGuardado;
    }

    /**
     * Generar entregas automáticamente basadas en el contrato
     */
    private void generarEntregas(Contract contrato) {
        BigDecimal montoPorEntrega = contrato.getPrecioTotal()
            .divide(BigDecimal.valueOf(contrato.getNumPagos()), 2, RoundingMode.HALF_UP);

        LocalDate fechaEntrega = contrato.getFechaInicio();
        long diasPorEntrega = contrato.getDiasVigencia() / contrato.getNumPagos();

        for (int i = 1; i <= contrato.getNumPagos(); i++) {
            Entrega entrega = new Entrega();
            entrega.setContrato(contrato);
            entrega.setNumeroEntrega(i);
            entrega.setFechaPagoProgramada(fechaEntrega);
            entrega.setMonto(montoPorEntrega);
            entrega.setEstado(EntregaStatus.PENDIENTE);
            entrega.setDescripcion("Entrega " + i + " de " + contrato.getNumPagos());

            entregaRepository.save(entrega);

            fechaEntrega = fechaEntrega.plusDays(diasPorEntrega);
        }
    }

    /**
     * Obtener contrato por ID
     */
    public Contract obtenerContrato(Long id) {
        return contractRepository.findByIdContrato(id)
            .orElseThrow(() -> new EntityNotFoundException("Contrato no encontrado con ID: " + id));
    }

    /**
     * Obtener contratos del cliente
     */
    public List<Contract> obtenerContratosCliente(Long clienteId) {
        User cliente = userRepository.findById(clienteId)
            .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));
        return contractRepository.findByCliente(cliente);
    }

    /**
     * Obtener contratos del ingeniero
     */
    public List<Contract> obtenerContratosIngeniero(Long ingenieroId) {
        User ingeniero = userRepository.findById(ingenieroId)
            .orElseThrow(() -> new EntityNotFoundException("Ingeniero no encontrado"));
        return contractRepository.findByIngeniero(ingeniero);
    }

    /**
     * Actualizar estado del contrato
     */
    public Contract actualizarEstado(Long id, ContractStatus nuevoEstado) {
        Contract contrato = obtenerContrato(id);
        contrato.setEstado(nuevoEstado);
        return contractRepository.save(contrato);
    }

    /**
     * Aceptar contrato (cliente acepta)
     */
    public Contract aceptarContrato(Long id) {
        Contract contrato = obtenerContrato(id);
        if (!contrato.getEstado().equals(ContractStatus.BORRADOR)) {
            throw new IllegalStateException("Solo se pueden aceptar contratos en estado BORRADOR");
        }
        contrato.setEstado(ContractStatus.ACEPTADO);
        return contractRepository.save(contrato);
    }

    /**
     * Rechazar contrato
     */
    public Contract rechazarContrato(Long id) {
        Contract contrato = obtenerContrato(id);
        if (!contrato.getEstado().equals(ContractStatus.BORRADOR) && 
            !contrato.getEstado().equals(ContractStatus.ACEPTADO)) {
            throw new IllegalStateException("No se puede rechazar un contrato en estado: " + contrato.getEstado());
        }
        contrato.setEstado(ContractStatus.RECHAZADO);
        return contractRepository.save(contrato);
    }

    /**
     * Iniciar ejecución del contrato
     */
    public Contract iniciarEjecucion(Long id) {
        Contract contrato = obtenerContrato(id);
        if (!contrato.getEstado().equals(ContractStatus.ACEPTADO)) {
            throw new IllegalStateException("El contrato debe estar ACEPTADO para iniciar ejecución");
        }
        contrato.setEstado(ContractStatus.EN_PROCESO);
        contrato.setFechaInicio(LocalDate.now());
        return contractRepository.save(contrato);
    }

    /**
     * Finalizar contrato
     */
    public Contract finalizarContrato(Long id) {
        Contract contrato = obtenerContrato(id);
        contrato.setEstado(ContractStatus.FINALIZADO);
        return contractRepository.save(contrato);
    }

    /**
     * Cancelar contrato
     */
    public Contract cancelarContrato(Long id) {
        Contract contrato = obtenerContrato(id);
        if (contrato.getEstado().equals(ContractStatus.FINALIZADO) ||
            contrato.getEstado().equals(ContractStatus.CANCELADO)) {
            throw new IllegalStateException("No se puede cancelar un contrato " + contrato.getEstado());
        }
        contrato.setEstado(ContractStatus.CANCELADO);
        return contractRepository.save(contrato);
    }

    /**
     * Obtener entregas de un contrato
     */
    public List<Entrega> obtenerEntregas(Long contratoId) {
        return entregaRepository.findByContratoIdContrato(contratoId);
    }

    /**
     * Obtener entrega por rango de fechas (para calendario)
     */
    public List<Entrega> obtenerEntregasPorPeriodo(LocalDate inicio, LocalDate fin) {
        return entregaRepository.findByFechaPagoProgramadaBetween(inicio, fin);
    }

    /**
     * Marcar entrega como completada
     */
    public Entrega completarEntrega(Long entregaId) {
        Entrega entrega = entregaRepository.findById(entregaId)
            .orElseThrow(() -> new EntityNotFoundException("Entrega no encontrada"));
        entrega.setEstado(EntregaStatus.COMPLETADA);
        return entregaRepository.save(entrega);
    }

    /**
     * Obtener pagos pendientes del contrato
     */
    public List<Payment> obtenerPagosContrato(Long contratoId) {
        Contract contrato = obtenerContrato(contratoId);
        return contrato.getIngeniero().getClass().getName().contains("User") ? 
            paymentRepository.findByUsuario(contrato.getIngeniero()) :
            paymentRepository.findAll();
    }

    /**
     * Crear pago para una entrega
     */
    public Payment crearPago(Long entregaId) {
        Entrega entrega = entregaRepository.findById(entregaId)
            .orElseThrow(() -> new EntityNotFoundException("Entrega no encontrada"));

        Payment pago = new Payment();
        pago.setEntrega(entrega);
        pago.setUsuario(entrega.getContrato().getCliente());
        pago.setMonto(entrega.getMonto());
        pago.setEstado(PaymentStatus.PENDIENTE);
        pago.setTipo(PaymentType.POR_ENTREGA);

        return paymentRepository.save(pago);
    }
}
