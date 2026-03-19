package com.ezplatform.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

    private final JwtService jwtService;

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest =
                (HttpServletRequest) request;

        String header = httpRequest.getHeader("Authorization");

        try {
            if (header != null && header.startsWith("Bearer ")) {

                String token = header.substring(7);

                // Intenta extraer info del token (puede fallar)
                jwtService.extractEmail(token);

            }
        } catch (Exception e) {
            // 🔥 IMPORTANTE: no bloquear la petición
            System.out.println("JWT inválido o error: " + e.getMessage());
        }

        // 🔓 Siempre continuar la cadena
        chain.doFilter(request, response);
    }
}