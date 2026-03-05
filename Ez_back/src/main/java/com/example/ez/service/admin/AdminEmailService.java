package com.example.ez.service.admin;

import com.example.ez.model.enums.Role;
import com.example.ez.repository.user.UserRepository;
import com.example.ez.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminEmailService {
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private UserRepository userRepository;
    
    public void sendEmailToAll(String subject, String message) {
        var users = userRepository.findAll();
        users.forEach(user -> sendEmail(user.getEmail(), subject, processMessage(message, user)));
    }
    
    public void sendEmailToRole(Role role, String subject, String message) {
        var users = userRepository.findAllByRole(role);
        users.forEach(user -> sendEmail(user.getEmail(), subject, processMessage(message, user)));
    }
    
    public void sendEmailToUsers(List<Long> userIds, String subject, String message) {
        var users = userRepository.findAllById(userIds);
        users.forEach(user -> sendEmail(user.getEmail(), subject, processMessage(message, user)));
    }
    
    public void sendEmail(String to, String subject, String message) {
        try {
            emailService.sendSimpleEmail(to, subject, message);
        } catch (Exception e) {
            // Log error
            System.err.println("Error sending email to " + to + ": " + e.getMessage());
        }
    }
    
    private String processMessage(String message, com.example.ez.model.user.User user) {
        String processedMessage = message;
        
        // Reemplazar variables dinámicas
        processedMessage = processedMessage.replace("{{perfil}}", user.getNombre() + " " + user.getApellido());
        processedMessage = processedMessage.replace("{{correo}}", user.getEmail());
        String roleStr = user.getRoles().isEmpty() ? "SIN_ROL" : user.getRoles().iterator().next().toString();
        processedMessage = processedMessage.replace("{{cuenta}}", roleStr);
        
        return processedMessage;
    }
}
