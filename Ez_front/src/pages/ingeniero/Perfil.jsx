import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Perfil Ingeniero - Gestión de información personal
 * Permite editar foto, datos personales, descripción y etiquetas
 */
const PerfilIngeniero = () => {
  const [userName, setUserName] = useState('Ingeniero');
  const [activeSection, setActiveSection] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: 'Carlos',
    apellido: 'García',
    email: 'carlos@example.com',
    telefono: '+57 315 123 4567',
    apodo: 'CarlosGarcia',
    descripcion: 'Ingeniero de Software especializado en desarrollo fullstack con 5 años de experiencia.',
    fotoPerfil: 'https://via.placeholder.com/150',
    etiquetas: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
  });
  const [formData, setFormData] = useState(profileData);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener datos del perfil
    setUserName(profileData.nombre);
  }, []);

  const containerStyle = {
    marginLeft: '250px',
    minHeight: '100vh',
    backgroundColor: theme.colors.primary.grisSoft,
    paddingTop: '80px',
  };

  const contentStyle = {
    padding: `${theme.spacing[6]} ${theme.spacing[8]}`,
    maxWidth: '900px',
    margin: '0 auto',
  };

  const pageHeaderStyle = {
    marginBottom: theme.spacing[8],
  };

  const pageTitleStyle = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const pageSubtitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary.gris,
  };

  const cardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    padding: theme.spacing[8],
    marginBottom: theme.spacing[6],
  };

  const profileHeaderStyle = {
    display: 'flex',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[6],
    paddingBottom: theme.spacing[6],
    borderBottom: `1px solid ${theme.colors.primary.grisSoft}`,
  };

  const avatarContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing[3],
  };

  const avatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent.verde,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    overflow: 'hidden',
    border: `3px solid ${theme.colors.accent.verde}`,
  };

  const uploadButtonStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const userInfoStyle = {
    flex: 1,
  };

  const userNameStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[1],
  };

  const userRoleStyle = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary.gris,
    marginBottom: theme.spacing[4],
  };

  const infoItemStyle = {
    display: 'flex',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[2],
  };

  const infoLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
    minWidth: '100px',
  };

  const infoValueStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.negro,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const formSectionStyle = {
    marginBottom: theme.spacing[6],
  };

  const formSectionTitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[4],
    paddingBottom: theme.spacing[3],
    borderBottom: `2px solid ${theme.colors.accent.verde}`,
  };

  const formGroupStyle = {
    marginBottom: theme.spacing[4],
  };

  const labelStyle = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const inputStyle = {
    width: '100%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
    fontFamily: 'inherit',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const tagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[3],
  };

  const tagStyle = {
    padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.sm,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
  };

  const removeTagButtonStyle = {
    background: 'none',
    border: 'none',
    color: theme.colors.primary.blanco,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.lg,
    padding: 0,
  };

  const addTagContainerStyle = {
    display: 'flex',
    gap: theme.spacing[2],
  };

  const addTagInputStyle = {
    flex: 1,
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
  };

  const addTagButtonStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: theme.spacing[3],
    marginTop: theme.spacing[6],
    paddingTop: theme.spacing[6],
    borderTop: `1px solid ${theme.colors.primary.grisSoft}`,
  };

  const primaryButtonStyle = {
    flex: 1,
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const secondaryButtonStyle = {
    flex: 1,
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.primary.grisSoft,
    color: theme.colors.primary.negro,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const securityLinkStyle = {
    display: 'inline-block',
    marginTop: theme.spacing[4],
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.accent.rojo,
    color: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.md,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    border: 'none',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.etiquetas.includes(newTag)) {
      setFormData({
        ...formData,
        etiquetas: [...formData.etiquetas, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      etiquetas: formData.etiquetas.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSave = () => {
    // Aquí iría la llamada a la API para actualizar datos
    setProfileData(formData);
    setIsEditing(false);
    console.log('Datos guardados:', formData);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
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
        <div style={contentStyle}>
          {/* Encabezado */}
          <div style={pageHeaderStyle}>
            <h1 style={pageTitleStyle}>Mi Perfil</h1>
            <p style={pageSubtitleStyle}>Gestiona tu información personal y profesional</p>
          </div>

          {/* Card Principal */}
          <div style={cardStyle}>
            {/* Sección de Avatar y Datos Básicos */}
            <div style={profileHeaderStyle}>
              <div style={avatarContainerStyle}>
                <div style={avatarStyle}>
                  {/* Avatar con inicial */}
                  {profileData.nombre.charAt(0)}
                </div>
                {isEditing && (
                  <button style={uploadButtonStyle}>
                    📤 Cambiar Foto
                  </button>
                )}
              </div>

              {!isEditing && (
                <div style={userInfoStyle}>
                  <div style={userNameStyle}>
                    {profileData.nombre} {profileData.apellido}
                  </div>
                  <div style={userRoleStyle}>Ingeniero de Software</div>
                  <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Apodo:</span>
                    <span style={infoValueStyle}>{profileData.apodo}</span>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Email:</span>
                    <span style={infoValueStyle}>{profileData.email}</span>
                  </div>
                  <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Teléfono:</span>
                    <span style={infoValueStyle}>{profileData.telefono}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Formulario de Edición */}
            {isEditing ? (
              <>
                {/* Información Personal */}
                <div style={formSectionStyle}>
                  <h2 style={formSectionTitleStyle}>Información Personal</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Apellido</label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        disabled
                      />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Apodo / Nombre de Usuario</label>
                    <input
                      type="text"
                      name="apodo"
                      value={formData.apodo}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div style={formSectionStyle}>
                  <h2 style={formSectionTitleStyle}>Descripción Profesional</h2>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Sobre ti</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      style={textareaStyle}
                      maxLength={500}
                    />
                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.primary.gris, marginTop: theme.spacing[1] }}>
                      {formData.descripcion.length}/500 caracteres
                    </div>
                  </div>
                </div>

                {/* Etiquetas */}
                <div style={formSectionStyle}>
                  <h2 style={formSectionTitleStyle}>Habilidades y Etiquetas</h2>
                  <div style={tagsContainerStyle}>
                    {formData.etiquetas.map((tag) => (
                      <div key={tag} style={tagStyle}>
                        {tag}
                        <button
                          style={removeTagButtonStyle}
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={addTagContainerStyle}>
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder="Agrega una nueva habilidad..."
                      style={addTagInputStyle}
                    />
                    <button
                      style={addTagButtonStyle}
                      onClick={handleAddTag}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div style={buttonGroupStyle}>
                  <button style={primaryButtonStyle} onClick={handleSave}>
                    ✓ Guardar Cambios
                  </button>
                  <button style={secondaryButtonStyle} onClick={handleCancel}>
                    ✕ Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Vista de Lectura */}
                <div style={formSectionStyle}>
                  <h2 style={formSectionTitleStyle}>Descripción Profesional</h2>
                  <p style={{ color: theme.colors.primary.negro, lineHeight: '1.6' }}>
                    {profileData.descripcion}
                  </p>
                </div>

                <div style={formSectionStyle}>
                  <h2 style={formSectionTitleStyle}>Habilidades y Etiquetas</h2>
                  <div style={tagsContainerStyle}>
                    {profileData.etiquetas.map((tag) => (
                      <div key={tag} style={tagStyle}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div style={buttonGroupStyle}>
                  <button
                    style={primaryButtonStyle}
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Editar Perfil
                  </button>
                  <button
                    style={securityLinkStyle}
                    onClick={() => handleNavigate('/seguridad')}
                  >
                    🔒 Cambiar Contraseña
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilIngeniero;
