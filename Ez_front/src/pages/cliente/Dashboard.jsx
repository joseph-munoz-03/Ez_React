import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Dashboard Cliente - Vista principal del cliente
 * Muestra estatísticas de contratos, pagos y accesos rápidos
 */
const DashboardCliente = () => {
  const [userName, setUserName] = useState('Cliente');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [period, setPeriod] = useState('SEMANAL');
  const [stats, setStats] = useState({
    gastos: 0,
    contratos: 0,
    saldo: 0,
  });
  const [gastos, setGastos] = useState({
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'],
    valores: [0, 0, 0, 0, 0, 0, 0],
  });
  const [contratos, setContratos] = useState({
    total: 0,
    enProceso: 0,
    completados: 0,
  });

  // Simulación de carga de datos
  useEffect(() => {
    // Aquí iría la llamada a la API
    setUserName('Ana Martínez');
    setStats({
      gastos: 3500,
      contratos: 5,
      saldo: 2150,
    });
    setContratos({
      total: 5,
      enProceso: 2,
      completados: 2,
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
    color: theme.colors.accent.azul,
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
    backgroundColor: isActive ? theme.colors.accent.azul : theme.colors.primary.grisSoft,
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
    backgroundColor: theme.colors.accent.azul,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[2],
  });

  const barLabelStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
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
    color: theme.colors.accent.azul,
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
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  return (
    <div>
      <Header
        userRole="CLIENTE"
        userName={userName}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <div style={containerStyle}>
        <Sidebar
          userRole="CLIENTE"
          onNavigate={handleNavigate}
          activeSection={activeSection}
          stats={stats}
        />
        <div style={contentStyle}>
          {/* Bienvenida */}
          <div style={welcomeStyle}>
            <h1 style={welcomeTitleStyle}>¡Bienvenida de nuevo, {userName}! 👋</h1>
            <p style={welcomeSubtitleStyle}>
              Aquí puedes gestionar tus contratos, pagos y buscar ingenieros.
            </p>
          </div>

          {/* Estadísticas Rápidas */}
          <div style={statsGridStyle}>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>Gastos Este Mes</div>
              <div style={statValueStyle}>${stats.gastos.toLocaleString()}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>Contratos Activos</div>
              <div style={statValueStyle}>{stats.contratos}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>Saldo Disponible</div>
              <div style={statValueStyle}>${stats.saldo.toLocaleString()}</div>
            </div>
          </div>

          {/* Secciones de Acceso Rápido */}
          <div style={quickAccessStyle}>
            <QuickAccessCard
              icon="🔍"
              title="Buscar Ingenieros"
              description="Encuentra los mejores profesionales"
              onClick={() => handleNavigate('/marketplace')}
            />
            <QuickAccessCard
              icon="📋"
              title="Mis Contratos"
              description="Gestiona tus contratos activos"
              onClick={() => handleNavigate('/contracts')}
            />
            <QuickAccessCard
              icon="💬"
              title="Chats"
              description="Comunícate con tus ingenieros"
              onClick={() => handleNavigate('/chats')}
            />
            <QuickAccessCard
              icon="💳"
              title="Pagos"
              description="Carga y retira saldo"
              onClick={() => handleNavigate('/payments')}
            />
            <QuickAccessCard
              icon="📅"
              title="Calendario"
              description="Controla tus compromisos"
              onClick={() => handleNavigate('/calendar')}
            />
            <QuickAccessCard
              icon="⚙️"
              title="Configuración"
              description="Actualiza tu perfil"
              onClick={() => handleNavigate('/profile')}
            />
          </div>

          {/* Gráficas */}
          <div style={chartsContainerStyle}>
            {/* Gráfica de Gastos */}
            <div style={chartCardStyle}>
              <div style={chartHeaderStyle}>
                <h2 style={chartTitleStyle}>Gastos en Servicios</h2>
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
                labels={gastos.labels} 
                values={[420, 680, 550, 800, 950, 250, 300]}
              />
              <div style={{ textAlign: 'center', marginTop: theme.spacing[4] }}>
                <div style={{ fontSize: theme.typography.fontSize.xl, fontWeight: 'bold', color: theme.colors.accent.azul }}>
                  $3,550
                </div>
                <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.primary.gris }}>
                  Total {period.toLowerCase()}
                </div>
              </div>
            </div>

            {/* Gráfica de Contratos */}
            <div style={chartCardStyle}>
              <div style={chartHeaderStyle}>
                <h2 style={chartTitleStyle}>Estado de Contratos</h2>
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
                  <div style={contractStatNumberStyle}>{contratos.completados}</div>
                  <div style={contractStatLabelStyle}>Completados</div>
                </div>
              </div>
              <SimpleBarChart 
                labels={['Total', 'Proceso', 'Completado']}
                values={[contratos.total, contratos.enProceso, contratos.completados]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCliente;
