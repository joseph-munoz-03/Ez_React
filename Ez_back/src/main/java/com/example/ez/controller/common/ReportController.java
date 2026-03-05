package com.example.ez.controller.common;

import com.example.ez.model.report.Report;
import com.example.ez.service.report.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@PreAuthorize("isAuthenticated()")
public class ReportController {
    
    @Autowired
    private ReportService reportService;
    
    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        Report createdReport = reportService.createReport(report);
        return ResponseEntity.ok(createdReport);
    }
    
    @GetMapping
    public ResponseEntity<Page<Report>> getAllReports(Pageable pageable) {
        return ResponseEntity.ok(reportService.getAllReports(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        var report = reportService.getReportById(id);
        return report.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
