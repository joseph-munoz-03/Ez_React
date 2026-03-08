import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import theme from '../../themes/theme.config';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * GraficaContratos Component - Gráfica de estado de contratos del ingeniero
 */
const GraficaContratos = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Simular datos de contratos
    setChartData({
      labels: ['Activos', 'Completados', 'Pendientes', 'Cancelados'],
      datasets: [
        {
          label: 'Contratos',
          data: [8, 15, 3, 2],
          backgroundColor: [
            theme.colors.accent.verde,
            theme.colors.accent.azul,
            theme.colors.accent.morado,
            theme.colors.accent.rojo,
          ],
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: theme.colors.primary.negro,
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Estado de Contratos',
        color: theme.colors.primary.negro,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default GraficaContratos;
