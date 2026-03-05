import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/admin/dashboard');
      setDashboard(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: '30px',
    backgroundColor: theme.colors.primary.grisSoft,
    minHeight: '100vh'
  };

  const titleStyle = {
    color: theme.colors.primary.negro,
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  };

  if (loading) return (
    <div style={{ ...containerStyle, textAlign: 'center', paddingTop: '100px' }}>
      <p style={{ color: theme.colors.primary.gris }}>Cargando...</p>
    </div>
  );
  
  if (!dashboard) return (
    <div style={{ ...containerStyle, textAlign: 'center', paddingTop: '100px' }}>
      <p style={{ color: theme.colors.accent.rojo }}>Error al cargar datos</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Dashboard Administrativo</h1>

      {/* Estadísticas principales */}
      <div style={gridStyle}>
        <StatCard label="Total Usuarios" value={dashboard.totalUsers} color={theme.colors.accent.azul} />
        <StatCard label="Ingenieros" value={dashboard.totalEngineers} color={theme.colors.accent.verde} />
        <StatCard label="Clientes" value={dashboard.totalClients} color={theme.colors.accent.morado} />
        <StatCard label="Usuarios Inactivos" value={dashboard.totalInactiveUsers} color={theme.colors.accent.rojo} />
        <StatCard label="Contratos" value={dashboard.totalContracts} color={theme.colors.primary.negro} />
        <StatCard label="Publicaciones" value={dashboard.totalPublications} color={theme.colors.primary.gris} />
        <StatCard label="Reportes" value={dashboard.totalReports} color={theme.colors.accent.rojo} />
        <StatCard label="Chats" value={dashboard.totalChats} color={theme.colors.accent.azul} />
      </div>

      {/* Botones de acceso rápido */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '40px'
      }}>
        <QuickAccessButton to="/admin/users" label="Gestión de Usuarios" />
        <QuickAccessButton to="/admin/reports" label="Reportes" />
        <QuickAccessButton to="/admin/chats" label="Chats" />
        <QuickAccessButton to="/admin/marketplace" label="Marketplace Moderación" />
        <QuickAccessButton to="/admin/contracts" label="Contratos" />
        <QuickAccessButton to="/admin/emails" label="Correos Masivos" />
      </div>

      {/* Gráficas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <ChartSection title="Ventas por Semana" data={dashboard.ventasGrafica} />
        <ChartSection title="Reportes por Semana" data={dashboard.reportesGrafica} />
        <ChartSection title="Usuarios por Tipo" data={dashboard.usuariosPorTipo} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div style={{
    backgroundColor: theme.colors.primary.blanco,
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.colors.accent.grisSecundario}`
  }}>
    <p style={{
      color: theme.colors.primary.gris,
      fontSize: '14px',
      margin: '0 0 10px 0',
      fontWeight: '500'
    }}>{label}</p>
    <h3 style={{
      color: color,
      fontSize: '32px',
      margin: 0,
      fontWeight: '700'
    }}>{value}</h3>
  </div>
);

const QuickAccessButton = ({ to, label }) => (
  <button style={{
    padding: '12px 20px',
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = '#2563EB';
    e.target.style.transform = 'scale(1.02)';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = theme.colors.accent.azul;
    e.target.style.transform = 'scale(1)';
  }}>
    {label}
  </button>
);

const ChartSection = ({ title, data }) => (
  <div style={{
    backgroundColor: theme.colors.primary.blanco,
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.colors.accent.grisSecundario}`
  }}>
    <h3 style={{
      color: theme.colors.primary.negro,
      margin: '0 0 15px 0',
      fontWeight: '600'
    }}>{title}</h3>
    {data && data.length > 0 ? (
      <div style={{ height: '200px', backgroundColor: theme.colors.primary.grisSoft, borderRadius: '8px' }}>
        {/* Placeholder para gráfica - implementar con librería de gráficas */}
        <p style={{ textAlign: 'center', padding: '80px 20px', color: theme.colors.primary.gris }}>
          Gráfica de {title}
        </p>
      </div>
    ) : (
      <p style={{ color: theme.colors.primary.gris, textAlign: 'center' }}>No hay datos disponibles</p>
    )}
  </div>
);

export default AdminDashboard;
