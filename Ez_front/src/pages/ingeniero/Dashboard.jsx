import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Dashboard Ingeniero - Vista principal del ingeniero
 * Muestra estadísticas, ingresos, contratos y accesos rápidos
 */
const DashboardIngeniero = () => {
  const [userName, setUserName] = useState('Ingeniero');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [period, setPeriod] = useState('SEMANAL');
  const [stats, setStats] = useState({
    ingresos: 0,
    contratos: 0,
    tareas: 0,
  });
  const [ingresos, setIngresos] = useState({
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'],
    valores: [0, 0, 0, 0, 0, 0, 0],
  });
  const [contratos, setContratos] = useState({
    total: 0,
    enProceso: 0,
    cancelados: 0,
  });

  // Simulación de carga de datos
  useEffect(() => {
    // Aquí iría la llamada a la API
    setUserName('Carlos García');
    setStats({
      ingresos: 5250,
      contratos: 8,
      tareas: 12,
    });
    setContratos({
      total: 8,
      enProceso: 3,
      cancelados: 1,
    });
  }, [period]);

  const containerStyle = {
    marginLeft: '250px',
    minHeight: '100vh',
    backgroundColor: theme.colors.primary.grisSoft,
    paddingTop: '80px',
  };

  const contentStyle = {
    padding: `${theme.spacing[6]} ${theme.spacing[8]}`,
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const welcomeStyle = {
    marginBottom: theme.spacing[8],
  };

  const welcomeTitleStyle = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const welcomeSubtitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary.gris,
  };

  // Secciones de acceso rápido
  const quickAccessStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[8],
  };

  const cardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    cursor: 'pointer',
    transition: `transform ${theme.transitions.duration[200]}, box-shadow ${theme.transitions.duration[200]}`,
    textAlign: 'center',
  };

  const cardHoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows.lg,
  };

  const cardIconStyle = {
    fontSize: '3rem',
    marginBottom: theme.spacing[2],
  };

  const cardTitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[1],
  };

  const cardDescriptionStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
  };

  // Gráficas
  const chartsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: theme.spacing[6],
    marginTop: theme.spacing[8],
  };

  const chartCardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
  };

  const chartHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  };

  const chartTitleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
  };

  const filterButtonStyle = (isActive) => ({
    padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
    margin: `0 ${theme.spacing[1]}`,
    backgroundColor: isActive ? theme.colors.accent.verde : theme.colors.primary.grisSoft,
    color: isActive ? theme.colors.primary.blanco : theme.colors.primary.negro,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: `all ${theme.transitions.duration[200]}`,
  });

  const barChartStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '200px',
    gap: theme.spacing[2],
  };

  const barStyle = (value) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    maxWidth: '50px',
  });

  const barFillStyle = (value, maxValue = 100) => ({
    width: '100%',
    height: `${(value / maxValue) * 150}px`,
    backgroundColor: theme.colors.accent.verde,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[2],
  });

  const barLabelStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[8],
  };

  const statBoxStyle = {
    backgroundColor: theme.colors.primary.blanco,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
  };

  const statLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
    marginBottom: theme.spacing[2],
  };

  const statValueStyle = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.accent.verde,
  };

  const ContractStatsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing[3],
    marginBottom: theme.spacing[4],
  };

  const contractStatStyle = {
    textAlign: 'center',
    padding: theme.spacing[4],
    backgroundColor: theme.colors.primary.grisSoft,
    borderRadius: theme.borderRadius.md,
  };

  const contractStatNumberStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.accent.verde,
    marginBottom: theme.spacing[1],
  };

  const contractStatLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
  };

  // Componentes reutilizables
  const QuickAccessCard = ({ icon, title, description, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        style={{
          ...cardStyle,
          ...(isHovered ? cardHoverStyle : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div style={cardIconStyle}>{icon}</div>
        <div style={cardTitleStyle}>{title}</div>
        <div style={cardDescriptionStyle}>{description}</div>
      </div>
    );
  };

  const SimpleBarChart = ({ labels, values }) => {
    const maxValue = Math.max(...values, 1);
    return (
      <div style={barChartStyle}>
        {labels.map((label, index) => (
          <div key={index} style={barStyle(values[index])}>
            <div style={barFillStyle(values[index], maxValue)} />
            <div style={barLabelStyle}>{label}</div>
          </div>
        ))}
      </div>
    );
  };

  const handleNavigate = (path) => {
    console.log(`Navegando a: ${path}`);
    // Implementar navegación real con React Router
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Implementar logout real
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
          stats={stats}
        />
        <div style={contentStyle}>
          {/* Bienvenida */}
          <div style={welcomeStyle}>
            <h1 style={welcomeTitleStyle}>¡Bienvenido de nuevo, {userName}! 👋</h1>
            <p style={welcomeSubtitleStyle}>
              Aquí puedes gestionar tus contratos, ingresos y publicaciones.
            </p>
          </div>

          {/* Estadísticas Rápidas */}
          <div style={statsGridStyle}>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>Ingresos Este Mes</div>
              <div style={statValueStyle}>${stats.ingresos.toLocaleString()}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>Contratos Activos</div>
              <div style={statValueStyle}>{stats.contratos}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>Tareas Pendientes</div>
              <div style={statValueStyle}>{stats.tareas}</div>
            </div>
          </div>

          {/* Secciones de Acceso Rápido */}
          <div style={quickAccessStyle}>
            <QuickAccessCard
              icon="📊"
              title="Ver Estadísticas"
              description="Analiza tu desempeño"
              onClick={() => handleNavigate('/statistics')}
            />
            <QuickAccessCard
              icon="📋"
              title="Mis Contratos"
              description="Gestiona tus contratos"
              onClick={() => handleNavigate('/contracts')}
            />
            <QuickAccessCard
              icon="📢"
              title="Publicaciones"
              description="Crea nuevas ofertas"
              onClick={() => handleNavigate('/publications')}
            />
            <QuickAccessCard
              icon="💬"
              title="Chats"
              description="Comunícate con clientes"
              onClick={() => handleNavigate('/chats')}
            />
            <QuickAccessCard
              icon="💰"
              title="Mis Ingresos"
              description="Retira tu saldo"
              onClick={() => handleNavigate('/earnings')}
            />
            <QuickAccessCard
              icon="📅"
              title="Calendario"
              description="Controla tus pagos"
              onClick={() => handleNavigate('/calendar')}
            />
          </div>

          {/* Gráficas */}
          <div style={chartsContainerStyle}>
            {/* Gráfica de Ingresos */}
            <div style={chartCardStyle}>
              <div style={chartHeaderStyle}>
                <h2 style={chartTitleStyle}>Ingresos</h2>
                <div>
                  {['DIARIO', 'SEMANAL', 'MENSUAL', 'ANUAL'].map((p) => (
                    <button
                      key={p}
                      style={filterButtonStyle(period === p)}
                      onClick={() => setPeriod(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <SimpleBarChart 
                labels={ingresos.labels} 
                values={[850, 1200, 950, 1100, 1300, 400, 450]}
              />
              <div style={{ textAlign: 'center', marginTop: theme.spacing[4] }}>
                <div style={{ fontSize: theme.typography.fontSize.xl, fontWeight: 'bold', color: theme.colors.accent.verde }}>
                  $5,250
                </div>
                <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.primary.gris }}>
                  Total {period.toLowerCase()}
                </div>
              </div>
            </div>

            {/* Gráfica de Contratos */}
            <div style={chartCardStyle}>
              <div style={chartHeaderStyle}>
                <h2 style={chartTitleStyle}>Contratos</h2>
                <div>
                  {['DIARIO', 'SEMANAL', 'MENSUAL', 'ANUAL'].map((p) => (
                    <button
                      key={p}
                      style={filterButtonStyle(period === p)}
                      onClick={() => setPeriod(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div style={ContractStatsStyle}>
                <div style={contractStatStyle}>
                  <div style={contractStatNumberStyle}>{contratos.total}</div>
                  <div style={contractStatLabelStyle}>Total</div>
                </div>
                <div style={contractStatStyle}>
                  <div style={contractStatNumberStyle}>{contratos.enProceso}</div>
                  <div style={contractStatLabelStyle}>En Proceso</div>
                </div>
                <div style={contractStatStyle}>
                  <div style={contractStatNumberStyle}>{contratos.cancelados}</div>
                  <div style={contractStatLabelStyle}>Cancelados</div>
                </div>
              </div>
              <SimpleBarChart 
                labels={['Total', 'Proceso', 'Cancelado']}
                values={[contratos.total, contratos.enProceso, contratos.cancelados]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIngeniero;
