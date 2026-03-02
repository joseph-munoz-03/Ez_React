package com.example.ez.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.example.ez.model.chat.ChatMessage;
import com.example.ez.model.user.User;
import com.example.ez.service.chat.ChatService;
import com.example.ez.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Controller
@AllArgsConstructor
public class ChatWebSocketController {

    private final ChatService chatService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Endpoint para enviar mensajes a un chat específico
     * Ruta: /app/chat/{chatId} (o /app/chat desde cliente STOMP)
     */
    @MessageMapping("/chat")
    public void sendMessage(WebSocketMessageRequest request) {
        try {
            // Obtener usuario
            User usuario = userService.findById(request.getUsuarioId());
            
            // Persistir mensaje a través de ChatService
            ChatMessage mensajeGuardado = chatService.enviarMensajeConArchivo(
                request.getChatId(),
                usuario.getIdUsers(),
                request.getContenido(),
                request.getUrlArchivo(),
                request.getTipo()
            );

            // Respuesta DTO para no serializar entidades
            WebSocketMessageResponse response = new WebSocketMessageResponse(
                mensajeGuardado.getIdMensaje(),
                mensajeGuardado.getContenido(),
                usuario.getNombre() + " " + usuario.getApellido(),
                mensajeGuardado.getFechaCreacion(),
                mensajeGuardado.getTipo(),
                request.getChatId(),
                request.getUsuarioId()
            );

            // Enviar a todos los suscriptores del chat
            messagingTemplate.convertAndSend(
                "/topic/chat/" + request.getChatId(),
                response
            );
        } catch (Exception e) {
            WebSocketErrorResponse error = new WebSocketErrorResponse(
                "Error al enviar mensaje: " + e.getMessage(),
                LocalDateTime.now()
            );
            messagingTemplate.convertAndSendToUser(
                request.getUsuarioId().toString(),
                "/queue/errors",
                error
            );
        }
    }

    /**
     * DTO para recibir mensajes desde el cliente
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WebSocketMessageRequest {
        private Long chatId;
        private Long usuarioId;
        private String contenido;
        private String tipo = "TEXTO";
        private String urlArchivo;
    }

    /**
     * DTO para enviar mensajes al cliente
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WebSocketMessageResponse {
        private Long idMensaje;
        private String contenido;
        private String nombreUsuario;
        private LocalDateTime fechaCreacion;
        private String tipo;
        private Long chatId;
        private Long usuarioId;
    }

    /**
     * DTO para respuestas de error
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WebSocketErrorResponse {
        private String mensaje;
        private LocalDateTime timestamp = LocalDateTime.now();
    }
}
