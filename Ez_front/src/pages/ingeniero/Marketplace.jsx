import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Marketplace Ingeniero - Gestión de publicaciones
 * Permite crear, editar, eliminar y visualizar publicaciones de servicios
 */
const MarketplaceIngeniero = () => {
  const [userName, setUserName] = useState('Ingeniero');
  const [activeSection, setActiveSection] = useState('marketplace');
  const [publications, setPublications] = useState([
    {
      id: 1,
      titulo: 'Desarrollo de API REST con Spring Boot',
      descripcion: 'Servicio completo de desarrollo de APIs REST usando Spring Boot, incluye documentación y pruebas.',
      tecnologias: ['Java', 'Spring Boot', 'MySQL', 'Postman'],
      baseDatos: 'MySQL',
      lenguaje: 'Java',
      precio: 1500,
      autor: 'Carlos García',
      fechaCreacion: '2025-02-15',
      estado: 'ACTIVO',
      isOwn: true,
    },
    {
      id: 2,
      titulo: 'Aplicación React con Redux',
      descripcion: 'Desarrollo de componentes React reutilizables con gestión de estado con Redux.',
      tecnologias: ['React', 'Redux', 'CSS', 'JavaScript'],
      baseDatos: 'MongoDB',
      lenguaje: 'JavaScript',
      precio: 1200,
      autor: 'María García',
      fechaCreacion: '2025-02-10',
      estado: 'ACTIVO',
      isOwn: false,
    },
    {
      id: 3,
      titulo: 'Sistema de Facturación Completo',
      descripcion: 'Sistema integral de facturación con reportes, autenticación y panel administrativo.',
      tecnologias: ['Java', 'React', 'Spring Boot', 'PostgreSQL'],
      baseDatos: 'PostgreSQL',
      lenguaje: 'Java',
      precio: 2500,
      autor: 'Juan Pérez',
      fechaCreacion: '2025-01-20',
      estado: 'ACTIVO',
      isOwn: false,
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({
    usuario: '',
    baseDatos: '',
    lenguaje: '',
    searchText: '',
  });
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tecnologias: '',
    baseDatos: '',
    lenguaje: '',
    precio: '',
  });

  const containerStyle = {
    marginLeft: '250px',
    minHeight: '100vh',
    backgroundColor: theme.colors.primary.grisSoft,
    paddingTop: '80px',
  };

  const contentStyle = {
    padding: `${theme.spacing[6]} ${theme.spacing[8]}`,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const pageHeaderStyle = {
    marginBottom: theme.spacing[8],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const pageTitleStyle = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const createButtonStyle = {
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const filtersContainerStyle = {
    backgroundColor: theme.colors.primary.blanco,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    marginBottom: theme.spacing[8],
  };

  const filtersGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing[4],
  };

  const filterGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const filterLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const filterInputStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
  };

  const publicationsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  };

  const publicationCardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    padding: theme.spacing[6],
    display: 'flex',
    flexDirection: 'column',
    transition: `transform ${theme.transitions.duration[200]}, box-shadow ${theme.transitions.duration[200]}`,
    cursor: 'pointer',
  };

  const publicationCardHoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows.lg,
  };

  const publicationTitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const publicationDescriptionStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
    marginBottom: theme.spacing[3],
    flex: 1,
  };

  const techTagsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[3],
  };

  const tagStyle = {
    padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const publicationFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing[4],
    borderTop: `1px solid ${theme.colors.primary.grisSoft}`,
  };

  const authorStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
  };

  const priceStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.accent.verde,
  };

  const actionButtonsStyle = {
    display: 'flex',
    gap: theme.spacing[2],
    marginTop: theme.spacing[3],
    paddingTop: theme.spacing[3],
    borderTop: `1px solid ${theme.colors.primary.grisSoft}`,
  };

  const smallButtonStyle = {
    flex: 1,
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.xs,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const editButtonStyle = {
    ...smallButtonStyle,
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
  };

  const deleteButtonStyle = {
    ...smallButtonStyle,
    backgroundColor: theme.colors.accent.rojo,
    color: theme.colors.primary.blanco,
  };

  const modalStyleContainer = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[8],
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: theme.shadows.lg,
  };

  const modalTitleStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[6],
  };

  const formGroupStyle = {
    marginBottom: theme.spacing[4],
  };

  const labelStyle = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const inputStyle = {
    width: '100%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
    fontFamily: 'inherit',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: theme.spacing[3],
    marginTop: theme.spacing[6],
  };

  const primaryButtonStyle = {
    flex: 1,
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.accent.verde,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  };

  const secondaryButtonStyle = {
    flex: 1,
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.primary.grisSoft,
    color: theme.colors.primary.negro,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  };

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      tecnologias: '',
      baseDatos: '',
      lenguaje: '',
      precio: '',
    });
  };

  const handleCreatePublication = () => {
    if (editingId) {
      setPublications(
        publications.map((pub) =>
          pub.id === editingId
            ? { ...pub, ...formData, tecnologias: formData.tecnologias.split(',').map(t => t.trim()) }
            : pub
        )
      );
      setEditingId(null);
    } else {
      const newPublication = {
        id: publications.length + 1,
        ...formData,
        tecnologias: formData.tecnologias.split(',').map(t => t.trim()),
        precio: parseFloat(formData.precio),
        autor: userName,
        fechaCreacion: new Date().toISOString().split('T')[0],
        estado: 'ACTIVO',
        isOwn: true,
      };
      setPublications([...publications, newPublication]);
    }
    resetForm();
    setShowCreateModal(false);
  };

  const handleEditPublication = (pub) => {
    setEditingId(pub.id);
    setFormData({
      titulo: pub.titulo,
      descripcion: pub.descripcion,
      tecnologias: pub.tecnologias.join(', '),
      baseDatos: pub.baseDatos,
      lenguaje: pub.lenguaje,
      precio: pub.precio.toString(),
    });
    setShowCreateModal(true);
  };

  const handleDeletePublication = (id) => {
    setPublications(publications.filter((pub) => pub.id !== id));
  };

  const filteredPublications = publications.filter((pub) => {
    return (
      (!filters.usuario || pub.autor.toLowerCase().includes(filters.usuario.toLowerCase())) &&
      (!filters.baseDatos || pub.baseDatos === filters.baseDatos) &&
      (!filters.lenguaje || pub.lenguaje === filters.lenguaje) &&
      (!filters.searchText || pub.titulo.toLowerCase().includes(filters.searchText.toLowerCase()))
    );
  });

  const handleNavigate = (path) => {
    console.log(`Navegando a: ${path}`);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  const bases = ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server'];
  const lenguajes = ['Java', 'Python', 'JavaScript', 'C#', 'PHP', 'Ruby', 'Go'];

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
        />
        <div style={contentStyle}>
          {/* Encabezado */}
          <div style={pageHeaderStyle}>
            <div>
              <h1 style={pageTitleStyle}>Marketplace</h1>
              <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.primary.gris }}>
                Publica tus servicios y el mundo los encontrará
              </p>
            </div>
            <button
              style={createButtonStyle}
              onClick={() => {
                setEditingId(null);
                resetForm();
                setShowCreateModal(true);
              }}
            >
              ✨ Crear Publicación
            </button>
          </div>

          {/* Filtros */}
          <div style={filtersContainerStyle}>
            <div style={filtersGridStyle}>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Buscar</label>
                <input
                  type="text"
                  name="searchText"
                  value={filters.searchText}
                  onChange={handleFilterChange}
                  placeholder="Busca por título..."
                  style={filterInputStyle}
                />
              </div>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Por Autor</label>
                <input
                  type="text"
                  name="usuario"
                  value={filters.usuario}
                  onChange={handleFilterChange}
                  placeholder="Nombre del autor..."
                  style={filterInputStyle}
                />
              </div>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Base de Datos</label>
                <select
                  name="baseDatos"
                  value={filters.baseDatos}
                  onChange={handleFilterChange}
                  style={filterInputStyle}
                >
                  <option value="">Todas</option>
                  {bases.map((base) => (
                    <option key={base} value={base}>
                      {base}
                    </option>
                  ))}
                </select>
              </div>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Lenguaje</label>
                <select
                  name="lenguaje"
                  value={filters.lenguaje}
                  onChange={handleFilterChange}
                  style={filterInputStyle}
                >
                  <option value="">Todos</option>
                  {lenguajes.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid de Publicaciones */}
          <div style={publicationsGridStyle}>
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub) => {
                const [isHovered, setIsHovered] = React.useState(false);
                return (
                  <div
                    key={pub.id}
                    style={{
                      ...publicationCardStyle,
                      ...(isHovered ? publicationCardHoverStyle : {}),
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <h3 style={publicationTitleStyle}>{pub.titulo}</h3>
                    <p style={publicationDescriptionStyle}>{pub.descripcion}</p>
                    <div style={techTagsStyle}>
                      {pub.tecnologias.map((tech) => (
                        <span key={tech} style={tagStyle}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={publicationFooterStyle}>
                      <div style={authorStyle}>Por: {pub.autor}</div>
                      <div style={priceStyle}>${pub.precio}</div>
                    </div>
                    {pub.isOwn && (
                      <div style={actionButtonsStyle}>
                        <button
                          style={editButtonStyle}
                          onClick={() => handleEditPublication(pub)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => handleDeletePublication(pub.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: theme.spacing[8] }}>
                <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.primary.gris }}>
                  No se encontraron publicaciones
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Crear/Editar */}
      {showCreateModal && (
        <div style={modalStyleContainer} onClick={() => setShowCreateModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitleStyle}>
              {editingId ? '✏️ Editar Publicación' : '✨ Crear Publicación'}
            </h2>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleFormChange}
                placeholder="Título de la publicación..."
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleFormChange}
                placeholder="Describe tu servicio detalladamente..."
                style={textareaStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Tecnologías (separadas por comas)</label>
              <input
                type="text"
                name="tecnologias"
                value={formData.tecnologias}
                onChange={handleFormChange}
                placeholder="Java, Spring Boot, MySQL..."
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Base de Datos</label>
                <select
                  name="baseDatos"
                  value={formData.baseDatos}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  <option value="">Selecciona...</option>
                  {bases.map((base) => (
                    <option key={base} value={base}>
                      {base}
                    </option>
                  ))}
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Lenguaje</label>
                <select
                  name="lenguaje"
                  value={formData.lenguaje}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  <option value="">Selecciona...</option>
                  {lenguajes.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Precio ($)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleFormChange}
                placeholder="1500"
                style={inputStyle}
              />
            </div>

            <div style={buttonGroupStyle}>
              <button
                style={primaryButtonStyle}
                onClick={handleCreatePublication}
              >
                {editingId ? '✓ Guardar Cambios' : '✓ Publicar'}
              </button>
              <button
                style={secondaryButtonStyle}
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceIngeniero;
