package com.example.ez.service.user;

import com.example.ez.model.user.User;
import com.example.ez.model.enums.Role;
import com.example.ez.repository.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para gestionar operaciones de usuarios
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Buscar usuario por ID
     */
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + id));
    }

    /**
     * Buscar usuario por email
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Registrar nuevo usuario
     */
    public User registrarUsuario(User user) {
        // Verificar si email ya existe
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        // Encriptar contraseña
        user.setContrasena(passwordEncoder.encode(user.getContrasena()));
        
        // Establecer rol por defecto si no tiene
        if (user.getRoles().isEmpty()) {
            user.getRoles().add(Role.CLIENTE);
        }

        return userRepository.save(user);
    }

    /**
     * Actualizar perfil del usuario
     */
    public User actualizarPerfil(Long id, User userActualizado) {
        User usuario = findById(id);

        // Actualizar los campos específicos del perfil
        if (userActualizado.getNombre() != null && !userActualizado.getNombre().isBlank()) {
            usuario.setNombre(userActualizado.getNombre());
        }
        if (userActualizado.getApellido() != null && !userActualizado.getApellido().isBlank()) {
            usuario.setApellido(userActualizado.getApellido());
        }
        if (userActualizado.getApodo() != null && !userActualizado.getApodo().isBlank()) {
            usuario.setApodo(userActualizado.getApodo());
        }
        if (userActualizado.getDescripcion() != null) {
            usuario.setDescripcion(userActualizado.getDescripcion());
        }
        if (userActualizado.getTelefono() != null && !userActualizado.getTelefono().isBlank()) {
            usuario.setTelefono(userActualizado.getTelefono());
        }
        if (userActualizado.getFechaNacimiento() != null && !userActualizado.getFechaNacimiento().isBlank()) {
            usuario.setFechaNacimiento(userActualizado.getFechaNacimiento());
        }
        if (userActualizado.getGenero() != null) {
            usuario.setGenero(userActualizado.getGenero());
        }

        return userRepository.save(usuario);
    }

    /**
     * Actualizar foto de perfil
     */
    public User actualizarFotoPerfil(Long id, String fotoPerfil) {
        User usuario = findById(id);
        usuario.setFotoPerfil(fotoPerfil);
        return userRepository.save(usuario);
    }

    /**
     * Cambiar contraseña
     */
    public void cambiarContrasena(Long id, String contraseniaAntigua, String contraseniaNueva) {
        User usuario = findById(id);

        // Verificar que la contraseña antigua es correcta
        if (!passwordEncoder.matches(contraseniaAntigua, usuario.getContrasena())) {
            throw new IllegalArgumentException("La contraseña antigua no es correcta");
        }

        // Validar que la nueva contraseña no sea igual a la anterior
        if (passwordEncoder.matches(contraseniaNueva, usuario.getContrasena())) {
            throw new IllegalArgumentException("La nueva contraseña no puede ser igual a la anterior");
        }

        // Encriptar nueva contraseña
        usuario.setContrasena(passwordEncoder.encode(contraseniaNueva));
        userRepository.save(usuario);
    }

    /**
     * Obtener todos los usuarios
     */
    public List<User> obtenerTodosUsuarios() {
        return userRepository.findAll();
    }

    /**
     * Activar usuario
     */
    public User activarUsuario(Long id) {
        User usuario = findById(id);
        usuario.setEstado("activo");
        return userRepository.save(usuario);
    }

    /**
     * Desactivar usuario
     */
    public User desactivarUsuario(Long id) {
        User usuario = findById(id);
        usuario.setEstado("inactivo");
        return userRepository.save(usuario);
    }

    /**
     * Suspender usuario (incumplimiento, violación de términos, etc.)
     */
    public User suspenderUsuario(Long id) {
        User usuario = findById(id);
        usuario.setEstado("suspendido");
        return userRepository.save(usuario);
    }

    /**
     * Obtener saldo actual del usuario
     */
    public java.math.BigDecimal obtenerSaldo(Long id) {
        User usuario = findById(id);
        return usuario.getSaldo();
    }

    /**
     * Agregar saldo al usuario (depósito)
     */
    public User agregarSaldo(Long id, java.math.BigDecimal cantidad) {
        if (cantidad.compareTo(java.math.BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero");
        }

        User usuario = findById(id);
        usuario.setSaldo(usuario.getSaldo().add(cantidad));
        return userRepository.save(usuario);
    }

    /**
     * Restar saldo del usuario (retiro o pago)
     */
    public User restarSaldo(Long id, java.math.BigDecimal cantidad) {
        if (cantidad.compareTo(java.math.BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero");
        }

        User usuario = findById(id);
        if (usuario.getSaldo().compareTo(cantidad) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente. Saldo disponible: " + usuario.getSaldo());
        }

        usuario.setSaldo(usuario.getSaldo().subtract(cantidad));
        return userRepository.save(usuario);
    }

    /**
     * Vincular cuenta de Mercado Pago
     */
    public User vincularCuentaMercadoPago(Long id, String cuentaMercadoPago) {
        if (cuentaMercadoPago == null || cuentaMercadoPago.isBlank()) {
            throw new IllegalArgumentException("La cuenta de Mercado Pago no puede estar vacía");
        }

        User usuario = findById(id);
        usuario.setCuentaMercadoPago(cuentaMercadoPago);
        return userRepository.save(usuario);
    }

    /**
     * Asignar rol a usuario
     */
    public User asignarRol(Long id, Role rol) {
        User usuario = findById(id);
        usuario.getRoles().add(rol);
        return userRepository.save(usuario);
    }

    /**
     * Remover rol de usuario
     */
    public User removerRol(Long id, Role rol) {
        User usuario = findById(id);
        usuario.getRoles().remove(rol);
        return userRepository.save(usuario);
    }

    /**
     * Verificar si usuario tiene un rol específico
     */
    public boolean tieneRol(Long id, Role rol) {
        User usuario = findById(id);
        return usuario.getRoles().contains(rol);
    }

    /**
     * Eliminar usuario
     */
    public void eliminarUsuario(Long id) {
        User usuario = findById(id);
        userRepository.delete(usuario);
    }
}
