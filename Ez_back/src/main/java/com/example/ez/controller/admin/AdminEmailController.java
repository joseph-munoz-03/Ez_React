package com.example.ez.controller.admin;

import com.example.ez.model.enums.Role;
import com.example.ez.service.admin.AdminEmailService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/email")
@PreAuthorize("hasRole('ADMIN')")
public class AdminEmailController {
    
    @Autowired
    private AdminEmailService adminEmailService;
    
    @PostMapping("/send-to-all")
    public ResponseEntity<String> sendEmailToAll(@RequestBody EmailRequest request) {
        adminEmailService.sendEmailToAll(request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Correo enviado a todos los usuarios");
    }
    
    @PostMapping("/send-to-role")
    public ResponseEntity<String> sendEmailToRole(@RequestBody EmailToRoleRequest request) {
        adminEmailService.sendEmailToRole(request.getRole(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Correo enviado a usuarios con rol " + request.getRole());
    }
    
    @PostMapping("/send-to-users")
    public ResponseEntity<String> sendEmailToUsers(@RequestBody EmailToUsersRequest request) {
        adminEmailService.sendEmailToUsers(request.getUserIds(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Correo enviado a usuarios seleccionados");
    }
    
    // DTOs
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailRequest {
        private String subject;
        private String message;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailToRoleRequest {
        private Role role;
        private String subject;
        private String message;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailToUsersRequest {
        private List<Long> userIds;
        private String subject;
        private String message;
    }
}
