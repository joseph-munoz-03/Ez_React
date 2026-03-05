package com.example.ez.service.marketplace;

import com.example.ez.model.marketplace.Publication;
import com.example.ez.model.user.User;
import com.example.ez.model.enums.Role;
import com.example.ez.repository.marketplace.PublicationRepository;
import com.example.ez.repository.user.UserRepository;
import com.example.ez.service.email.EmailService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Servicio para gestionar publicaciones del marketplace
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PublicationService {

    private final PublicationRepository publicationRepository;
    private final UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;

    /**
     * Crear nueva publicación
     */
    public Publication crearPublicacion(Long usuarioId, Publication publication) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        publication.setUsuario(usuario);
        publication.setEstado("ACTIVO");

        Publication savedPublication = publicationRepository.save(publication);
        
        // Enviar correo a todos los ingenieros nuevos servicios disponibles
        try {
            List<User> ingenieros = userRepository.findAllByRole(Role.INGENIERO);
            for (User ingeniero : ingenieros) {
                // No enviar al autor de la publicación
                if (!ingeniero.getIdUsers().equals(usuarioId)) {
                    emailService.sendSimpleEmail(
                        ingeniero.getEmail(),
                        "Nueva publicación en EZ Marketplace",
                        "Hola " + ingeniero.getNombre() + ",\n\nNueva publicación disponible:\n" +
                        "Título: " + publication.getTitulo() + "\n" +
                        "Descripción: " + publication.getDescripcion() + "\n" +
                        "Precio: $" + publication.getPrecio() + "\n\n" +
                        "Visita el marketplace para más detalles."
                    );
                }
            }
        } catch (Exception e) {
            System.err.println("Error sending marketplace notification: " + e.getMessage());
        }
        
        return savedPublication;
    }

    /**
     * Obtener publicación por ID
     */
    public Publication obtenerPublicacion(Long id) {
        return publicationRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Publicación no encontrada"));
    }

    /**
     * Obtener todas las publicaciones activas
     */
    public List<Publication> obtenerTodasPublicaciones() {
        return publicationRepository.findByEstado("ACTIVO");
    }

    /**
     * Obtener publicaciones del usuario
     */
    public List<Publication> obtenerPublicacionesUsuario(Long usuarioId) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        return publicationRepository.findByUsuario(usuario);
    }

    /**
     * Filtrar por base de datos
     */
    public List<Publication> filtrarPorBaseDatos(String baseDatos) {
        return publicationRepository.findByBasesDatos(baseDatos);
    }

    /**
     * Filtrar por lenguaje de programación
     */
    public List<Publication> filtrarPorLenguaje(String lenguaje) {
        return publicationRepository.findByLenguajeProgramacion(lenguaje);
    }

    /**
     * Buscar por título
     */
    public List<Publication> buscarPorTitulo(String titulo) {
        return publicationRepository.findByTituloContainingIgnetCase(titulo);
    }

    /**
     * Filtrar por base de datos Y lenguaje
     */
    public List<Publication> filtrarPorBaseYLenguaje(String baseDatos, String lenguaje) {
        List<Publication> publicaciones = filtrarPorBaseDatos(baseDatos);
        publicaciones.retainAll(filtrarPorLenguaje(lenguaje));
        return publicaciones;
    }

    /**
     * Actualizar publicación
     */
    public Publication actualizarPublicacion(Long id, Publication publicationActualizada) {
        Publication publication = obtenerPublicacion(id);

        if (publicationActualizada.getTitulo() != null) {
            publication.setTitulo(publicationActualizada.getTitulo());
        }
        if (publicationActualizada.getDescripcion() != null) {
            publication.setDescripcion(publicationActualizada.getDescripcion());
        }
        if (publicationActualizada.getPrecio() != null) {
            publication.setPrecio(publicationActualizada.getPrecio());
        }
        if (publicationActualizada.getBasesDatos() != null) {
            publication.setBasesDatos(publicationActualizada.getBasesDatos());
        }
        if (publicationActualizada.getLenguajeProgramacion() != null) {
            publication.setLenguajeProgramacion(publicationActualizada.getLenguajeProgramacion());
        }
        if (publicationActualizada.getTecnologias() != null && !publicationActualizada.getTecnologias().isEmpty()) {
            publication.setTecnologias(publicationActualizada.getTecnologias());
        }

        return publicationRepository.save(publication);
    }

    /**
     * Activar publicación
     */
    public Publication activarPublicacion(Long id) {
        Publication publication = obtenerPublicacion(id);
        publication.setEstado("ACTIVO");
        return publicationRepository.save(publication);
    }

    /**
     * Desactivar publicación
     */
    public Publication desactivarPublicacion(Long id) {
        Publication publication = obtenerPublicacion(id);
        publication.setEstado("INACTIVO");
        return publicationRepository.save(publication);
    }

    /**
     * Eliminar publicación
     */
    public void eliminarPublicacion(Long id) {
        Publication publication = obtenerPublicacion(id);
        publicationRepository.delete(publication);
    }

    /**
     * Agregar tecnología a publicación
     */
    public Publication agregarTecnologia(Long id, String tecnologia) {
        Publication publication = obtenerPublicacion(id);
        publication.getTecnologias().add(tecnologia);
        return publicationRepository.save(publication);
    }

    /**
     * Remover tecnología de publicación
     */
    public Publication removerTecnologia(Long id, String tecnologia) {
        Publication publication = obtenerPublicacion(id);
        publication.getTecnologias().remove(tecnologia);
        return publicationRepository.save(publication);
    }
}
