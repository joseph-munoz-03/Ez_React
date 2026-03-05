package com.example.ez.service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Servicio para envío de correos electrónicos
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.mail.from-name}")
    private String fromName;

    /**
     * Enviar correo de bienvenida
     */
    public void enviarBienvenida(String email, String nombre, String rol) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(email);
            helper.setSubject("Bienvenido a EZ Platform");

            String html = "<h1>Bienvenido a EZ Platform</h1>" +
                    "<p>Hola <strong>" + nombre + "</strong>,</p>" +
                    "<p>Tu cuenta has sido creada exitosamente como <strong>" + rol + "</strong>.</p>" +
                    "<p>Ahora puedes acceder a tu dashboard y comenzar a usar la plataforma.</p>";

            helper.setText(html, true);
            mailSender.send(message);

            log.info("Correo de bienvenida enviado a: {}", email);

        } catch (MessagingException e) {
            log.error("Error al enviar correo de bienvenida", e);
        }
    }

    /**
     * Notificar creación de contrato
     */
    public void notificarNuevoContrato(String emailCliente, String emailIngeniero, String titulo, 
                                       BigDecimal monto, Integer diasVigencia) {
        try {
            // Notificar al cliente
            MimeMessage message1 = mailSender.createMimeMessage();
            MimeMessageHelper helper1 = new MimeMessageHelper(message1, true, "UTF-8");

            try {
                helper1.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper1.setFrom(fromEmail);
            }
            helper1.setTo(emailCliente);
            helper1.setSubject("Nuevo Contrato Creado - EZ Platform");

            String htmlCliente = "<h2>Nuevo Contrato</h2>" +
                    "<p>Tu contrato '<strong>" + titulo + "</strong>' ha sido creado.</p>" +
                    "<p><strong>Monto:</strong> $" + monto + "</p>" +
                    "<p><strong>Duración:</strong> " + diasVigencia + " días</p>" +
                    "<p>Por favor, revisa los términos y acepta o rechaza el contrato.</p>";

            helper1.setText(htmlCliente, true);
            mailSender.send(message1);

            // Notificar al ingeniero
            MimeMessage message2 = mailSender.createMimeMessage();
            MimeMessageHelper helper2 = new MimeMessageHelper(message2, true, "UTF-8");

            try {
                helper2.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper2.setFrom(fromEmail);
            }
            helper2.setTo(emailIngeniero);
            helper2.setSubject("Nuevo Contrato Propuesto - EZ Platform");

            String htmlIngeniero = "<h2>Nuevo Contrato Propuesto</h2>" +
                    "<p>Te han propuesto un contrato para '<strong>" + titulo + "</strong>'.</p>" +
                    "<p><strong>Monto:</strong> $" + monto + "</p>" +
                    "<p><strong>Duración:</strong> " + diasVigencia + " días</p>" +
                    "<p>Revisa el contrato en tu dashboard.</p>";

            helper2.setText(htmlIngeniero, true);
            mailSender.send(message2);

            log.info("Notificaciones de contrato enviadas a cliente e ingeniero");

        } catch (MessagingException e) {
            log.error("Error al notificar nuevo contrato", e);
        }
    }

    /**
     * Confirmar pago realizado
     */
    public void confirmarPago(String email, BigDecimal monto, String referencia) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(email);
            helper.setSubject("Pago Confirmado - EZ Platform");

            String html = "<h2>Pago Confirmado</h2>" +
                    "<p>Tu pago ha sido procesado exitosamente.</p>" +
                    "<p><strong>Monto:</strong> $" + monto + "</p>" +
                    "<p><strong>Referencia:</strong> " + referencia + "</p>" +
                    "<p>El dinero ya está disponible en tu cuenta.</p>";

            helper.setText(html, true);
            mailSender.send(message);

            log.info("Confirmación de pago enviada a: {}", email);

        } catch (MessagingException e) {
            log.error("Error al confirmar pago", e);
        }
    }

    /**
     * Notificar recordatorio de entrega próxima
     */
    public void recordatorioEntrega(String email, String tituloContrato, LocalDate fechaEntrega) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(email);
            helper.setSubject("Recordatorio: Entrega Próxima - EZ Platform");

            String html = "<h2>Recordatorio de Entrega</h2>" +
                    "<p>Tienes una entrega próxima para el contrato '<strong>" + tituloContrato + "</strong>'.</p>" +
                    "<p><strong>Fecha de Entrega:</strong> " + fechaEntrega + "</p>" +
                    "<p>Asegúrate de cumplir con los términos del contrato.</p>";

            helper.setText(html, true);
            mailSender.send(message);

            log.info("Recordatorio de entrega enviado a: {}", email);

        } catch (MessagingException e) {
            log.error("Error al enviar recordatorio de entrega", e);
        }
    }

    /**
     * Notificar cambio de contraseña
     */
    public void notificarCambioContrasena(String email, String nombre) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(email);
            helper.setSubject("Contraseña Actualizada - EZ Platform");

            String html = "<h2>Contraseña Actualizada</h2>" +
                    "<p>Hola <strong>" + nombre + "</strong>,</p>" +
                    "<p>Tu contraseña ha sido cambiada exitosamente.</p>" +
                    "<p>Si no realizaste este cambio, por favor contacta al soporte inmediatamente.</p>";

            helper.setText(html, true);
            mailSender.send(message);

            log.info("Notificación de cambio de contraseña enviada a: {}", email);

        } catch (MessagingException e) {
            log.error("Error al notificar cambio de contraseña", e);
        }
    }

    /**
     * Enviar correo de recuperación de contraseña (placeholder)
     */
    public void enviarRecuperacionContrasena(String email, String tokenRecuperacion) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(email);
            helper.setSubject("Recuperar Contraseña - EZ Platform");

            String html = "<h2>Recuperar Contraseña</h2>" +
                    "<p>Hemos recibido una solicitud para recuperar tu contraseña.</p>" +
                    "<p><a href='https://tu-dominio.com/recuperar-contrasena?token=" + tokenRecuperacion + "'>Click aquí para resetear tu contraseña</a></p>" +
                    "<p>Este enlace expira en 24 horas.</p>";

            helper.setText(html, true);
            mailSender.send(message);

            log.info("Correo de recuperación enviado a: {}", email);

        } catch (MessagingException e) {
            log.error("Error al enviar recuperación de contraseña", e);
        }
    }

    /**
     * Enviar correo simple (genérico)
     * Utilizado para correos administrativos y masivos
     */
    public void sendSimpleEmail(String to, String subject, String message) throws MessagingException {
        try {
            MimeMessage mailMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message, false);

            mailSender.send(mailMessage);
            log.info("Correo simple enviado a: {}", to);

        } catch (MessagingException e) {
            log.error("Error al enviar correo simple a {}: {}", to, e.getMessage());
            throw e;
        }
    }
}
