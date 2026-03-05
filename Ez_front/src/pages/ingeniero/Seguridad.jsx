import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Seguridad Ingeniero - Gestión de contraseña y seguridad
 * Permite cambiar contraseña y ver información de seguridad
 */
const SeguridadIngeniero = () => {
  const [userName, setUserName] = useState('Ingeniero');
  const [activeSection, setActiveSection] = useState('seguridad');
  const [email] = useState('carlos@example.com');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const containerStyle = {
    marginLeft: '250px',
    minHeight: '100vh',
    backgroundColor: theme.colors.primary.grisSoft,
    paddingTop: '80px',
  };

  const contentStyle = {
    padding: `${theme.spacing[6]} ${theme.spacing[8]}`,
    maxWidth: '800px',
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

  const sectionStyle = {
    marginBottom: theme.spacing[8],
    paddingBottom: theme.spacing[6],
    borderBottom: `1px solid ${theme.colors.primary.grisSoft}`,
  };

  const sectionTitleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[4],
  };

  const infoBoxStyle = {
    backgroundColor: theme.colors.primary.grisSoft,
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[4],
  };

  const infoLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
    marginBottom: theme.spacing[1],
  };

  const infoValueStyle = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary.negro,
    fontWeight: theme.typography.fontWeight.semibold,
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

  const inputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    paddingRight: theme.spacing[12],
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
    fontFamily: 'inherit',
  };

  const togglePasswordButtonStyle = {
    position: 'absolute',
    right: theme.spacing[3],
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary.gris,
  };

  const strengthBarStyle = {
    width: '100%',
    height: '4px',
    backgroundColor: theme.colors.primary.grisSoft,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing[2],
    overflow: 'hidden',
  };

  const strengthFillStyle = (strength) => {
    let bgColor = theme.colors.accent.rojo;
    if (strength >= 40) bgColor = '#F59E0B'; // Naranja
    if (strength >= 70) bgColor = theme.colors.accent.verde;
    
    return {
      height: '100%',
      width: `${strength}%`,
      backgroundColor: bgColor,
      transition: `width ${theme.transitions.duration[300]}`,
    };
  };

  const strengthTextStyle = (strength) => {
    let text = 'Muy débil';
    let color = theme.colors.accent.rojo;
    
    if (strength >= 40) {
      text = 'Débil';
      color = '#F59E0B';
    }
    if (strength >= 60) {
      text = 'Media';
      color = '#F59E0B';
    }
    if (strength >= 80) {
      text = 'Fuerte';
      color = theme.colors.accent.verde;
    }
    
    return { text, color };
  };

  const helperTextStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
    marginTop: theme.spacing[2],
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1],
  };

  const messageStyle = (type) => ({
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing[4],
    marginBottom: theme.spacing[4],
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    backgroundColor: type === 'success' ? '#D1FAE5' : '#FEE2E2',
    color: type === 'success' ? '#065F46' : '#991B1B',
    border: `1px solid ${type === 'success' ? '#A7F3D0' : '#FECACA'}`,
  });

  const buttonGroupStyle = {
    display: 'flex',
    gap: theme.spacing[3],
    marginTop: theme.spacing[6],
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

  const warningBoxStyle = {
    backgroundColor: '#FEF3C7',
    border: `2px solid #FBBF24`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    marginTop: theme.spacing[6],
  };

  const warningTitleStyle = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#92400E',
    marginBottom: theme.spacing[2],
  };

  const warningTextStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: '#78350F',
  };

  // Validación de contraseña
  const validatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[!@#$%^&*]/.test(password)) strength += 10;
    
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    
    if (name === 'newPassword') {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    if (!passwordData.oldPassword) {
      setMessage({ type: 'error', text: 'Debes ingresar tu contraseña anterior' });
      return false;
    }
    
    if (!passwordData.newPassword) {
      setMessage({ type: 'error', text: 'Debes ingresar una nueva contraseña' });
      return false;
    }
    
    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 8 caracteres' });
      return false;
    }
    
    if (passwordStrength < 60) {
      setMessage({ type: 'error', text: 'La contraseña no es lo suficientemente fuerte' });
      return false;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return false;
    }
    
    if (passwordData.oldPassword === passwordData.newPassword) {
      setMessage({ type: 'error', text: 'La nueva contraseña debe ser diferente a la anterior' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulación de envío a API
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: '✓ Contraseña actualizada correctamente',
      });
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordStrength(0);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordStrength(0);
    setMessage({ type: '', text: '' });
  };

  const handleNavigate = (path) => {
    console.log(`Navegando a: ${path}`);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  const strength = strengthTextStyle(passwordStrength);

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
            <h1 style={pageTitleStyle}>Seguridad y Contraseña</h1>
            <p style={pageSubtitleStyle}>
              Protege tu cuenta con una contraseña segura
            </p>
          </div>

          {/* Card Principal */}
          <div style={cardStyle}>
            {/* Sección: Email */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Información de la Cuenta</h2>
              <div style={infoBoxStyle}>
                <div style={infoLabelStyle}>Email registrado</div>
                <div style={infoValueStyle}>{email}</div>
              </div>
              <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.primary.gris }}>
                Tu email es la información de inicio de sesión. Si necesitas cambiarla, contacta con soporte.
              </p>
            </div>

            {/* Sección: Cambiar Contraseña */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Cambiar Contraseña</h2>
              
              {message.text && (
                <div style={messageStyle(message.type)}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Campo: Contraseña Antigua */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Contraseña Anterior</label>
                  <div style={inputContainerStyle}>
                    <input
                      type={showPassword.old ? 'text' : 'password'}
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu contraseña anterior"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      style={togglePasswordButtonStyle}
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          old: !showPassword.old,
                        })
                      }
                    >
                      {showPassword.old ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Campo: Contraseña Nueva */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Contraseña Nueva</label>
                  <div style={inputContainerStyle}>
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu nueva contraseña"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      style={togglePasswordButtonStyle}
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          new: !showPassword.new,
                        })
                      }
                    >
                      {showPassword.new ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  
                  {/* Indicador de Fortaleza */}
                  {passwordData.newPassword && (
                    <>
                      <div style={strengthBarStyle}>
                        <div style={strengthFillStyle(passwordStrength)} />
                      </div>
                      <div style={{ fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[2], color: strength.color }}>
                        Fortaleza: {strength.text}
                      </div>
                    </>
                  )}
                  
                  <div style={helperTextStyle}>
                    <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                      <span>{passwordData.newPassword && passwordData.newPassword.length >= 8 ? '✓' : '○'}</span>
                      <span>Al menos 8 caracteres</span>
                    </div>
                    <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                      <span>{passwordData.newPassword && /[A-Z]/.test(passwordData.newPassword) ? '✓' : '○'}</span>
                      <span>Una letra mayúscula</span>
                    </div>
                    <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                      <span>{passwordData.newPassword && /[a-z]/.test(passwordData.newPassword) ? '✓' : '○'}</span>
                      <span>Una letra minúscula</span>
                    </div>
                    <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                      <span>{passwordData.newPassword && /[0-9]/.test(passwordData.newPassword) ? '✓' : '○'}</span>
                      <span>Un número</span>
                    </div>
                    <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                      <span>{passwordData.newPassword && /[!@#$%^&*]/.test(passwordData.newPassword) ? '✓' : '○'}</span>
                      <span>Un carácter especial (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>

                {/* Campo: Confirmar Contraseña */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Confirmar Contraseña</label>
                  <div style={inputContainerStyle}>
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirma tu nueva contraseña"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      style={togglePasswordButtonStyle}
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirm: !showPassword.confirm,
                        })
                      }
                    >
                      {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordData.newPassword && passwordData.confirmPassword && (
                    <div style={{ fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[2], color: passwordData.newPassword === passwordData.confirmPassword ? theme.colors.accent.verde : theme.colors.accent.rojo }}>
                      {passwordData.newPassword === passwordData.confirmPassword
                        ? '✓ Las contraseñas coinciden'
                        : '✗ Las contraseñas no coinciden'}
                    </div>
                  )}
                </div>

                {/* Botones de Acción */}
                <div style={buttonGroupStyle}>
                  <button
                    type="submit"
                    style={primaryButtonStyle}
                    disabled={isLoading}
                  >
                    {isLoading ? '⏳ Actualizando...' : '✓ Cambiar Contraseña'}
                  </button>
                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={handleReset}
                  >
                    ✕ Cancelar
                  </button>
                </div>
              </form>
            </div>

            {/* Advertencia de Seguridad */}
            <div style={warningBoxStyle}>
              <div style={warningTitleStyle}>⚠️ Consejos de Seguridad</div>
              <div style={warningTextStyle}>
                <ul style={{ margin: 0, paddingLeft: theme.spacing[4], lineHeight: '1.8' }}>
                  <li>Usa una contraseña única que no uses en otros sitios</li>
                  <li>Cambia tu contraseña regularmente (cada 3 meses)</li>
                  <li>No compartas tu contraseña con nadie</li>
                  <li>Si sospechas que tu cuenta fue comprometida, cambia tu contraseña inmediatamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeguridadIngeniero;
