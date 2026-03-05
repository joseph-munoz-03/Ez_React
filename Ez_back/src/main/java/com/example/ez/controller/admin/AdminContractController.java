package com.example.ez.controller.admin;

import com.example.ez.model.contract.Contract;
import com.example.ez.service.admin.AdminContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/contracts")
@PreAuthorize("hasRole('ADMIN')")
public class AdminContractController {
    
    @Autowired
    private AdminContractService adminContractService;
    
    @GetMapping
    public ResponseEntity<Page<Contract>> getAllContracts(Pageable pageable) {
        return ResponseEntity.ok(adminContractService.getAllContracts(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        Optional<Contract> contract = adminContractService.getContractById(id);
        return contract.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
