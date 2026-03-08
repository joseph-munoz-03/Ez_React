import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [userType, setUserType] = useState(''); // CLIENTE o INGENIERO
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documentoUser: '',
    email: '',
    contrasena: '',
    confirmar: '',
    fechaNacimiento: '',
    genero: '',
    telefono: '',
    apodo: '',
    descripcion: '',
    cuentaMercadoPago: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // Para separar en 2 pasos si es muy largo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (!userType) {
      setError('Por favor selecciona un tipo de usuario');
      return;
    }

    if (formData.contrasena !== formData.confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.contrasena) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        documentoUser: formData.documentoUser ? parseInt(formData.documentoUser) : null,
        email: formData.email,
        contrasena: formData.contrasena,
        fechaNacimiento: formData.fechaNacimiento || null,
        genero: formData.genero || null,
        telefono: formData.telefono || null,
        apodo: formData.apodo || null,
        descripcion: formData.descripcion || null,
        cuentaMercadoPago: formData.cuentaMercadoPago || null,
        estado: 'activo',
        roles: [userType], // CLIENTE o INGENIERO
      };

      console.log('📤 Enviando payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post('http://localhost:8080/auth/register', payload);
      
      console.log('✅ Respuesta del servidor:', response.data);

      setSuccess('Registro exitoso. Redirigiendo al login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error('❌ Error completo:', err);
      console.error('Status:', err.response?.status);
      console.error('Data:', err.response?.data);
      console.error('Message:', err.message);

      let errorMsg = 'Error en el registro';

      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (err.response.data.error) {
          errorMsg = err.response.data.error;
        } else {
          errorMsg = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(`${errorMsg} (Status: ${err.response?.status || 'sin respuesta'})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>EZ Platform</h1>
        <h2 style={styles.subtitle}>Registro de Usuario</h2>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleRegister}>
          {/* SELECCIÓN DE TIPO DE USUARIO */}
          {!userType ? (
            <div>
              <h3 style={styles.sectionTitle}>¿Qué tipo de usuario eres?</h3>
              <div style={styles.userTypeSelection}>
                <button
                  type="button"
                  onClick={() => setUserType('CLIENTE')}
                  style={{
                    ...styles.userTypeButton,
                    backgroundColor: '#3b82f6',
                  }}
                >
                  <div style={styles.userTypeIcon}>👤</div>
                  <div style={styles.userTypeName}>Cliente</div>
                  <div style={styles.userTypeDesc}>Busco servicios de ingeniería</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('INGENIERO')}
                  style={{
                    ...styles.userTypeButton,
                    backgroundColor: '#f59e0b',
                  }}
                >
                  <div style={styles.userTypeIcon}>🔧</div>
                  <div style={styles.userTypeName}>Ingeniero</div>
                  <div style={styles.userTypeDesc}>Ofrezco servicios de ingeniería</div>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mostrar tipo de usuario seleccionado */}
              <div style={styles.selectedUserType}>
                <span>Tipo de usuario: <strong>{userType === 'CLIENTE' ? '👤 Cliente' : '🔧 Ingeniero'}</strong></span>
                <button
                  type="button"
                  onClick={() => setUserType('')}
                  style={styles.changeButton}
                >
                  Cambiar
                </button>
              </div>
          {/* PASO 1: Datos Básicos */}
          {step === 1 && (
            <>
              <div style={styles.gridRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.gridRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Documento (Cédula)</label>
                  <input
                    type="number"
                    name="documentoUser"
                    placeholder="1023456789"
                    value={formData.documentoUser}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.gridRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contraseña *</label>
                  <input
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirmar Contraseña *</label>
                  <input
                    type="password"
                    name="confirmar"
                    value={formData.confirmar}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.gridRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Género</label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="OTRO">Otro</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                style={styles.nextButton}
              >
                Siguiente →
              </button>
            </>
          )}

          {/* PASO 2: Datos Adicionales */}
          {step === 2 && (
            <>
              <div style={styles.gridRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="+57 300 1234567"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Apodo (Nombre de Usuario)</label>
                  <input
                    type="text"
                    name="apodo"
                    placeholder="johndoe"
                    value={formData.apodo}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Descripción Profesional</label>
                <textarea
                  name="descripcion"
                  placeholder="Cuéntanos sobre ti, tu experiencia y especialidades..."
                  value={formData.descripcion}
                  onChange={handleChange}
                  style={{...styles.input, minHeight: '120px', resize: 'vertical'}}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cuenta Mercado Pago</label>
                <input
                  type="email"
                  name="cuentaMercadoPago"
                  placeholder="tu-email@mercadopago.com"
                  value={formData.cuentaMercadoPago}
                  onChange={handleChange}
                  style={styles.input}
                  title="Email asociada a tu cuenta de Mercado Pago"
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={styles.backButton}
                >
                  ← Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={styles.button}
                >
                  {loading ? 'Registrando...' : 'Crear Cuenta'}
                </button>
              </div>
            </>
          )}
            </>
          )}
        </form>

        <p style={styles.loginLink}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>

        <div style={styles.helpText}>
          <p><strong>Campos obligatorios:</strong> Nombre, Apellido, Email, Contraseña</p>
          <p><strong>Los demás campos son opcionales</strong> y pueden completarse después en tu perfil.</p>
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
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
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
  sectionTitle: {
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: '600',
  },
  userTypeSelection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '30px',
  },
  userTypeButton: {
    padding: '24px 16px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'center',
  },
  userTypeIcon: {
    fontSize: '36px',
    marginBottom: '8px',
  },
  userTypeName: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  userTypeDesc: {
    fontSize: '12px',
    opacity: '0.9',
  },
  selectedUserType: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#e0f2fe',
    borderRadius: '6px',
    marginBottom: '24px',
    color: '#0369a1',
    fontSize: '14px',
    fontWeight: '500',
  },
  changeButton: {
    backgroundColor: 'transparent',
    color: '#0369a1',
    border: '1px solid #0369a1',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '0',
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
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  },
  nextButton: {
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
  backButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
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
  success: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  loginLink: {
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

export default Register;
