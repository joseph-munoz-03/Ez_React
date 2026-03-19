package com.ezplatform.service;

import com.ezplatform.dto.AuthRequest;
import com.ezplatform.dto.AuthResponse;
import com.ezplatform.entity.Role;
import com.ezplatform.entity.User;
import com.ezplatform.repository.UserRepository;
import com.ezplatform.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // 🔐 LOGIN
    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }

    // 📝 REGISTER
    public AuthResponse register(AuthRequest request) {

        // 🔒 validar si ya existe
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El usuario ya existe");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)      
                .provider("LOCAL")    
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }
}