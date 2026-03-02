import React, { useState } from 'react';
import theme from '../../themes/theme.config';

/**
 * Header Component - Navegación principal de la aplicación
 * Muestra logo, navegación y opciones de usuario
 */
const Header = ({ userRole, userName, onLogout, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerStyle = {
    ...theme.components.header,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flex: 1,
    marginLeft: '2rem',
  };

  const navItemStyle = {
    color: theme.colors.primary.blanco,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
    transition: `all ${theme.transitions.duration[200]}`,
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.md,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  };

  const userMenuStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.lg,
    minWidth: '200px',
    zIndex: 1001,
  };

  const dropdownItemStyle = {
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    cursor: 'pointer',
    color: theme.colors.primary.negro,
    fontSize: theme.typography.fontSize.sm,
    borderBottom: `1px solid ${theme.colors.grayscale[200]}`,
    transition: `all ${theme.transitions.duration[150]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  };

  const logoStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.blanco,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const userBadgeStyle = {
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    textTransform: 'uppercase',
  };

  const handleNavItem = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <span>🚀</span>
        <span>EZ</span>
      </div>

      {/* Navigation */}
      <nav style={navStyle}>
        <div
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          onClick={() => handleNavItem('/dashboard')}
        >
          Dashboard
        </div>
        <div
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          onClick={() => handleNavItem('/marketplace')}
        >
          Marketplace
        </div>
        <div
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          onClick={() => handleNavItem('/chats')}
        >
          Chats
        </div>
        <div
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          onClick={() => handleNavItem('/calendar')}
        >
          Calendario
        </div>
      </nav>

      {/* User Menu */}
      <div style={userMenuStyle}>
        {userRole && (
          <div style={userBadgeStyle}>
            {userRole}
          </div>
        )}
        
        <div style={{ position: 'relative' }}>
          <div
            style={{
              cursor: 'pointer',
              padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
              borderRadius: theme.borderRadius.md,
              transition: `all ${theme.transitions.duration[150]}`,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            👤 {userName || 'Usuario'}
          </div>

          {isMenuOpen && (
            <div style={dropdownStyle}>
              <div
                style={dropdownItemStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = theme.colors.grayscale[100])}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                onClick={() => {
                  handleNavItem('/profile');
                  setIsMenuOpen(false);
                }}
              >
                Mi Perfil
              </div>
              <div
                style={dropdownItemStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = theme.colors.grayscale[100])}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                onClick={() => {
                  handleNavItem('/security');
                  setIsMenuOpen(false);
                }}
              >
                Seguridad
              </div>
              <div
                style={dropdownItemStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = theme.colors.grayscale[100])}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                onClick={() => {
                  onLogout?.();
                  setIsMenuOpen(false);
                }}
              >
                Cerrar Sesión
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
