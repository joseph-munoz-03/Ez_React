package com.example.ez.repository.chat;

import com.example.ez.model.chat.Chat;
import com.example.ez.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByUsuario1OrUsuario2(User usuario1, User usuario2);
    Optional<Chat> findByUsuario1AndUsuario2OrUsuario2AndUsuario1(
        User usuario1, User usuario2, User usuario3, User usuario4
    );
}
