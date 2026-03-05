package com.example.ez.model.report;

import com.example.ez.model.enums.ReportReason;
import com.example.ez.model.enums.ReportStatus;
import com.example.ez.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reports_ez")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "reporter_user_id")
    private User reporterUser;
    
    @ManyToOne
    @JoinColumn(name = "reported_user_id", nullable = true)
    private User reportedUser;
    
    @Column(name = "publication_id", nullable = true)
    private Long publicationId;
    
    @Column(name = "chat_id", nullable = true)
    private Long chatId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportReason reason;
    
    @Column(length = 500)
    private String description;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportStatus status = ReportStatus.OPEN;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
