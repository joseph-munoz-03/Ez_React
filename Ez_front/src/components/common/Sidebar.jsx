import React, { useState } from 'react';
import theme from '../../themes/theme.config';

/**
 * Sidebar Component - Navegación lateral de la aplicación
 * Muestra menu principal, estadísticas rápidas y opciones filtración
 */
const Sidebar = ({ userRole, onNavigate, activeSection, stats }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarStyle = {
    ...theme.components.sidebar,
    width: isCollapsed ? '80px' : '250px',
    transition: `width ${theme.transitions.duration[300]}`,
    position: 'fixed',
    left: 0,
    top: '80px',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
    zIndex: 100,
  };

  const toggleBtnStyle = {
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    border: 'none',
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.lg,
    marginBottom: theme.spacing[4],
    width: '100%',
    transition: `all ${theme.transitions.duration[300]}`,
    fontWeight: theme.typography.fontWeight.bold,
  };

  const menuItemStyle = (isActive) => ({
    padding: `${theme.spacing[3]} ${theme.spacing[3]}`,
    marginBottom: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    whiteSpace: 'nowrap',
    color: theme.colors.primary.blanco,
    transition: `all ${theme.transitions.duration[200]}`,
    backgroundColor: isActive
      ? 'rgba(255, 255, 255, 0.2)'
      : 'transparent',
    borderLeft: isActive
      ? `4px solid ${theme.colors.accent.verde}`
      : '4px solid transparent',
    paddingLeft: isActive ? 'calc(1rem - 4px)' : '1rem',
  });

  const statsContainerStyle = {
    marginTop: theme.spacing[6],
    paddingTop: theme.spacing[4],
    borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
    display: isCollapsed ? 'none' : 'block',
  };

  const statItemStyle = {
    marginBottom: theme.spacing[4],
    padding: theme.spacing[3],
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.md,
  };

  const statLabelStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: theme.spacing[1],
    textTransform: 'uppercase',
  };

  const statValueStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.blanco,
  };

  const roleBasedMenuItems = {
    INGENIERO: [
      { label: 'Dashboard', icon: '📊', path: '/dashboard' },
      { label: 'Mis Publicaciones', icon: '📢', path: '/publications' },
      { label: 'Contratos', icon: '📋', path: '/contracts' },
      { label: 'Ingresos', icon: '💰', path: '/earnings' },
      { label: 'Calendario', icon: '📅', path: '/calendar' },
      { label: 'Chats', icon: '💬', path: '/chats' },
    ],
    CLIENTE: [
      { label: 'Dashboard', icon: '📊', path: '/dashboard' },
      { label: 'Marketplace', icon: '🔍', path: '/marketplace' },
      { label: 'Mis Contratos', icon: '📋', path: '/contracts' },
      { label: 'Pagos', icon: '💳', path: '/payments' },
      { label: 'Calendario', icon: '📅', path: '/calendar' },
      { label: 'Chats', icon: '💬', path: '/chats' },
    ],
    ADMIN: [
      { label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
      { label: 'Usuarios', icon: '👥', path: '/admin/users' },
      { label: 'Transacciones', icon: '💳', path: '/admin/transactions' },
      { label: 'Reportes', icon: '📈', path: '/admin/reports' },
      { label: 'Configuración', icon: '⚙️', path: '/admin/settings' },
    ],
  };

  const menuItems = roleBasedMenuItems[userRole] || roleBasedMenuItems.CLIENTE;

  const handleMenuClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <aside style={sidebarStyle}>
      {/* Toggle Button */}
      <button
        style={toggleBtnStyle}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = theme.colors.accent.morado;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = theme.colors.accent.verde;
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Menu Items */}
      <nav>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={menuItemStyle(activeSection === item.path)}
            onMouseEnter={(e) => {
              if (activeSection !== item.path) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.path) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
            onClick={() => handleMenuClick(item.path)}
          >
            {!isCollapsed && (
              <>
                <span style={{ marginRight: theme.spacing[2] }}>
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
            {isCollapsed && <span>{item.icon}</span>}
          </div>
        ))}
      </nav>

      {/* Quick Stats */}
      {stats && !isCollapsed && (
        <div style={statsContainerStyle}>
          {stats.map((stat, index) => (
            <div key={index} style={statItemStyle}>
              <div style={statLabelStyle}>
                {stat.label}
              </div>
              <div style={statValueStyle}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
