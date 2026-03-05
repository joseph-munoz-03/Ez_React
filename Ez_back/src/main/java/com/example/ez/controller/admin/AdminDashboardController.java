package com.example.ez.controller.admin;

import com.example.ez.model.admin.DashboardAdminDTO;
import com.example.ez.service.admin.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {
    
    @Autowired
    private AdminDashboardService adminDashboardService;
    
    @GetMapping
    public ResponseEntity<DashboardAdminDTO> getDashboardStats() {
        DashboardAdminDTO dashboard = adminDashboardService.getDashboardStats();
        return ResponseEntity.ok(dashboard);
    }
}
