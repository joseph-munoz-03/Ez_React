package com.example.ez.repository.user;

import com.example.ez.model.user.User;
import com.example.ez.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    /**
     * Encuentra todos los usuarios que tienen un rol específico
     * Utiliza FIND_IN_SET por la estructura de roles en ElementCollection
     */
    @Query("SELECT DISTINCT u FROM User u WHERE :role MEMBER OF u.roles")
    List<User> findAllByRole(@Param("role") Role role);
    
    /**
     * Cuenta usuarios que tienen un rol específico
     */
    @Query("SELECT COUNT(DISTINCT u) FROM User u WHERE :role MEMBER OF u.roles")
    long countByRole(@Param("role") Role role);
}
