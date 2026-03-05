package com.example.ez.controller.admin;

import com.example.ez.model.marketplace.Publication;
import com.example.ez.service.admin.AdminMarketplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/publications")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMarketplaceController {
    
    @Autowired
    private AdminMarketplaceService adminMarketplaceService;
    
    @GetMapping
    public ResponseEntity<Page<Publication>> getAllPublications(Pageable pageable) {
        return ResponseEntity.ok(adminMarketplaceService.getAllPublications(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Publication> getPublicationById(@PathVariable Long id) {
        Optional<Publication> publication = adminMarketplaceService.getPublicationById(id);
        return publication.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        adminMarketplaceService.deletePublication(id);
        return ResponseEntity.ok().build();
    }
}
