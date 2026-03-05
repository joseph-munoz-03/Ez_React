package com.example.ez.service.admin;

import com.example.ez.model.chat.Chat;
import com.example.ez.model.chat.ChatMessage;
import com.example.ez.repository.chat.ChatRepository;
import com.example.ez.repository.chat.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminChatService {
    
    @Autowired
    private ChatRepository chatRepository;
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    public Page<Chat> getAllChats(Pageable pageable) {
        return chatRepository.findAll(pageable);
    }
    
    public Optional<Chat> getChatById(Long id) {
        return chatRepository.findById(id);
    }
    
    public List<ChatMessage> getChatMessages(Long chatId) {
        return chatMessageRepository.findByChatIdChatOrderByFechaCreacionAsc(chatId);
    }
}
