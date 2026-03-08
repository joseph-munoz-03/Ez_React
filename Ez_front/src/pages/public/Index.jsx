import React, { useEffect } from 'react';

function Index() {
  useEffect(() => {
    // Verificar si hay token
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole) {
      // Si hay autenticación, redirigir al dashboard según rol
      const redirectMap = {
        'ADMIN': '/admin/dashboard',
        'INGENIERO': '/ingeniero/dashboard',
        'CLIENTE': '/cliente/dashboard',
      };
      window.location.href = redirectMap[userRole] || '/login';
    } else {
      // Si no hay autenticación, redirigir a login después de 2 segundos
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Bienvenido a EZ Platform</h1>
        <p style={styles.subtitle}>Redirigiendo...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    color: '#1f2937',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
  },
};

export default Index;
