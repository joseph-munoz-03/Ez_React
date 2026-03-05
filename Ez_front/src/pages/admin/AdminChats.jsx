import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminChats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchChats();
  }, [page]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`/admin/chats?page=${page}&size=10`);
      setChats(response.data.content);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const response = await axios.get(`/admin/chats/${chatId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const getChatType = (chat) => {
    // Lógica para determinar el tipo de chat
    if (chat.type === 'CHATBOT') return { label: 'Chatbot', color: '#3B82F6' };
    if (chat.type === 'HELP') return { label: 'Ayuda', color: '#10B981' };
    if (chat.type === 'REPORT') return { label: 'Reporte', color: '#EF4444' };
    return { label: 'Usuario', color: '#6B7280' };
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <h1 style={{ color: '#1F2937' }}>Gestión de Chats</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Lista de chats */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
          <h2 style={{ color: '#1F2937', marginTop: '0' }}>Chats</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            chats.map(chat => {
              const chatType = getChatType(chat);
              return (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  style={{
                    padding: '12px',
                    marginBottom: '10px',
                    backgroundColor: selectedChatId === chat.id ? '#F3F4F6' : '#FFFFFF',
                    borderLeft: `4px solid ${chatType.color}`,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedChatId === chat.id ? '#F3F4F6' : '#FFFFFF'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0', color: '#1F2937', fontWeight: '600' }}>Chat {chat.id}</p>
                      <span style={{
                        backgroundColor: chatType.color,
                        color: '#FFFFFF',
                        padding: '2px 8px',
                        borderRadius: '3px',
                        fontSize: '12px'
                      }}>
                        {chatType.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Mensajes del chat seleccionado */}
        {selectedChatId && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: '#1F2937', marginTop: '0' }}>Mensajes - Chat {selectedChatId}</h2>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', maxHeight: '400px', backgroundColor: '#F3F4F6', borderRadius: '4px', padding: '15px' }}>
              {messages.length === 0 ? (
                <p style={{ color: '#9CA3AF', textAlign: 'center' }}>No hay mensajes</p>
              ) : (
                messages.map(message => (
                  <div key={message.id} style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#1F2937', fontWeight: '600' }}>
                      {message.usuario?.nombre || 'Usuario'} - {new Date(message.fechaCreacion).toLocaleString()}
                    </p>
                    <p style={{ margin: '0', color: '#6B7280', paddingLeft: '10px' }}>
                      {message.contenido}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChats;
