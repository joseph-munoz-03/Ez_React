package com.example.ez.controller.common;

import com.example.ez.model.user.User;
import com.example.ez.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Obtener perfil del usuario autenticado
     */
    @GetMapping("/me")
    public ResponseEntity<User> obtenerMiPerfil(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        User user = userService.findById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * Obtener perfil de usuario por ID
     */
    @GetMapping("/{id}/perfil")
    public ResponseEntity<User> obtenerPerfil(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Actualizar perfil del usuario
     */
    @PutMapping("/{id}/perfil")
    public ResponseEntity<User> actualizarPerfil(
            @PathVariable Long id,
            @RequestBody User userActualizado,
            Authentication authentication) {
        // Verificar que el usuario solo pueda actualizar su propio perfil
        Long userId = Long.parseLong(authentication.getName());
        if (!id.equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        User updated = userService.actualizarPerfil(id, userActualizado);
        return ResponseEntity.ok(updated);
    }

    /**
     * Actualizar foto de perfil del usuario
     */
    @PutMapping("/{id}/foto")
    public ResponseEntity<User> actualizarFoto(
            @PathVariable Long id,
            @RequestParam String urlFoto,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        if (!id.equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        User updated = userService.actualizarFotoPerfil(id, urlFoto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Cambiar contraseña del usuario
     */
    @PutMapping("/{id}/seguridad/cambiar-contrasena")
    public ResponseEntity<String> cambiarContrasena(
            @PathVariable Long id,
            @RequestBody CambiarContrasenaRequest request,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        if (!id.equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        userService.cambiarContrasena(id, request.getContrasenAntiqua(), request.getContrasenanueva());
        return ResponseEntity.ok("Contraseña actualizada exitosamente");
    }

    /**
     * Obtener saldo del usuario
     */
    @GetMapping("/{id}/saldo")
    public ResponseEntity<SaldoResponse> obtenerSaldo(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        if (!id.equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        User user = userService.findById(id);
        return ResponseEntity.ok(new SaldoResponse(user.getIdUsers(), user.getSaldo()));
    }

    /**
     * Clase DTO para cambio de contraseña
     */
    public static class CambiarContrasenaRequest {
        private String contrasenAntiqua;
        private String contrasenanueva;

        public String getContrasenAntiqua() {
            return contrasenAntiqua;
        }

        public void setContrasenAntiqua(String contrasenAntiqua) {
            this.contrasenAntiqua = contrasenAntiqua;
        }

        public String getContrasenanueva() {
            return contrasenanueva;
        }

        public void setContrasenanueva(String contrasenanueva) {
            this.contrasenanueva = contrasenanueva;
        }
    }

    /**
     * Clase DTO para respuesta de saldo
     */
    public static class SaldoResponse {
        private Long usuarioId;
        private java.math.BigDecimal saldo;

        public SaldoResponse(Long usuarioId, java.math.BigDecimal saldo) {
            this.usuarioId = usuarioId;
            this.saldo = saldo;
        }

        public Long getUsuarioId() {
            return usuarioId;
        }

        public java.math.BigDecimal getSaldo() {
            return saldo;
        }
    }
}
