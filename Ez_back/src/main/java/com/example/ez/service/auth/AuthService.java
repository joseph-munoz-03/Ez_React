package com.example.ez.service.auth;

import com.example.ez.config.JwtUtil;
import com.example.ez.model.user.User;
import com.example.ez.repository.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String email, String password) {
        Optional<User> user = repo.findByEmail(email);

        if (user.isPresent() && encoder.matches(password, user.get().getContrasena())) {
            return jwtUtil.generateToken(email);
        }

        throw new RuntimeException("Credenciales inválidas");
    }

    public User register(User user) {
        user.setContrasena(encoder.encode(user.getContrasena()));
        return repo.save(user);
    }
}
