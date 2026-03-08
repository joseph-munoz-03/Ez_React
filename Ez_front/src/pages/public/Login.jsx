import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsAuthenticated, setUserRole }) {
  const [email, setEmail] = useState('admin@example.com');
  const [contrasena, setContrasena] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        contrasena,
      });

      const { token, usuario } = response.data;
      
      // Guardar token y usuario
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', usuario);
      
      // Determinar el rol (por ahora asumir admin con ese email)
      let userRole = 'CLIENTE';
      if (email === 'admin@example.com') {
        userRole = 'ADMIN';
      } else if (email.includes('ingeniero')) {
        userRole = 'INGENIERO';
      }
      
      localStorage.setItem('userRole', userRole);
      
      // Actualizar estado en App
      if (setIsAuthenticated && setUserRole) {
        setIsAuthenticated(true);
        setUserRole(userRole);
      }
      
      // Redirigir según rol
      const redirectMap = {
        'ADMIN': '/admin/dashboard',
        'INGENIERO': '/ingeniero/dashboard',
        'CLIENTE': '/cliente/dashboard',
      };
      
      window.location.href = redirectMap[userRole];
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>EZ Platform</h1>
        <h2 style={styles.subtitle}>Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p style={styles.registerLink}>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
        
        <div style={styles.helpText}>
          <p><strong>Demo:</strong></p>
          <p>Admin: admin@example.com / admin123</p>
        </div>
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
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '10px',
    fontSize: '28px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '30px',
    fontSize: '18px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#374151',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6b7280',
    fontSize: '14px',
  },
  helpText: {
    marginTop: '30px',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '20px',
    fontSize: '12px',
    color: '#6b7280',
  },
};

export default Login;
