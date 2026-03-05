import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import ContractFormModal from '../../components/common/ContractFormModal';
import theme from '../../themes/theme.config';

/**
 * Chats Ingeniero - Sistema de mensajería en tiempo real
 * Gestiona conversaciones con clientes y soporte
 */
const ChatsIngeniero = () => {
  const [userName, setUserName] = useState('Ingeniero');
  const [activeSection, setActiveSection] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    { id: 1, nombre: 'Juan Pérez', avatar: 'J', lastMessage: 'Hola, necesito una aclaración...', timestamp: '10:30 AM', unread: 2 },
    { id: 2, nombre: 'María García', avatar: 'M', lastMessage: 'Perfecto, muchas gracias', timestamp: 'Ayer', unread: 0 },
    { id: 3, nombre: 'Carlos López', avatar: 'C', lastMessage: 'Que tal sigue el proyecto?', timestamp: '2 días', unread: 1 },
  ]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showContractModal, setShowContractModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedHelpOption, setSelectedHelpOption] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Simulación de carga de mensajes
  useEffect(() => {
    if (selectedChat) {
      setMessages([
        {
          id: 1,
          senderId: selectedChat.id,
          senderName: selectedChat.nombre,
          content: 'Hola, ¿cómo estás?',
          timestamp: '10:00 AM',
          isMine: false,
        },
        {
          id: 2,
          senderId: 'me',
          senderName: 'Tú',
          content: '¡Hola! Muy bien, ¿y tú?',
          timestamp: '10:05 AM',
          isMine: true,
        },
        {
          id: 3,
          senderId: selectedChat.id,
          senderName: selectedChat.nombre,
          content: 'Tengo una pregunta sobre el contrato...',
          timestamp: '10:15 AM',
          isMine: false,
        },
      ]);
    }
  }, [selectedChat]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const containerStyle = {
    marginLeft: '250px',
    minHeight: '100vh',
    backgroundColor: theme.colors.primary.grisSoft,
    paddingTop: '80px',
    display: 'flex',
  };

  const chatsContainerStyle = {
    flex: 1,
    display: 'flex',
    height: 'calc(100vh - 80px)',
  };

  const sidebarChatsStyle = {
    width: '300px',
    backgroundColor: theme.colors.primary.blanco,
    borderRight: `1px solid ${theme.colors.primary.grisSecundario}`,
    display: 'flex',
    flexDirection: 'column',
  };

  const chatsHeaderStyle = {
    padding: theme.spacing[4],
    borderBottom: `1px solid ${theme.colors.primary.grisSecundario}`,
  };

  const chatsHeaderTitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const searchInputStyle = {
    width: '100%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.sm,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
  };

  const chatsListStyle = {
    flex: 1,
    overflowY: 'auto',
  };

  const chatItemStyle = (isSelected, hasUnread) => ({
    padding: theme.spacing[3],
    borderBottom: `1px solid ${theme.colors.primary.grisSoft}`,
    cursor: 'pointer',
    backgroundColor: isSelected ? theme.colors.primary.grisSoft : 'transparent',
    borderLeft: isSelected ? `4px solid ${theme.colors.accent.verde}` : '4px solid transparent',
    transition: `all ${theme.transitions.duration[200]}`,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  });

  const chatAvatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent.verde,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primary.blanco,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    flexShrink: 0,
  };

  const chatInfoStyle = {
    flex: 1,
    minWidth: 0,
  };

  const chatNameStyle = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[1],
  };

  const chatLastMessageStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const chatMetaStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing[1],
    flexShrink: 0,
  };

  const chatTimeStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
  };

  const unreadBadgeStyle = {
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.full,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
  };

  const chatWindowStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.primary.blanco,
  };

  const chatEmptyStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colors.primary.gris,
    fontSize: theme.typography.fontSize.lg,
  };

  const chatHeaderStyle = {
    padding: theme.spacing[4],
    borderBottom: `1px solid ${theme.colors.primary.grisSecundario}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const chatHeaderInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  };

  const chatLargeAvatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent.verde,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primary.blanco,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  };

  const chatHeaderDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const chatHeaderNameStyle = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
  };

  const chatHeaderStatusStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
  };

  const messagesAreaStyle = {
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
  });

  const messageBubbleStyle = (isMine) => ({
    maxWidth: '70%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: isMine ? theme.colors.accent.verde : theme.colors.primary.grisSoft,
    color: isMine ? theme.colors.primary.blanco : theme.colors.primary.negro,
    fontSize: theme.typography.fontSize.sm,
    wordWrap: 'break-word',
  });

  const messageTimeStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
    marginTop: theme.spacing[1],
  };

  const inputAreaStyle = {
    padding: theme.spacing[4],
    borderTop: `1px solid ${theme.colors.primary.grisSecundario}`,
    display: 'flex',
    gap: theme.spacing[2],
    flexDirection: 'column',
  };

  const inputRowStyle = {
    display: 'flex',
    gap: theme.spacing[2],
  };

  const messageInputStyle = {
    flex: 1,
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
    fontFamily: 'inherit',
    resize: 'none',
    maxHeight: '100px',
  };

  const actionButtonStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
  };

  const sendButtonStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  };

  const attachmentContainerStyle = {
    display: 'flex',
    gap: theme.spacing[2],
    flexWrap: 'wrap',
    marginBottom: theme.spacing[2],
  };

  const attachmentStyle = {
    padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
    backgroundColor: theme.colors.primary.grisSoft,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.xs,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[1],
  };

  const helpButtonStyle = {
    position: 'fixed',
    bottom: theme.spacing[6],
    right: theme.spacing[6],
    width: '60px',
    height: '60px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent.morado,
    color: theme.colors.primary.blanco,
    border: 'none',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize['2xl'],
    boxShadow: theme.shadows.lg,
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const modalStyleContainer = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[6],
    maxWidth: '500px',
    width: '90%',
    boxShadow: theme.shadows.lg,
  };

  const modalTitleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[4],
  };

  const helpOptionStyle = {
    padding: theme.spacing[4],
    marginBottom: theme.spacing[2],
    border: `2px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const helpOptionHoverStyle = {
    borderColor: theme.colors.accent.verde,
    backgroundColor: '#F0FDF4',
  };

  // Handlers
  const handleSendMessage = () => {
    if (messageInput.trim() || attachments.length > 0) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 'me',
        senderName: 'Tú',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        attachments: attachments,
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      setAttachments([]);
    }
  };

  const handleAttachFile = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      setAttachments(prev => [...prev, { name: file.name, size: file.size }]);
    });
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleHelpOptionSelect = (option) => {
    setSelectedHelpOption(option);
    if (option === 'admin') {
      const adminChat = chats.find(c => c.nombre.includes('Administrador')) || 
                        { id: 999, nombre: 'Administrador', avatar: 'A', lastMessage: '', timestamp: 'Ahora', unread: 0 };
      setSelectedChat(adminChat);
    } else if (option === 'chatbot') {
      const chatbotChat = { id: 888, nombre: 'Bot EZ', avatar: 'B', lastMessage: '', timestamp: 'Ahora', unread: 0 };
      setSelectedChat(chatbotChat);
    }
    setShowHelpModal(false);
  };

  const handleNavigate = (path) => {
    console.log(`Navegando a: ${path}`);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  return (
    <div>
      <Header
        userRole="INGENIERO"
        userName={userName}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <div style={containerStyle}>
        <Sidebar
          userRole="INGENIERO"
          onNavigate={handleNavigate}
          activeSection={activeSection}
        />
        <div style={chatsContainerStyle}>
          {/* Sidebar de Chats */}
          <div style={sidebarChatsStyle}>
            <div style={chatsHeaderStyle}>
              <div style={chatsHeaderTitleStyle}>Mis Chats</div>
              <input
                type="text"
                placeholder="Buscar..."
                style={searchInputStyle}
              />
            </div>
            <div style={chatsListStyle}>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  style={chatItemStyle(selectedChat?.id === chat.id, chat.unread > 0)}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div style={chatAvatarStyle}>{chat.avatar}</div>
                  <div style={chatInfoStyle}>
                    <div style={chatNameStyle}>{chat.nombre}</div>
                    <div style={chatLastMessageStyle}>{chat.lastMessage}</div>
                  </div>
                  <div style={chatMetaStyle}>
                    <div style={chatTimeStyle}>{chat.timestamp}</div>
                    {chat.unread > 0 && <div style={unreadBadgeStyle}>{chat.unread}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ventana de Chat */}
          <div style={chatWindowStyle}>
            {selectedChat ? (
              <>
                {/* Header del Chat */}
                <div style={chatHeaderStyle}>
                  <div style={chatHeaderInfoStyle}>
                    <div style={chatLargeAvatarStyle}>{selectedChat.avatar}</div>
                    <div style={chatHeaderDetailsStyle}>
                      <div style={chatHeaderNameStyle}>{selectedChat.nombre}</div>
                      <div style={chatHeaderStatusStyle}>En línea</div>
                    </div>
                  </div>
                  <button
                    style={actionButtonStyle}
                    onClick={() => setShowContractModal(true)}
                  >
                    📋 Crear Contrato
                  </button>
                </div>

                {/* Área de Mensajes */}
                <div style={messagesAreaStyle}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={messageGroupStyle(msg.isMine)}>
                      <div>
                        <div style={messageBubbleStyle(msg.isMine)}>
                          {msg.content}
                        </div>
                        <div style={{ ...messageTimeStyle, textAlign: msg.isMine ? 'right' : 'left' }}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Área de Entrada */}
                <div style={inputAreaStyle}>
                  {attachments.length > 0 && (
                    <div style={attachmentContainerStyle}>
                      {attachments.map((att, idx) => (
                        <div key={idx} style={attachmentStyle}>
                          📎 {att.name}
                          <button
                            onClick={() => handleRemoveAttachment(idx)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: theme.colors.primary.gris,
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={inputRowStyle}>
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Escribe un mensaje..."
                      style={messageInputStyle}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[1] }}>
                      <button
                        style={actionButtonStyle}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        📎
                      </button>
                      <button style={sendButtonStyle} onClick={handleSendMessage}>
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={chatEmptyStyle}>
                Selecciona un chat para comenzar
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleAttachFile}
            />
          </div>
        </div>
      </div>

      {/* Botón de Ayuda */}
      <button
        style={helpButtonStyle}
        onClick={() => setShowHelpModal(true)}
      >
        ❓
      </button>

      {/* Modal de Ayuda */}
      {showHelpModal && (
        <div style={modalStyleContainer} onClick={() => setShowHelpModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitleStyle}>¿Cómo podemos ayudarte?</h2>
            <div
              style={{
                ...helpOptionStyle,
                ...(selectedHelpOption === 'chatbot' ? helpOptionHoverStyle : {}),
              }}
              onClick={() => handleHelpOptionSelect('chatbot')}
            >
              <div style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing[1] }}>
                🤖 Chatbot Automático
              </div>
              <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.primary.gris }}>
                Obtén respuestas instantáneas a preguntas frecuentes
              </div>
            </div>
            <div
              style={{
                ...helpOptionStyle,
                ...(selectedHelpOption === 'admin' ? helpOptionHoverStyle : {}),
              }}
              onClick={() => handleHelpOptionSelect('admin')}
            >
              <div style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing[1] }}>
                👨‍💼 Chat con Administrador
              </div>
              <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.primary.gris }}>
                Habla directamente con nuestro equipo de soporte
              </div>
            </div>
            <button
              style={{
                width: '100%',
                marginTop: theme.spacing[4],
                padding: theme.spacing[2],
                backgroundColor: theme.colors.primary.grisSoft,
                border: 'none',
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
              }}
              onClick={() => setShowHelpModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Contrato */}
      {showContractModal && (
        <ContractFormModal onClose={() => setShowContractModal(false)} />
      )}
    </div>
  );
};

export default ChatsIngeniero;
