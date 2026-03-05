package com.example.ez.repository.marketplace;

import com.example.ez.model.marketplace.Publication;
import com.example.ez.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findByUsuario(User usuario);
    List<Publication> findByEstado(String estado);
    List<Publication> findByTituloContainingIgnetCase(String titulo);
    
    @Query("SELECT p FROM Publication p WHERE p.basesDatos LIKE %:baseDatos% AND p.estado = 'ACTIVO'")
    List<Publication> findByBasesDatos(@Param("baseDatos") String baseDatos);
    
    @Query("SELECT p FROM Publication p WHERE p.lenguajeProgramacion LIKE %:lenguaje% AND p.estado = 'ACTIVO'")
    List<Publication> findByLenguajeProgramacion(@Param("lenguaje") String lenguaje);
    
    @Query("SELECT p FROM Publication p WHERE p.usuario.idUsers = :usuarioId AND p.estado = 'ACTIVO'")
    List<Publication> findByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    /**
     * Últimas 2 publicaciones ordenadas por fecha de creación (descendente)
     */
    List<Publication> findTop2ByOrderByCreatedAtDesc();
}
