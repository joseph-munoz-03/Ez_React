package com.example.ez.service.auth;

import com.example.ez.config.JwtUtil;
import com.example.ez.model.user.User;
import com.example.ez.repository.user.UserRepository;
import com.example.ez.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    
    @Autowired
    private EmailService emailService;

    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String email, String password) {
        Optional<User> user = repo.findByEmail(email);

        if (user.isPresent() && encoder.matches(password, user.get().getContrasena())) {
            // Enviar correo de bienvenida de vuelta
            try {
                emailService.sendSimpleEmail(
                    email,
                    "Bienvenido de nuevo a EZ",
                    "Hola " + user.get().getNombre() + ",\n\nTe has conectado exitosamente a tu cuenta en EZ.\n\nSi no fue tu, por favor cambia tu contraseña inmediatamente."
                );
            } catch (Exception e) {
                // Log error pero no interrumpir el login
                System.err.println("Error sending login email: " + e.getMessage());
            }
            
            return jwtUtil.generateToken(email);
        }

        throw new RuntimeException("Credenciales inválidas");
    }

    public User register(User user) {
        user.setContrasena(encoder.encode(user.getContrasena()));
        User savedUser = repo.save(user);
        
        // Enviar correo de bienvenida
        try {
            emailService.sendSimpleEmail(
                user.getEmail(),
                "Bienvenido a EZ",
                "Hola " + user.getNombre() + ",\n\nTu cuenta ha sido creada exitosamente en EZ.\n\nAhora puedes inicia sesión y comenzar a usar nuestra plataforma.\n\n¡Gracias por unirte a nosotros!"
            );
        } catch (Exception e) {
            // Log error pero no interrumpir el registro
            System.err.println("Error sending welcome email: " + e.getMessage());
        }
        
        return savedUser;
    }
}
