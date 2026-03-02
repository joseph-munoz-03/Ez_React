package com.example.ez.service.chat;

import com.example.ez.model.chat.Chat;
import com.example.ez.model.chat.ChatMessage;
import com.example.ez.model.user.User;
import com.example.ez.repository.chat.ChatRepository;
import com.example.ez.repository.chat.ChatMessageRepository;
import com.example.ez.repository.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para gestionar chats y mensajes
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    /**
     * Obtener o crear chat entre dos usuarios
     */
    public Chat obtenerOCrearChat(Long usuario1Id, Long usuario2Id) {
        User usuario1 = userRepository.findById(usuario1Id)
            .orElseThrow(() -> new EntityNotFoundException("Usuario 1 no encontrado"));
        User usuario2 = userRepository.findById(usuario2Id)
            .orElseThrow(() -> new EntityNotFoundException("Usuario 2 no encontrado"));

        // Buscar chat existente entre estos dos usuarios
        Optional<Chat> chatExistente = chatRepository.findByUsuario1AndUsuario2OrUsuario2AndUsuario1(
            usuario1, usuario2, usuario2, usuario1
        );

        if (chatExistente.isPresent()) {
            return chatExistente.get();
        }

        // Crear nuevo chat
        Chat nuevoChat = new Chat();
        nuevoChat.setUsuario1(usuario1);
        nuevoChat.setUsuario2(usuario2);
        return chatRepository.save(nuevoChat);
    }

    /**
     * Obtener todos los chats del usuario
     */
    public List<Chat> obtenerChatsUsuario(Long usuarioId) {
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        return chatRepository.findByUsuario1OrUsuario2(usuario, usuario);
    }

    /**
     * Obtener chat por ID
     */
    public Chat obtenerChat(Long chatId) {
        return chatRepository.findById(chatId)
            .orElseThrow(() -> new EntityNotFoundException("Chat no encontrado"));
    }

    /**
     * Obtener mensajes de un chat
     */
    public List<ChatMessage> obtenerMensajes(Long chatId) {
        return chatMessageRepository.findByChatIdChatOrderByFechaCreacionAsc(chatId);
    }

    /**
     * Enviar mensaje en un chat
     */
    public ChatMessage enviarMensaje(Long chatId, Long usuarioId, String contenido) {
        Chat chat = obtenerChat(chatId);
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Validar que el usuario pertenece al chat
        if (!chat.getUsuario1().getIdUsers().equals(usuarioId) && 
            !chat.getUsuario2().getIdUsers().equals(usuarioId)) {
            throw new IllegalAccessError("El usuario no pertenece a este chat");
        }

        ChatMessage mensaje = new ChatMessage();
        mensaje.setChat(chat);
        mensaje.setUsuario(usuario);
        mensaje.setContenido(contenido);
        mensaje.setTipo("TEXTO");

        return chatMessageRepository.save(mensaje);
    }

    /**
     * Enviar mensaje con archivo
     */
    public ChatMessage enviarMensajeConArchivo(Long chatId, Long usuarioId, String contenido, String urlArchivo, String tipo) {
        Chat chat = obtenerChat(chatId);
        User usuario = userRepository.findById(usuarioId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Validar que el usuario pertenece al chat
        if (!chat.getUsuario1().getIdUsers().equals(usuarioId) && 
            !chat.getUsuario2().getIdUsers().equals(usuarioId)) {
            throw new IllegalAccessError("El usuario no pertenece a este chat");
        }

        ChatMessage mensaje = new ChatMessage();
        mensaje.setChat(chat);
        mensaje.setUsuario(usuario);
        mensaje.setContenido(contenido);
        mensaje.setTipo(tipo);  // IMAGEN, DOCUMENTO
        mensaje.setUrlArchivo(urlArchivo);

        return chatMessageRepository.save(mensaje);
    }

    /**
     * Obtener último mensaje de un chat
     */
    public Optional<ChatMessage> obtenerUltimoMensaje(Long chatId) {
        List<ChatMessage> mensajes = obtenerMensajes(chatId);
        return mensajes.isEmpty() ? Optional.empty() : Optional.of(mensajes.get(mensajes.size() - 1));
    }

    /**
     * Eliminar mensaje
     */
    public void eliminarMensaje(Long mensajeId) {
        chatMessageRepository.deleteById(mensajeId);
    }

    /**
     * Cerrar chat (desactivar)
     */
    public void cerrarChat(Long chatId) {
        Chat chat = obtenerChat(chatId);
        chatRepository.delete(chat);
    }

    /**
     * Contar mensajes no leídos (simple)
     */
    public int contarMensajes(Long chatId) {
        return obtenerMensajes(chatId).size();
    }
}
