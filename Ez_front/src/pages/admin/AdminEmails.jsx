import React, { useState } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminEmails = () => {
  const [emailType, setEmailType] = useState('all'); // all, role, users
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('INGENIERO');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const variables = [
    { name: '{{perfil}}', description: 'Nombre de usuario' },
    { name: '{{correo}}', description: 'Email del usuario' },
    { name: '{{cuenta}}', description: 'Tipo de cuenta (ADMIN, INGENIERO, CLIENTE)' }
  ];

  const predefinedMessages = [
    { title: 'Bienvenida', content: 'Bienvenido a EZ, {{perfil}}. Tu cuenta {{cuenta}} ha sido creada exitosamente.' },
    { title: 'Actualización', content: 'Hola {{perfil}}, tenemos nuevas actualizaciones en nuestra plataforma.' },
    { title: 'Notificación', content: '{{perfil}}, tienes una notificación importante en tu cuenta {{cuenta}}.' }
  ];

  const addVariable = (variable) => {
    setMessage(message + variable);
  };

  const addPredefinedMessage = (content) => {
    setMessage(content);
  };

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      alert('Por favor completa el asunto y el mensaje');
      return;
    }

    setLoading(true);

    try {
      if (emailType === 'all') {
        await axios.post('/admin/email/send-to-all', { subject, message });
        alert('Correo enviado a todos los usuarios');
      } else if (emailType === 'role') {
        await axios.post('/admin/email/send-to-role', {
          role: selectedRole,
          subject,
          message
        });
        alert(`Correo enviado a todos los ${selectedRole}S`);
      } else if (emailType === 'users') {
        await axios.post('/admin/email/send-to-users', {
          userIds: selectedUsers,
          subject,
          message
        });
        alert('Correo enviado a usuarios seleccionados');
      }

      // Limpiar formulario
      setSubject('');
      setMessage('');
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error al enviar correo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <h1 style={{ color: '#1F2937' }}>Envío de Correos Masivos</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Formulario */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ color: '#1F2937', marginTop: '0' }}>Componer Correo</h2>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: '#1F2937', fontWeight: '600' }}>
              Enviar a:
            </label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="radio"
                  value="all"
                  checked={emailType === 'all'}
                  onChange={(e) => setEmailType(e.target.value)}
                />
                Todos los usuarios
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="radio"
                  value="role"
                  checked={emailType === 'role'}
                  onChange={(e) => setEmailType(e.target.value)}
                />
                Por rol
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="radio"
                  value="users"
                  checked={emailType === 'users'}
                  onChange={(e) => setEmailType(e.target.value)}
                />
                Usuarios específicos
              </label>
            </div>

            {emailType === 'role' && (
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
              >
                <option value="ADMIN">Administradores</option>
                <option value="INGENIERO">Ingenieros</option>
                <option value="CLIENTE">Clientes</option>
              </select>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: '#1F2937', fontWeight: '600' }}>
              Asunto:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Asunto del correo"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: '#1F2937', fontWeight: '600' }}>
              Mensaje:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB', minHeight: '200px', boxSizing: 'border-box', fontFamily: 'Arial' }}
            />
          </div>

          <button
            onClick={handleSendEmail}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9CA3AF' : '#10B981',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading ? 'Enviando...' : 'Enviar Correo'}
          </button>
        </div>

        {/* Panel lateral - Variables y plantillas */}
        <div>
          {/* Variables dinámicas */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ color: '#1F2937', marginTop: '0' }}>Variables Disponibles</h3>
            <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '15px' }}>
              Haz clic para insertar una variable en el mensaje:
            </p>
            {variables.map(variable => (
              <button
                key={variable.name}
                onClick={() => addVariable(variable.name)}
                style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <strong>{variable.name}</strong> - {variable.description}
              </button>
            ))}
          </div>

          {/* Mensajes predefinidos */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ color: '#1F2937', marginTop: '0' }}>Plantillas Predefinidas</h3>
            {predefinedMessages.map((template, index) => (
              <button
                key={index}
                onClick={() => addPredefinedMessage(template.content)}
                style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: '#A855F7',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmails;
