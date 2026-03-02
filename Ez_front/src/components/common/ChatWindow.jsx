import React, { useState, useRef, useEffect } from 'react';
import theme from '../../themes/theme.config';

/**
 * ChatWindow Component - Ventana de chat para comunicación en tiempo real
 * Muestra mensajes, permite enviar nuevos mensajes y archivo adjuntos
 */
const ChatWindow = ({ 
  messages = [], 
  onSendMessage, 
  currentUserId, 
  recipientName,
  isLoading = false,
  minHeight = '400px'
}) => {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯'];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight,
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    border: `1px solid ${theme.colors.grayscale[200]}`,
    overflow: 'hidden',
  };

  const headerStyle = {
    padding: theme.spacing[4],
    borderBottom: `1px solid ${theme.colors.grayscale[200]}`,
    backgroundColor: theme.colors.grayscale[50],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing[4],
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  };

  const messageGroupStyle = (isMine) => ({
    display: 'flex',
    justifyContent: isMine ? 'flex-end' : 'flex-start',
    alignItems: 'flex-end',
    gap: theme.spacing[2],
  });

  const messageBubbleStyle = (isMine) => ({
    maxWidth: '70%',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: isMine
      ? theme.colors.accent.azul
      : theme.colors.grayscale[100],
    color: isMine
      ? theme.colors.primary.blanco
      : theme.colors.primary.negro,
    wordBreak: 'break-word',
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.normal,
    boxShadow: theme.shadows.sm,
  });

  const timestampStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.grayscale[500],
    marginTop: theme.spacing[1],
  };

  const inputContainerStyle = {
    padding: theme.spacing[4],
    borderTop: `1px solid ${theme.colors.grayscale[200]}`,
    display: 'flex',
    gap: theme.spacing[2],
    backgroundColor: theme.colors.grayscale[50],
    alignItems: 'flex-end',
  };

  const inputStyle = {
    ...theme.components.input,
    flex: 1,
    resize: 'none',
    minHeight: '40px',
    maxHeight: '120px',
    padding: theme.spacing[2],
  };

  const buttonStyle = {
    ...theme.components.button.primary,
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    minHeight: '40px',
  };

  const emojiPickerStyle = {
    position: 'absolute',
    bottom: '100%',
    marginBottom: theme.spacing[2],
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[3],
    boxShadow: theme.shadows.lg,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing[2],
    zIndex: 1000,
    border: `1px solid ${theme.colors.grayscale[200]}`,
  };

  const emojiStyle = {
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration[150]}`,
    padding: theme.spacing[1],
    borderRadius: theme.borderRadius.md,
    '&:hover': {
      backgroundColor: theme.colors.grayscale[100],
      transform: 'scale(1.2)',
    },
  };

  // Auto-scroll al nuevo mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && onSendMessage) {
      onSendMessage({
        contenido: messageText.trim(),
        tipo: 'TEXTO',
        timestamp: new Date().toISOString(),
      });
      setMessageText('');
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h3 style={{ margin: 0, color: theme.colors.primary.negro }}>
          💬 {recipientName || 'Chat'}
        </h3>
        <div style={{ 
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.grayscale[500]
        }}>
          {isLoading ? 'Cargando...' : 'En línea'}
        </div>
      </div>

      {/* Messages Container */}
      <div style={messagesContainerStyle}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: theme.colors.grayscale[400],
          }}>
            <p>No hay mensajes aún. ¡Inicia la conversación!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMine = message.usuarioId === currentUserId;
            return (
              <div key={index} style={messageGroupStyle(isMine)}>
                <div>
                  <div style={messageBubbleStyle(isMine)}>
                    {message.contenido}
                  </div>
                  <div style={timestampStyle}>
                    {formatTime(message.fechaCreacion)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div style={inputContainerStyle}>
        <div style={{ position: 'relative' }}>
          <button
            style={{
              ...theme.components.button.secondary,
              padding: theme.spacing[2],
              minHeight: '40px',
              minWidth: '40px',
            }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emojis"
          >
            😊
          </button>
          
          {showEmojiPicker && (
            <div style={emojiPickerStyle}>
              {emojis.map((emoji, index) => (
                <div
                  key={index}
                  style={emojiStyle}
                  onClick={() => handleEmojiClick(emoji)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.grayscale[100];
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          )}
        </div>

        <textarea
          style={inputStyle}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Escribe un mensaje... (Enter para enviar, Shift+Enter para nueva línea)"
        />

        <button
          style={buttonStyle}
          onClick={handleSendMessage}
          disabled={!messageText.trim() || isLoading}
          onMouseEnter={(e) => {
            if (!disabled) e.target.style.backgroundColor = '#1D4ED8';
          }}
          onMouseLeave={(e) => {
            if (!disabled) e.target.style.backgroundColor = theme.colors.accent.azul;
          }}
        >
          {isLoading ? '⏳' : '📤 Enviar'}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
