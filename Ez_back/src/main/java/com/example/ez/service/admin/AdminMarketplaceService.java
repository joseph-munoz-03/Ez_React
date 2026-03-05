package com.example.ez.service.admin;

import com.example.ez.model.marketplace.Publication;
import com.example.ez.repository.marketplace.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminMarketplaceService {
    
    @Autowired
    private PublicationRepository publicationRepository;
    
    @Autowired
    private AdminEmailService adminEmailService;
    
    public Page<Publication> getAllPublications(Pageable pageable) {
        return publicationRepository.findAll(pageable);
    }
    
    public Optional<Publication> getPublicationById(Long id) {
        return publicationRepository.findById(id);
    }
    
    public void deletePublication(Long id) {
        Optional<Publication> publicationOptional = publicationRepository.findById(id);
        
        if (publicationOptional.isPresent()) {
            Publication publication = publicationOptional.get();
            
            // Enviar correo al propietario notificando la eliminación
            if (publication.getUsuario() != null) {
                String subject = "Tu publicación en EZ ha sido eliminada";
                String message = "Estimado/a " + publication.getUsuario().getNombre() + 
                                ",\n\nLamentablemente, tu publicación '" + publication.getTitulo() + 
                                "' ha sido eliminada por incumplimiento de nuestras políticas.\n\nSi tienes alguna duda, contacta al administrador.";
                
                adminEmailService.sendEmail(publication.getUsuario().getEmail(), subject, message);
            }
            
            publicationRepository.delete(publication);
        }
    }
}
