package com.example.ez.service.user;

import com.example.ez.model.user.User;
import com.example.ez.repository.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}