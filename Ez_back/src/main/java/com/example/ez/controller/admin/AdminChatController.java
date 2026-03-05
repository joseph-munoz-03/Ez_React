package com.example.ez.controller.admin;

import com.example.ez.model.chat.Chat;
import com.example.ez.model.chat.ChatMessage;
import com.example.ez.service.admin.AdminChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/chats")
@PreAuthorize("hasRole('ADMIN')")
public class AdminChatController {
    
    @Autowired
    private AdminChatService adminChatService;
    
    @GetMapping
    public ResponseEntity<Page<Chat>> getAllChats(Pageable pageable) {
        return ResponseEntity.ok(adminChatService.getAllChats(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Chat> getChatById(@PathVariable Long id) {
        Optional<Chat> chat = adminChatService.getChatById(id);
        return chat.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/messages")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@PathVariable Long id) {
        List<ChatMessage> messages = adminChatService.getChatMessages(id);
        return ResponseEntity.ok(messages);
    }
}
