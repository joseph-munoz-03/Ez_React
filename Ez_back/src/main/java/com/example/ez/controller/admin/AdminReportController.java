package com.example.ez.controller.admin;

import com.example.ez.model.report.Report;
import com.example.ez.service.admin.AdminReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/reports")
@PreAuthorize("hasRole('ADMIN')")
public class AdminReportController {
    
    @Autowired
    private AdminReportService adminReportService;
    
    @GetMapping
    public ResponseEntity<Page<Report>> getAllReports(Pageable pageable) {
        return ResponseEntity.ok(adminReportService.getAllReports(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        Optional<Report> report = adminReportService.getReportById(id);
        return report.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/resolve")
    public ResponseEntity<Report> resolveReport(@PathVariable Long id) {
        Report resolvedReport = adminReportService.resolveReport(id);
        if (resolvedReport != null) {
            return ResponseEntity.ok(resolvedReport);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}/reject")
    public ResponseEntity<Report> rejectReport(@PathVariable Long id) {
        Report rejectedReport = adminReportService.rejectReport(id);
        if (rejectedReport != null) {
            return ResponseEntity.ok(rejectedReport);
        }
        return ResponseEntity.notFound().build();
    }
}
