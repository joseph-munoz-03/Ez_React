package com.example.ez.service.admin;

import com.example.ez.model.user.User;
import com.example.ez.model.enums.Role;
import com.example.ez.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminUserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public User updateUser(Long id, User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Solo actualizar campos permitidos
            if (userDetails.getNombre() != null) {
                user.setNombre(userDetails.getNombre());
            }
            if (userDetails.getApellido() != null) {
                user.setApellido(userDetails.getApellido());
            }
            if (userDetails.getGenero() != null) {
                user.setGenero(userDetails.getGenero());
            }
            if (userDetails.getContrasena() != null) {
                user.setContrasena(userDetails.getContrasena());
            }
            if (userDetails.getEstado() != null) {
                user.setEstado(userDetails.getEstado());
            }
            
            return userRepository.save(user);
        }
        
        return null;
    }
    
    public void deleteUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEstado("INACTIVE");
            userRepository.save(user);
        }
    }
    
    public void banUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEstado("BANNED");
            userRepository.save(user);
        }
    }
}
