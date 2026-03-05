package com.example.ez.service.chatbot;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {
    
    private static final Map<String, String> FAQ = new HashMap<>();
    
    static {
        // Preguntas frecuentes
        FAQ.put("como creo un contrato", "Para crear un contrato, ve a Chats, selecciona el usuario con el que deseas contratar y usa el formulario de contrato disponible en la ventana de chat.");
        FAQ.put("como reporto un usuario", "Puedes reportar un usuario desde el chat o desde el marketplace. Usa el botón de reportar y especifica el motivo del reporte.");
        FAQ.put("como recargo saldo", "Ve a tu Dashboard, busca la sección de Saldo y haz clic en Recargar. Se abrirá Mercado Pago para completar el pago.");
        FAQ.put("como retiro mi saldo", "En la sección de Saldo, haz clic en Retirar, ingresa tu cuenta Mercado Pago y el monto que deseas retirar.");
        FAQ.put("cuales son los motivos de reporte", "Los motivos pueden ser: No Pago, Incumplimiento de Contrato, Contenido Sexual, Estafa u Otro.");
        FAQ.put("como veo mi historial de transacciones", "Ve a Saldo/Pagos para ver el historial completo de depósitos y retiros.");
        FAQ.put("que es el marketplace", "El marketplace es una plataforma donde los ingenieros pueden publicar servicios y los clientes pueden verlos y contactar.");
        FAQ.put("como publico en el marketplace", "Solo los ingenieros pueden publicar. Ve a Marketplace y haz clic en Nueva Publicación.");
        FAQ.put("como filtro en el marketplace", "Puedes filtrar por usuario, base de datos (MySQL, PostgreSQL, etc.) y lenguaje de programación (Java, Python, etc.).");
        FAQ.put("cuales son las formas de pago", "Usamos Mercado Pago como principal plataforma de pagos. También se soporta BetPlay.");
    }
    
    public String respondToMessage(String message) {
        String normalizedMessage = message.toLowerCase().trim();
        
        // Buscar coincidencias en FAQ
        for (String question : FAQ.keySet()) {
            if (normalizedMessage.contains(question)) {
                return FAQ.get(question);
            }
        }
        
        // Respuesta por defecto
        return "Lo siento, no pude entender tu pregunta. Por favor, intenta con palabras clave como 'contrato', 'reporte', 'saldo', 'marketplace', 'pago', etc. ¿Necesitas hablar con un administrador?";
    }
    
    public String getWelcomeMessage() {
        return "Bienvenido al chat de soporte de EZ. Soy un chatbot automático y puedo ayudarte con preguntas frecuentes. ¿En qué puedo ayudarte?";
    }
}
