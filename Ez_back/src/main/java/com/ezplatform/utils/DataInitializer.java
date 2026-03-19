package com.ezplatform.utils;

import com.ezplatform.entity.Role;
import com.ezplatform.entity.User;
import com.ezplatform.repository.UserRepository;
import com.ezplatform.security.PasswordService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordService passwordService;

    @PostConstruct
    public void initUsers() {

        if (userRepository.count() > 0) return;

        userRepository.save(User.builder()
                .email("admin@ez.com")
                .password(passwordService.encode("Admin123*"))
                .role(Role.ADMIN)
                .build());

        userRepository.save(User.builder()
                .email("engineer@ez.com")
                .password(passwordService.encode("Engineer123*"))
                .role(Role.INGENIERO)
                .build());

        userRepository.save(User.builder()
                .email("user@ez.com")
                .password(passwordService.encode("User123*"))
                .role(Role.USER)
                .build());
    }

}