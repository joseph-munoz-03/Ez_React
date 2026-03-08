import React, { useState, useEffect } from 'react';
import theme from '../../themes/theme.config';

/**
 * PaymentHistory Component - Historial de pagos del cliente
 */
const PaymentHistory = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    // Simular historial de pagos
    setPagos([
      {
        id: 1,
        fecha: '2026-03-05',
        concepto: 'Pago entrega 1 - Proyecto Web',
        monto: 500000,
        estado: 'COMPLETADO',
        metodo: 'Mercado Pago',
      },
      {
        id: 2,
        fecha: '2026-03-03',
        concepto: 'Pago entrega 2 - Proyecto Web',
        monto: 500000,
        estado: 'COMPLETADO',
        metodo: 'Mercado Pago',
      },
      {
        id: 3,
        fecha: '2026-02-28',
        concepto: 'Recarga saldo',
        monto: 1000000,
        estado: 'COMPLETADO',
        metodo: 'Tarjeta Crédito',
      },
      {
        id: 4,
        fecha: '2026-02-20',
        concepto: 'Pago entrega 1 - App Móvil',
        monto: 750000,
        estado: 'COMPLETADO',
        metodo: 'Transferencia',
      },
      {
        id: 5,
        fecha: '2026-02-15',
        concepto: 'Retiro saldo',
        monto: 500000,
        estado: 'PENDIENTE',
        metodo: 'Transferencia',
      },
    ]);
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'COMPLETADO':
        return theme.colors.accent.verde;
      case 'PENDIENTE':
        return theme.colors.accent.morado;
      case 'FALLIDO':
        return theme.colors.accent.rojo;
      default:
        return theme.colors.primary.gris;
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Historial de Pagos</h3>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Concepto</th>
              <th style={styles.th}>Monto</th>
              <th style={styles.th}>Método</th>
              <th style={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, index) => (
              <tr key={pago.id} style={{
                ...styles.bodyRow,
                backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
              }}>
                <td style={styles.td}>
                  {new Date(pago.fecha).toLocaleDateString('es-CO')}
                </td>
                <td style={styles.td}>{pago.concepto}</td>
                <td style={{...styles.td, fontWeight: 'bold', color: theme.colors.accent.verde}}>
                  ${pago.monto.toLocaleString()}
                </td>
                <td style={styles.td}>{pago.metodo}</td>
                <td style={{...styles.td, textAlign: 'center'}}>
                  <span style={{
                    backgroundColor: `${getEstadoColor(pago.estado)}20`,
                    color: getEstadoColor(pago.estado),
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}>
                    {pago.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.colors.primary.negro,
    marginBottom: '20px',
    margin: 0,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: theme.colors.grayscale[100],
    borderBottom: `2px solid ${theme.colors.grayscale[200]}`,
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: theme.colors.primary.negro,
    fontSize: '14px',
  },
  bodyRow: {
    borderBottom: `1px solid ${theme.colors.grayscale[200]}`,
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '12px 16px',
    color: theme.colors.primary.gris,
    fontSize: '14px',
  },
};

export default PaymentHistory;
