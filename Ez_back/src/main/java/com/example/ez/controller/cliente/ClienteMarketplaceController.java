package com.example.ez.controller.cliente;

import com.example.ez.model.marketplace.Publication;
import com.example.ez.service.marketplace.PublicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cliente/marketplace")
public class ClienteMarketplaceController {

    private final PublicationService publicationService;

    public ClienteMarketplaceController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    /**
     * Obtener todas las publicaciones activas
     */
    @GetMapping
    public ResponseEntity<List<Publication>> obtenerTodasPublicaciones() {
        List<Publication> publicaciones = publicationService.obtenerTodasPublicaciones();
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
     * Filtrar publicaciones por base de datos
     */
    @GetMapping("/filtro/base-datos")
    public ResponseEntity<List<Publication>> filtrarPorBaseDatos(
            @RequestParam String baseDatos) {
        List<Publication> publicaciones = publicationService.filtrarPorBaseDatos(baseDatos);
        return ResponseEntity.ok(publicaciones);
    }

    /**
     * Filtrar publicaciones por lenguaje de programación
     */
    @GetMapping("/filtro/lenguaje")
    public ResponseEntity<List<Publication>> filtrarPorLenguaje(
            @RequestParam String lenguaje) {
        List<Publication> publicaciones = publicationService.filtrarPorLenguaje(lenguaje);
        return ResponseEntity.ok(publicaciones);
    }

    /**
     * Filtrar publicaciones por base de datos Y lenguaje
     */
    @GetMapping("/filtro/base-y-lenguaje")
    public ResponseEntity<List<Publication>> filtrarPorBaseYLenguaje(
            @RequestParam String baseDatos,
            @RequestParam String lenguaje) {
        List<Publication> publicaciones = publicationService.filtrarPorBaseYLenguaje(baseDatos, lenguaje);
        return ResponseEntity.ok(publicaciones);
    }

    /**
     * Buscar publicaciones por título
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Publication>> buscarPorTitulo(
            @RequestParam String titulo) {
        List<Publication> publicaciones = publicationService.buscarPorTitulo(titulo);
        return ResponseEntity.ok(publicaciones);
    }
}
