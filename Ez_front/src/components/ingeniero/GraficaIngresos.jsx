import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import theme from '../../themes/theme.config';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * GraficaIngresos Component - Gráfica de ingresos mensuales del ingeniero
 */
const GraficaIngresos = ({ periodo = 'MENSUAL' }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Simular datos de ingresos
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const ingresos = [2500, 3200, 2800, 4100, 3600, 4300];

    setChartData({
      labels: meses,
      datasets: [
        {
          label: 'Ingresos (COP)',
          data: ingresos,
          borderColor: theme.colors.accent.verde,
          backgroundColor: `${theme.colors.accent.verde}15`,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: theme.colors.accent.verde,
          pointBorderColor: 'white',
          pointBorderWidth: 2,
        },
      ],
    });
  }, [periodo]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.colors.primary.negro,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Ingresos por Período',
        color: theme.colors.primary.negro,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.colors.primary.gris,
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
        },
        grid: {
          color: theme.colors.grayscale[200],
        },
      },
      x: {
        ticks: {
          color: theme.colors.primary.gris,
        },
        grid: {
          color: theme.colors.grayscale[200],
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      {chartData && <Line data={chartData} options={options} />}
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

export default GraficaIngresos;
