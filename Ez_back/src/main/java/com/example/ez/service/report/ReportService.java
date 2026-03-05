package com.example.ez.service.report;

import com.example.ez.model.report.Report;
import com.example.ez.model.enums.ReportStatus;
import com.example.ez.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReportService {
    
    @Autowired
    private ReportRepository reportRepository;
    
    public Report createReport(Report report) {
        report.setCreatedAt(LocalDateTime.now());
        report.setStatus(ReportStatus.OPEN);
        return reportRepository.save(report);
    }
    
    public Page<Report> getAllReports(Pageable pageable) {
        return reportRepository.findAll(pageable);
    }
    
    public Page<Report> getReportsByStatus(ReportStatus status, Pageable pageable) {
        return reportRepository.findByStatus(status, pageable);
    }
    
    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }
    
    public Report updateReportStatus(Long id, ReportStatus status) {
        Optional<Report> reportOptional = reportRepository.findById(id);
        
        if (reportOptional.isPresent()) {
            Report report = reportOptional.get();
            report.setStatus(status);
            report.setUpdatedAt(LocalDateTime.now());
            return reportRepository.save(report);
        }
        
        return null;
    }
    
    public Report resolveReport(Long id) {
        return updateReportStatus(id, ReportStatus.RESOLVED);
    }
    
    public Report rejectReport(Long id) {
        return updateReportStatus(id, ReportStatus.REJECTED);
    }
}
