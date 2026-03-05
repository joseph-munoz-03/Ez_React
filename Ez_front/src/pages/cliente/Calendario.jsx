import React, { useState, useMemo } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Calendario Cliente - Gestión de pagos y compromisos
 * Visualiza fechas de pagos a ingenieros y entregas esperadas
 */
const CalendarioCliente = () => {
  const [userName, setUserName] = useState('Cliente');
  const [activeSection, setActiveSection] = useState('calendario');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // Marzo 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      fecha: '2025-03-10',
      tipo: 'ENTREGA',
      ingeniero: 'Carlos García',
      descripcion: 'Entrega de módulo de autenticación',
      estado: 'COMPLETADO',
    },
    {
      id: 2,
      fecha: '2025-03-15',
      tipo: 'PAGO',
      ingeniero: 'Carlos García',
      monto: 500,
      estado: 'PENDIENTE',
    },
    {
      id: 3,
      fecha: '2025-03-22',
      tipo: 'ENTREGA',
      ingeniero: 'María López',
      descripcion: 'Entrega de frontend',
      estado: 'PENDIENTE',
    },
    {
      id: 4,
      fecha: '2025-03-28',
      tipo: 'PAGO',
      ingeniero: 'María López',
      monto: 800,
      estado: 'PENDIENTE',
    },
    {
      id: 5,
      fecha: '2025-03-05',
      tipo: 'INICIO',
      ingeniero: 'Juan Pérez',
      descripcion: 'Inicio del proyecto de API',
      estado: 'ACTIVO',
    },
  ]);

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

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: theme.spacing[6],
  };

  const calendarCardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    padding: theme.spacing[6],
  };

  const calendarHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
    paddingBottom: theme.spacing[4],
    borderBottom: `2px solid ${theme.colors.accent.azul}`,
  };

  const monthYearStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
  };

  const navigationButtonStyle = {
    padding: theme.spacing[2],
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.lg,
  };

  const weekdaysStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[4],
  };

  const weekdayStyle = {
    textAlign: 'center',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.gris,
    padding: theme.spacing[2],
  };

  const daysGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: theme.spacing[2],
  };

  const dayStyle = (isCurrentMonth, isSelected, hasEvent, isToday) => ({
    aspectRatio: '1',
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    border: isSelected 
      ? `2px solid ${theme.colors.accent.azul}` 
      : `1px solid ${theme.colors.primary.grisSoft}`,
    backgroundColor: isCurrentMonth 
      ? (isToday ? '#DBEAFE' : theme.colors.primary.blanco)
      : theme.colors.primary.grisSoft,
    cursor: isCurrentMonth ? 'pointer' : 'default',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transition: `all ${theme.transitions.duration[200]}`,
    fontSize: theme.typography.fontSize.sm,
    color: isCurrentMonth ? theme.colors.primary.negro : theme.colors.primary.gris,
  });

  const dayNumberStyle = {
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing[1],
  };

  const eventDotStyle = (type) => {
    const colors = {
      PAGO: theme.colors.accent.azul,
      ENTREGA: '#10B981',
      INICIO: theme.colors.accent.morado,
    };
    return {
      width: '6px',
      height: '6px',
      borderRadius: theme.borderRadius.full,
      backgroundColor: colors[type] || theme.colors.accent.azul,
    };
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[6],
  };

  const cardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    padding: theme.spacing[6],
  };

  const cardTitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[4],
    paddingBottom: theme.spacing[3],
    borderBottom: `2px solid ${theme.colors.accent.azul}`,
  };

  const eventDetailStyle = {
    padding: theme.spacing[4],
    backgroundColor: theme.colors.primary.grisSoft,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[3],
    borderLeft: `4px solid ${theme.colors.accent.azul}`,
  };

  const eventTitleStyle = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[1],
  };

  const eventInfoStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[2],
  };

  const eventMontoStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.accent.azul,
  };

  const statusBadgeStyle = (estado) => {
    const colors = {
      PENDIENTE: { bg: '#FEF3C7', color: '#92400E' },
      COMPLETADO: { bg: '#D1FAE5', color: '#065F46' },
      ACTIVO: { bg: '#DBEAFE', color: '#0C4A6E' },
    };
    const style = colors[estado] || colors.PENDIENTE;
    return {
      display: 'inline-block',
      padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
      backgroundColor: style.bg,
      color: style.color,
      borderRadius: theme.borderRadius.full,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.semibold,
    };
  };

  const payButtonStyle = {
    width: '100%',
    padding: theme.spacing[2],
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: theme.spacing[2],
  };

  const legendStyle = {
    padding: theme.spacing[4],
    backgroundColor: theme.colors.primary.grisSoft,
    borderRadius: theme.borderRadius.md,
  };

  const legendTitleStyle = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[3],
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[2],
    fontSize: theme.typography.fontSize.xs,
  };

  // Funciones auxiliares
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => event.fecha === dateStr);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const handlePayment = (eventId) => {
    console.log('Procesando pago para evento:', eventId);
    // Aquí iría la lógica para procesar el pago
  };

  // Construir días del calendario
  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysArray = [];

    // Días del mes anterior
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return daysArray;
  }, [currentDate]);

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const monthYear = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

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
        />
        <div style={contentStyle}>
          {/* Encabezado */}
          <div style={pageHeaderStyle}>
            <h1 style={pageTitleStyle}>📅 Calendario de Compromisos</h1>
            <p style={pageSubtitleStyle}>
              Visualiza tus pagos programados y entregas esperadas
            </p>
          </div>

          {/* Grid Principal */}
          <div style={mainGridStyle}>
            {/* Calendario */}
            <div style={calendarCardStyle}>
              {/* Encabezado del Calendario */}
              <div style={calendarHeaderStyle}>
                <button style={navigationButtonStyle} onClick={previousMonth}>
                  ←
                </button>
                <h2 style={monthYearStyle}>{monthYear}</h2>
                <button style={navigationButtonStyle} onClick={nextMonth}>
                  →
                </button>
              </div>

              {/* Días de la semana */}
              <div style={weekdaysStyle}>
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'].map((day) => (
                  <div key={day} style={weekdayStyle}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div style={daysGridStyle}>
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} />;
                  }

                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                  const isSelected =
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();
                  const dateEvents = getEventsForDate(date);
                  const isTdy = isToday(date);

                  return (
                    <div
                      key={date.toISOString()}
                      style={dayStyle(isCurrentMonth, isSelected, dateEvents.length > 0, isTdy)}
                      onClick={() => isCurrentMonth && setSelectedDate(date)}
                    >
                      <div style={dayNumberStyle}>{date.getDate()}</div>
                      {dateEvents.length > 0 && (
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {dateEvents.slice(0, 2).map((event) => (
                            <div key={event.id} style={eventDotStyle(event.tipo)} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Leyenda */}
              <div style={{ ...legendStyle, marginTop: theme.spacing[6] }}>
                <div style={legendTitleStyle}>Tipos de Eventos</div>
                <div style={legendItemStyle}>
                  <div style={eventDotStyle('PAGO')} />
                  <span>Pago Pendiente</span>
                </div>
                <div style={legendItemStyle}>
                  <div style={eventDotStyle('ENTREGA')} />
                  <span>Entrega Esperada</span>
                </div>
                <div style={legendItemStyle}>
                  <div style={eventDotStyle('INICIO')} />
                  <span>Inicio de Proyecto</span>
                </div>
              </div>
            </div>

            {/* Sidebar - Detalles del Día Seleccionado */}
            <div style={sidebarStyle}>
              {/* Evento Seleccionado */}
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>Detalles del Día</h3>
                {selectedDate ? (
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.lg,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.primary.negro,
                        marginBottom: theme.spacing[4],
                      }}
                    >
                      {selectedDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {selectedDateEvents.length > 0 ? (
                      selectedDateEvents.map((event) => (
                        <div key={event.id} style={eventDetailStyle}>
                          <div style={eventTitleStyle}>
                            {event.tipo === 'PAGO' ? '💳 Pago' : event.tipo === 'ENTREGA' ? '📦 Entrega' : '🚀 Inicio'}
                            {' - '}{event.ingeniero}
                          </div>
                          {event.descripcion && (
                            <div style={eventInfoStyle}>
                              <span>{event.descripcion}</span>
                            </div>
                          )}
                          <div style={eventInfoStyle}>
                            <span>Estado:</span>
                            <span style={statusBadgeStyle(event.estado)}>
                              {event.estado}
                            </span>
                          </div>
                          {event.monto && (
                            <div style={eventMontoStyle}>${event.monto}</div>
                          )}
                          {event.tipo === 'PAGO' && event.estado === 'PENDIENTE' && (
                            <button
                              style={payButtonStyle}
                              onClick={() => handlePayment(event.id)}
                            >
                              💳 Pagar Ahora
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p style={{ color: theme.colors.primary.gris, fontSize: theme.typography.fontSize.sm }}>
                        No hay eventos programados para este día
                      </p>
                    )}
                  </div>
                ) : (
                  <p style={{ color: theme.colors.primary.gris, fontSize: theme.typography.fontSize.sm }}>
                    Selecciona un día para ver los detalles
                  </p>
                )}
              </div>

              {/* Próximos Eventos */}
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>Próximos Pagos</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                  {events
                    .filter((event) => event.tipo === 'PAGO' && event.estado === 'PENDIENTE')
                    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                    .slice(0, 5)
                    .map((event) => (
                      <div key={event.id} style={{ paddingBottom: theme.spacing[2], borderBottom: `1px solid ${theme.colors.primary.grisSoft}` }}>
                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.primary.gris }}>
                          {new Date(event.fecha).toLocaleDateString('es-ES')}
                        </div>
                        <div style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.primary.negro }}>
                          A: {event.ingeniero}
                        </div>
                        <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.accent.azul, fontWeight: 'bold' }}>
                          ${event.monto}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioCliente;
