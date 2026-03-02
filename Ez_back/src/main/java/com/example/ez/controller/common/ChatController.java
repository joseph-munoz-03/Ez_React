package com.example.ez.controller.common;

import com.example.ez.model.chat.Chat;
import com.example.ez.model.chat.ChatMessage;
import com.example.ez.service.chat.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    /**
     * Obtener o crear chat con otro usuario
     */
    @PostMapping("/obtener-o-crear")
    public ResponseEntity<Chat> obtenerOCrearChat(
            @RequestParam Long otroUsuarioId,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        Chat chat = chatService.obtenerOCrearChat(usuarioId, otroUsuarioId);
        return ResponseEntity.ok(chat);
    }

    /**
     * Listar todos los chats del usuario autenticado
     */
    @GetMapping("/mis-chats")
    public ResponseEntity<List<Chat>> obtenerMisChats(Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        List<Chat> chats = chatService.obtenerChatsUsuario(usuarioId);
        return ResponseEntity.ok(chats);
    }

    /**
     * Obtener chat específico por ID
     */
    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> obtenerChat(@PathVariable Long chatId) {
        Chat chat = chatService.obtenerChat(chatId);
        return ResponseEntity.ok(chat);
    }

    /**
     * Obtener todos los mensajes de un chat
     */
    @GetMapping("/{chatId}/mensajes")
    public ResponseEntity<List<ChatMessage>> obtenerMensajes(@PathVariable Long chatId) {
        List<ChatMessage> mensajes = chatService.obtenerMensajes(chatId);
        return ResponseEntity.ok(mensajes);
    }

    /**
     * Enviar mensaje de texto
     */
    @PostMapping("/{chatId}/mensaje")
    public ResponseEntity<ChatMessage> enviarMensaje(
            @PathVariable Long chatId,
            @RequestBody EnviarMensajeRequest request,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        ChatMessage mensaje = chatService.enviarMensaje(chatId, usuarioId, request.getContenido());
        return ResponseEntity.ok(mensaje);
    }

    /**
     * Enviar mensaje con archivo
     */
    @PostMapping("/{chatId}/archivo")
    public ResponseEntity<ChatMessage> enviarMensajeConArchivo(
            @PathVariable Long chatId,
            @RequestBody EnviarArchivoRequest request,
            Authentication authentication) {
        Long usuarioId = Long.parseLong(authentication.getName());
        ChatMessage mensaje = chatService.enviarMensajeConArchivo(
            chatId, usuarioId, request.getContenido(), 
            request.getUrlArchivo(), request.getTipo()
        );
        return ResponseEntity.ok(mensaje);
    }

    /**
     * DTO para enviar mensaje de texto
     */
    public static class EnviarMensajeRequest {
        private String contenido;

        public String getContenido() { return contenido; }
        public void setContenido(String contenido) { this.contenido = contenido; }
    }

    /**
     * DTO para enviar mensaje con archivo
     */
    public static class EnviarArchivoRequest {
        private String contenido;
        private String urlArchivo;
        private String tipo;

        public String getContenido() { return contenido; }
        public void setContenido(String contenido) { this.contenido = contenido; }
        public String getUrlArchivo() { return urlArchivo; }
        public void setUrlArchivo(String urlArchivo) { this.urlArchivo = urlArchivo; }
        public String getTipo() { return tipo; }
        public void setTipo(String tipo) { this.tipo = tipo; }
    }
}
