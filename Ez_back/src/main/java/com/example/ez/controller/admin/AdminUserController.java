package com.example.ez.controller.admin;

import com.example.ez.model.user.User;
import com.example.ez.service.admin.AdminUserService;
import com.example.ez.service.admin.AdminExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
    
    @Autowired
    private AdminUserService adminUserService;
    
    @Autowired
    private AdminExcelService adminExcelService;
    
    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(adminUserService.getAllUsers(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = adminUserService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = adminUserService.updateUser(id, userDetails);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminUserService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/ban")
    public ResponseEntity<Void> banUser(@PathVariable Long id) {
        adminUserService.banUser(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadUsersFromExcel(@RequestParam("file") MultipartFile file) {
        try {
            adminExcelService.uploadUsersFromExcel(file);
            return ResponseEntity.ok("Usuarios cargados exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cargar usuarios: " + e.getMessage());
        }
    }
    
    @GetMapping("/template")
    public ResponseEntity<byte[]> downloadTemplate() {
        try {
            byte[] template = adminExcelService.generateTemplateExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=template_usuarios.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(template);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
