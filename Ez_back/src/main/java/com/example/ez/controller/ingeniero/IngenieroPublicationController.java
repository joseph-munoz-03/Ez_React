package com.example.ez.controller.ingeniero;

import com.example.ez.model.marketplace.Publication;
import com.example.ez.service.marketplace.PublicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ingeniero/publicaciones")
public class IngenieroPublicationController {

    private final PublicationService publicationService;

    public IngenieroPublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    /**
     * Crear nueva publicación
     */
    @PostMapping
    public ResponseEntity<Publication> crearPublicacion(
            @RequestBody Publication publication,
            Authentication authentication) {
        Long ingenieroId = Long.parseLong(authentication.getName());
        Publication created = publicationService.crearPublicacion(ingenieroId, publication);
        return ResponseEntity.ok(created);
    }

    /**
     * Obtener todas las publicaciones del ingeniero
     */
    @GetMapping("/mis-publicaciones")
    public ResponseEntity<List<Publication>> obtenerMisPublicaciones(Authentication authentication) {
        Long ingenieroId = Long.parseLong(authentication.getName());
        List<Publication> publicaciones = publicationService.obtenerPublicacionesUsuario(ingenieroId);
        return ResponseEntity.ok(publicaciones);
    }

    /**
     * Obtener publicación específica
     */
    @GetMapping("/{id}")
    public ResponseEntity<Publication> obtenerPublicacion(@PathVariable Long id) {
        Publication publication = publicationService.obtenerPublicacion(id);
        return ResponseEntity.ok(publication);
    }

    /**
     * Actualizar publicación
     */
    @PutMapping("/{id}")
    public ResponseEntity<Publication> actualizarPublicacion(
            @PathVariable Long id,
            @RequestBody Publication publication,
            Authentication authentication) {
        Publication updated = publicationService.actualizarPublicacion(id, publication);
        return ResponseEntity.ok(updated);
    }

    /**
     * Activar publicación
     */
    @PutMapping("/{id}/activar")
    public ResponseEntity<Publication> activarPublicacion(@PathVariable Long id) {
        Publication publication = publicationService.activarPublicacion(id);
        return ResponseEntity.ok(publication);
    }

    /**
     * Desactivar publicación
     */
    @PutMapping("/{id}/desactivar")
    public ResponseEntity<Publication> desactivarPublicacion(@PathVariable Long id) {
        Publication publication = publicationService.desactivarPublicacion(id);
        return ResponseEntity.ok(publication);
    }

    /**
     * Eliminar publicación
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPublicacion(@PathVariable Long id) {
        publicationService.eliminarPublicacion(id);
        return ResponseEntity.ok("Publicación eliminada");
    }

    /**
     * Agregar tecnología a publicación
     */
    @PostMapping("/{id}/tecnologia")
    public ResponseEntity<Publication> agregarTecnologia(
            @PathVariable Long id,
            @RequestParam String tecnologia) {
        Publication publication = publicationService.agregarTecnologia(id, tecnologia);
        return ResponseEntity.ok(publication);
    }

    /**
     * Remover tecnología de publicación
     */
    @DeleteMapping("/{id}/tecnologia")
    public ResponseEntity<Publication> removerTecnologia(
            @PathVariable Long id,
            @RequestParam String tecnologia) {
        Publication publication = publicationService.removerTecnologia(id, tecnologia);
        return ResponseEntity.ok(publication);
    }
}
