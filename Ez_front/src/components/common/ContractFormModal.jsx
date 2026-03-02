import React, { useState } from 'react';
import theme from '../../themes/theme.config';

/**
 * ContractFormModal Component - Modal para crear/editar contratos
 * Maneja información de proyecto, presupuesto, plazos y tecnologías
 */
const ContractFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = 'create', // create o edit
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialData || {
    titulo: '',
    descripcion: '',
    presupuesto: '',
    plazo: '',
    tecnologias: [],
    tipoContrato: 'proyecto',
    detalles: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedTechs, setSelectedTechs] = useState(initialData?.tecnologias || []);

  const tecnologiasDisponibles = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Django', 'Java', 'Spring Boot',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'AWS', 'Google Cloud',
    'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'GraphQL', 'REST API'
  ];

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: isOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  };

  const modalStyle = {
    ...theme.components.modal,
    maxWidth: '600px',
    width: '95%',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const headerStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing[4],
    color: theme.colors.primary.negro,
    borderBottom: `2px solid ${theme.colors.accent.verde}`,
    paddingBottom: theme.spacing[3],
  };

  const formGroupStyle = {
    marginBottom: theme.spacing[4],
  };

  const labelStyle = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing[2],
    color: theme.colors.primary.negro,
  };

  const inputStyle = {
    ...theme.components.input,
    width: '100%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const selectStyle = {
    ...inputStyle,
  };

  const errorStyle = {
    color: theme.colors.accent.rojo,
    fontSize: theme.typography.fontSize.xs,
    marginTop: theme.spacing[1],
  };

  const techTagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    marginTop: theme.spacing[2],
  };

  const techTagStyle = (isSelected) => ({
    padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration[150]}`,
    border: `2px solid ${isSelected ? theme.colors.accent.azul : theme.colors.grayscale[300]}`,
    backgroundColor: isSelected ? theme.colors.accent.azul : 'transparent',
    color: isSelected ? theme.colors.primary.blanco : theme.colors.primary.negro,
  });

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing[4],
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: theme.spacing[3],
    marginTop: theme.spacing[6],
    paddingTop: theme.spacing[4],
    borderTop: `1px solid ${theme.colors.grayscale[200]}`,
  };

  const cancelBtnStyle = {
    ...theme.components.button.secondary,
    flex: 1,
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
  };

  const submitBtnStyle = {
    ...theme.components.button.primary,
    flex: 1,
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: theme.spacing[4],
    right: theme.spacing[4],
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: theme.typography.fontSize.xl,
    cursor: 'pointer',
    color: theme.colors.primary.negro,
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    if (!formData.presupuesto || formData.presupuesto <= 0) {
      newErrors.presupuesto = 'El presupuesto debe ser mayor a 0';
    }
    if (!formData.plazo) {
      newErrors.plazo = 'El plazo es requerido';
    }
    if (selectedTechs.length === 0) {
      newErrors.tecnologias = 'Selecciona al menos una tecnología';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleTechToggle = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
    if (errors.tecnologias) {
      setErrors(prev => ({
        ...prev,
        tecnologias: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        tecnologias: selectedTechs
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div
        style={{ ...modalStyle, position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          style={closeButtonStyle}
          onClick={onClose}
          disabled={loading}
          title="Cerrar"
        >
          ✕
        </button>

        {/* Header */}
        <div style={headerStyle}>
          {mode === 'create' ? '📋 Crear Nuevo Contrato' : '✏️ Editar Contrato'}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Título del Proyecto *</label>
            <input
              type="text"
              name="titulo"
              style={{
                ...inputStyle,
                borderColor: errors.titulo ? theme.colors.accent.rojo : undefined
              }}
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Ej: Desarrollo de plataforma e-commerce"
              disabled={loading}
            />
            {errors.titulo && <div style={errorStyle}>{errors.titulo}</div>}
          </div>

          {/* Descripción */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Descripción *</label>
            <textarea
              name="descripcion"
              style={{
                ...textareaStyle,
                borderColor: errors.descripcion ? theme.colors.accent.rojo : undefined
              }}
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe los detalles y requisitos del proyecto"
              disabled={loading}
            />
            {errors.descripcion && <div style={errorStyle}>{errors.descripcion}</div>}
          </div>

          {/* Row: Presupuesto y Plazo */}
          <div style={rowStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Presupuesto (USD) *</label>
              <input
                type="number"
                name="presupuesto"
                style={{
                  ...inputStyle,
                  borderColor: errors.presupuesto ? theme.colors.accent.rojo : undefined
                }}
                value={formData.presupuesto}
                onChange={handleInputChange}
                placeholder="1000"
                step="0.01"
                min="0"
                disabled={loading}
              />
              {errors.presupuesto && <div style={errorStyle}>{errors.presupuesto}</div>}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Plazo (días) *</label>
              <input
                type="number"
                name="plazo"
                style={{
                  ...inputStyle,
                  borderColor: errors.plazo ? theme.colors.accent.rojo : undefined
                }}
                value={formData.plazo}
                onChange={handleInputChange}
                placeholder="30"
                min="1"
                disabled={loading}
              />
              {errors.plazo && <div style={errorStyle}>{errors.plazo}</div>}
            </div>
          </div>

          {/* Tipo de Contrato */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Tipo de Contrato</label>
            <select
              name="tipoContrato"
              style={selectStyle}
              value={formData.tipoContrato}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="proyecto">Proyecto Completo</option>
              <option value="por_horas">Por Horas</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="consultoría">Consultoría</option>
            </select>
          </div>

          {/* Tecnologías */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Tecnologías Requeridas *</label>
            <div style={techTagsContainerStyle}>
              {tecnologiasDisponibles.map((tech, index) => (
                <div
                  key={index}
                  style={techTagStyle(selectedTechs.includes(tech))}
                  onClick={() => !loading && handleTechToggle(tech)}
                >
                  {tech}
                </div>
              ))}
            </div>
            {errors.tecnologias && <div style={errorStyle}>{errors.tecnologias}</div>}
          </div>

          {/* Detalles Adicionales */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Detalles Adicionales</label>
            <textarea
              name="detalles"
              style={textareaStyle}
              value={formData.detalles}
              onChange={handleInputChange}
              placeholder="Información adicional sobre el proyecto"
              disabled={loading}
            />
          </div>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button
              type="button"
              style={cancelBtnStyle}
              onClick={onClose}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#F0F9FF';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = 'transparent';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={submitBtnStyle}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#1D4ED8';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = theme.colors.accent.azul;
              }}
            >
              {loading ? '⏳ Procesando...' : mode === 'create' ? '✓ Crear Contrato' : '✓ Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        textarea {
          font-family: inherit;
        }
        input:disabled,
        textarea:disabled,
        select:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default ContractFormModal;
