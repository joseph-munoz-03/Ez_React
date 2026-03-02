package com.example.ez.repository.chat;

import com.example.ez.model.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatIdChat(Long chatId);
    List<ChatMessage> findByChatIdChatOrderByFechaCreacionAsc(Long chatId);
}
