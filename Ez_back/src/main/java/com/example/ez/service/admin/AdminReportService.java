package com.example.ez.service.admin;

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
public class AdminReportService {
    
    @Autowired
    private ReportRepository reportRepository;
    
    public Page<Report> getAllReports(Pageable pageable) {
        return reportRepository.findAll(pageable);
    }
    
    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }
    
    public Report resolveReport(Long id) {
        Optional<Report> reportOptional = reportRepository.findById(id);
        
        if (reportOptional.isPresent()) {
            Report report = reportOptional.get();
            report.setStatus(ReportStatus.RESOLVED);
            report.setUpdatedAt(LocalDateTime.now());
            return reportRepository.save(report);
        }
        
        return null;
    }
    
    public Report rejectReport(Long id) {
        Optional<Report> reportOptional = reportRepository.findById(id);
        
        if (reportOptional.isPresent()) {
            Report report = reportOptional.get();
            report.setStatus(ReportStatus.REJECTED);
            report.setUpdatedAt(LocalDateTime.now());
            return reportRepository.save(report);
        }
        
        return null;
    }
}
