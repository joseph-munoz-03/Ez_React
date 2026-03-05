package com.example.ez.repository.report;

import com.example.ez.model.report.Report;
import com.example.ez.model.enums.ReportStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Page<Report> findByStatus(ReportStatus status, Pageable pageable);
    Long countByStatus(ReportStatus status);
    
    /**
     * Reportes recientes agrupados por día
     */
    @Query(value = "SELECT DATE(created_at) as fecha, COUNT(*) as total FROM reports_ez WHERE created_at >= :since GROUP BY DATE(created_at)", 
           nativeQuery = true)
    List<?> findRecentReportsByDay(@Param("since") LocalDateTime since);
    
    /**
     * Últimos 3 reportes ordenados por fecha de creación (descendente)
     */
    List<Report> findTop3ByOrderByCreatedAtDesc();
}
